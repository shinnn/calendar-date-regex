# calendar-date-regex

[![NPM version](https://img.shields.io/npm/v/calendar-date-regex.svg)](https://www.npmjs.com/package/calendar-date-regex)
[![Bower version](https://img.shields.io/bower/v/calendar-date-regex.svg)](https://github.com/shinnn/calendar-date-regex/releases)
[![Build Status](https://travis-ci.org/shinnn/calendar-date-regex.svg?branch=master)](https://travis-ci.org/shinnn/calendar-date-regex)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/calendar-date-regex.svg)](https://coveralls.io/r/shinnn/calendar-date-regex)
[![devDependency Status](https://david-dm.org/shinnn/calendar-date-regex/dev-status.svg)](https://david-dm.org/shinnn/calendar-date-regex#info=devDependencies)

Regular expression for matching [ISO 8601](http://www.iso.org/iso/iso8601) [calendar dates](https://en.wikipedia.org/wiki/ISO_8601#Calendar_dates)

```javascript
'2015-01-25 0101 20150126 11112233 2015-13-13'.match(calendarDateRegex());
//=> ['2015-01-25' '20150126']
```

## Installation

### Package managers

#### [npm](https://www.npmjs.com/)

```sh
npm install calendar-date-regex
```

#### [bower](http://bower.io/)

```sh
bower install calendar-date-regex
```

#### [Duo](http://duojs.org/)

```javascript
const calendarDateRegex = require('shinnn/calendar-date-regex');
```

### Standalone

[Download the script file directly.](https://raw.githubusercontent.com/shinnn/calendar-date-regex/master/browser.js)

## API

### calendarDateRegex(*options*)

*options*: `Object`  
Return: `RegExp`

It returns a [regular expression object](http://www.ecma-international.org/ecma-262/5.1/#sec-15.10) that matches calendar dates (*YYYY-MM-DD* and *YYYYMMDD*).

```javascript
calendarDateRegex().exec('  16140526  ').slice();
//=> ['16140526', '1614', '05', '26', undefined, undefined, undefined]

calendarDateRegex().exec('  1614-05-26  ').slice();
//=> ['1614-05-26', undefined, undefined, undefined, '1614', '05', '26']
```

#### options.basic

Type: `Boolean`  
Default: `true`

`false` prevents the regex from matching the basic format (*YYYYMMDD*).

```javascript
calendarDateRegex({basic: false}).test('20130413'); //=> false
```

#### options.extended

Type: `Boolean`  
Default: `true`

`false` prevents the regex from matching the extended format (*YYYY-MM-DD*).

```javascript
calendarDateRegex({extended: false}).test('2013-04-13'); //=> false
```

#### options.exact

Type: `Boolean`  
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

Copyright (c) 2015 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
