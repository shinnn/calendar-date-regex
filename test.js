'use strong';

const requireBowerFiles = require('require-bower-files');
const {test} = require('tape');

function runTest(description, main) {
  test(description, t => {
    t.plan(7);

    t.equal(main.name, 'calendarDateRegex', 'should have a function name.');

    t.deepEqual(
      main().exec('001234-01-23').slice(),
      ['1234-01-23', undefined, undefined, undefined, '1234', '01', '23'],
      'should create a regex that matches calendar dates in the basic format.'
    );

    t.deepEqual(
      main().exec('ab1234012399').slice(),
      ['12340123', '1234', '01', '23', undefined, undefined, undefined],
      'should create a regex that matches calendar dates in the extended format.'
    );

    t.deepEqual(
      '0123-12-31 99990101 20001301 11111100 1000-10-32 2222-2222 543210-01'.match(main()),
      ['0123-12-31', '99990101'],
      'should create a regex that matches calendar dates more than once.'
    );

    t.deepEqual(
      main({basic: false}).exec('00001122 0000-11-22').slice(),
      ['0000-11-22', '0000', '11', '22'],
      'should drop support for the basic format when `basic` option is false.'
    );

    t.deepEqual(
      main({extended: false}).exec('0000-11-22 00001122').slice(),
      ['00001122', '0000', '11', '22'],
      'should drop support for the extended format when `extended` option is false.'
    );

    t.strictEqual(
      main({exact: true}).exec(' 20001022'),
      null,
      'should create a regex that exactly matches calendar dates when `exact` option is enabled.'
    );
  });

  test(description + '.noDay', t => {
    t.plan(3);

    t.equal(main.noDay.name, 'calendarDateRegexWithoutDay', 'should have a function name.');

    t.deepEqual(
      main.noDay().exec('1111-11-11 001234-0143').slice(),
      ['1111-11', '1111', '11'],
      'should create a regex that matches calendar dates with reduced precision.'
    );

    t.deepEqual(
      '999901 0123-12 2000-13 1111-00'.match(main.noDay()),
      ['0123-12'],
      'should create a regex that matches calendar dates with reduced precision more than once.'
    );
  });
}

runTest('require(\'calendar-date-regex\')', require('.'));

global.window = {};
requireBowerFiles({self: true});

runTest('window.calendarDateRegex', global.window.calendarDateRegex);
