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


// does not print comments
console.log('TAP version 13');
console.log('# some comment');
console.log('# other comment');

sinon.assert.calledOnce(log);
sinon.assert.calledWith(log, 'TAP version 13');
sinon.assert.notCalled(console.info);
sinon.assert.notCalled(console.error);
log.reset();


// prints last comment as info before error
console.log('# first comment');
console.log('# second comment');
console.log('not ok test');
console.log('  ---');
console.log('  ...');
console.log('1..1');

sinon.assert.calledOnce(console.info);
sinon.assert.calledWith(console.info, '# second comment');
sinon.assert.calledOnce(console.error);
sinon.assert.calledTwice(log);
sinon.assert.calledWith(log, '# F');
sinon.assert.calledWith(log, '1..1');
sinon.assert.callOrder(log, console.info, console.error, log);
console.info.reset();
console.error.reset();
log.reset();


console.info.restore();
console.error.restore();
