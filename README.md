# calendar-date-regex

[![npm version](https://img.shields.io/npm/v/calendar-date-regex.svg)](https://www.npmjs.com/package/calendar-date-regex)
[![Build Status](https://travis-ci.com/shinnn/calendar-date-regex.svg?branch=master)](https://travis-ci.com/shinnn/calendar-date-regex)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/calendar-date-regex.svg)](https://coveralls.io/github/shinnn/calendar-date-regex)

A regular expression for matching [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) [calendar dates](https://en.wikipedia.org/wiki/ISO_8601#Calendar_dates)

```javascript
'2015-01-25 0101 20150126 11112233 2015-13-13'.match(calendarDateRegex());
//=> ['2015-01-25' '20150126']
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/about-npm/).

```
npm install calendar-date-regex
```

## API

```javascript
import calendarDateRegex from 'calendar-date-regex';
```

### calendarDateRegex(*options*)

*options*: `Object`  
Return: `RegExp`

It returns a [regular expression object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp) that matches calendar dates (*YYYY-MM-DD* and *YYYYMMDD*).

```javascript
calendarDateRegex().exec('  16140526  ').slice();
//=> ['16140526', '1614', '05', '26', undefined, undefined, undefined]

calendarDateRegex().exec('  1614-05-26  ').slice();
//=> ['1614-05-26', undefined, undefined, undefined, '1614', '05', '26']
```

#### options.basic

Type: `boolean`  
Default: `true`

`false` prevents the regex from matching the basic format (*YYYYMMDD*).

```javascript
calendarDateRegex({basic: false}).test('20130413'); //=> false
```

#### options.extended

Type: `boolean`  
Default: `true`

`false` prevents the regex from matching the extended format (*YYYY-MM-DD*).

```javascript
calendarDateRegex({extended: false}).test('2013-04-13'); //=> false
```

#### options.exact

Type: `boolean`  
Default: `false`

`true` makes the regex matches only an exact calendar date string.

```javascript
calendarDateRegex().test('foo 11900331'); //=> true
calendarDateRegex({exact: true}).test('foo 11900331'); //=> false
calendarDateRegex({basic: false, exact: true}).test('11900331'); //=> false
```

### calendarDateRegex.noDay(*options*)

*options*: `Object` (only supports [`exact` option](#optionsexact))  
Return: `RegExp`

It returns a regular expression object that matches calendar dates with reduced precision (*YYYY-MM*).

```javascript
calendarDateRegex.noDay().test('2015-01'); //=> true
calendarDateRegex.noDay().test('201501'); //=> false
```

## License

Copyright (c) 2015 - 2018 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
