'use strict';

const calendarDateRegex = require('.');
const test = require('tape');

test('calendarDateRegex()', t => {
	t.deepEqual(
		calendarDateRegex().exec('001234-01-23').slice(),
		['1234-01-23', undefined, undefined, undefined, '1234', '01', '23'],
		'should create a regex that matches calendar dates in the basic format.'
	);

	t.deepEqual(
		calendarDateRegex().exec('ab1234012399').slice(),
		['12340123', '1234', '01', '23', undefined, undefined, undefined],
		'should create a regex that matches calendar dates in the extended format.'
	);

	t.deepEqual(
		'0123-12-31 99990101 20001301 11111100 1000-10-32 2222-2222 543210-01'.match(calendarDateRegex()),
		['0123-12-31', '99990101'],
		'should create a regex that matches calendar dates more than once.'
	);

	t.deepEqual(
		calendarDateRegex({basic: false}).exec('00001122 0000-11-22').slice(),
		['0000-11-22', '0000', '11', '22'],
		'should drop support for the basic format when `basic` option is false.'
	);

	t.deepEqual(
		calendarDateRegex({extended: false}).exec('0000-11-22 00001122').slice(),
		['00001122', '0000', '11', '22'],
		'should drop support for the extended format when `extended` option is false.'
	);

	t.strictEqual(
		calendarDateRegex({exact: true}).exec(' 20001022'),
		null,
		'should create a regex that exactly matches calendar dates when `exact` option is enabled.'
	);

	t.end();
});

test('calendarDateRegex.noDay()', t => {
	t.deepEqual(
		calendarDateRegex.noDay().exec('1111-11-11 001234-0143').slice(),
		['1111-11', '1111', '11'],
		'should create a regex that matches calendar dates with reduced precision.'
	);

	t.deepEqual(
		'999901 0123-12 2000-13 1111-00'.match(calendarDateRegex.noDay()),
		['0123-12'],
		'should create a regex that matches calendar dates with reduced precision more than once.'
	);

	t.end();
});
