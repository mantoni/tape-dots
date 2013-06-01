/*
 * tape-dots
 *
 * Copyright (c) 2013 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
'use strict';

var sinon = require('sinon');

var log = console.log = sinon.spy();

require('../index.js');

sinon.stub(console, 'info');
sinon.stub(console, 'error');


// prints 'ok' messages as dots
console.log('ok 1 test');
console.log('ok 2 other test');
console.log('ok 42 some thing');
console.log('1..42');

sinon.assert.calledTwice(log);
sinon.assert.calledWith(log, '# ...');
sinon.assert.calledWith(log, '1..42');
sinon.assert.notCalled(console.info);
sinon.assert.notCalled(console.error);
log.reset();


// starts new line after 70 dots
var i = 0;
while (i < 72) {
  console.log('ok ' + (++i) + ' test');
}

sinon.assert.calledOnce(log);
sinon.assert.calledWith(log, '# ' + new Array(71).join('.'));
log.reset();

console.log('1..72');

sinon.assert.calledTwice(log);
sinon.assert.calledWith(log, '# ..');
log.reset();


console.info.restore();
console.error.restore();
