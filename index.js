/*
 * tape-dots
 *
 * Copyright (c) 2013 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
(function () {
  'use strict';

  var log    = console.log;
  var dots   = '';
  var errors = [];
  var comment;
  var tests;
  var pass;

  function logDots() {
    log('# ' + dots);
    dots = '';
  }

  function dot(char) {
    dots += char;
    if (dots.length === 70) {
      logDots();
    }
  }

  console.log = function (msg) {
    if (msg.indexOf('ok') === 0) {
      dot('.');
    } else if (msg.indexOf('not ok') === 0) {
      errors.push({ comment : comment, trace : [msg] });
      comment = null;
      dot('F');
    } else if (/^ +/.test(msg)) {
      errors[errors.length - 1].trace.push(msg);
    } else if (msg.indexOf('# tests ') === 0) {
      tests = msg.match(/([0-9]+)/)[1];
    } else if (msg.indexOf('# pass ') === 0) {
      pass = msg.match(/([0-9]+)/)[1];
    } else if (msg.indexOf('# ok') === 0) {
      console.info('# tests ' + tests + ' | pass ' + pass + ' | ok');
    } else if (msg.indexOf('# fail ') === 0) {
      var f = msg.match(/([0-9]+)/)[1];
      console.info('# tests ' + tests + ' | pass ' + pass + ' | fail ' + f);
    } else if (msg.indexOf('#') === 0) {
      comment = msg;
    } else if (msg) {
      if (dots) {
        logDots();
      }
      if (errors.length) {
        var i, l = errors.length;
        for (i = 0; i < l; i++) {
          var err = errors[i];
          if (err.comment) {
            console.info(err.comment);
          }
          console.error(err.trace.join('\n'));
        }
        errors.length = 0;
      }
      log(msg);
    }
  };
}());
