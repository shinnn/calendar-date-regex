/*!
 * calendar-date-regex | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/calendar-date-regex
*/
(function() {
  'use strict';

  var extendedFormat = '(\\d{4})-(0[1-9]|1[012])-(0[1-9]|[12]\\d|3[01])';
  var basicFormat = extendedFormat.replace(/-(?=\()/g, '');

  var noDay = '(\\d{4})-(0[1-9]|1[012])';

  window.calendarDateRegex = function calendarDateRegex(options) {
    options = options || {};

    var patterns = [];
    if (options.day === true) {
      patterns.push(noDay);
    } else {
      if (options.basic !== false) {
        patterns.push(basicFormat);
      }
      if (options.extended !== false) {
        patterns.push(extendedFormat);
      }
    }

    if (options.exact) {
      return new RegExp(patterns.map(function(pattern) {
        return '^' + pattern + '$';
      }).join('|'));
    }

    return new RegExp(patterns.join('|'), 'g');
  };

  window.calendarDateRegex.noDay = function calendarDateRegexWithoutDay(options) {
    options = options || {};

    return window.calendarDateRegex({
      day: true,
      exact: options.exact
    });
  };
}());
