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


// redirects 'not ok' messages to error
console.log('ok 1 test');
console.log('ok 2 test');
console.log('not ok 42 some thing');
console.log('  ---');
console.log('    anything');
console.log('  ...');
console.log('ok 3 test');
console.log('1..3');

sinon.assert.calledTwice(log);
sinon.assert.calledWith(log, '# ..F.');
sinon.assert.calledWith(log, '1..3');
sinon.assert.calledOnce(console.error);
sinon.assert.calledWith(console.error,
    'not ok 42 some thing\n' +
    '  ---\n' +
    '    anything\n' +
    '  ...');
sinon.assert.notCalled(console.info);
sinon.assert.callOrder(log, console.error, log);
log.reset();
console.error.reset();


// resets errors after logging
console.log('not ok test');
console.log('# comment');
console.log('ok test');
console.log('# comment');
console.log('1..2');

sinon.assert.calledOnce(console.error);
console.error.reset();
console.info.reset();
log.reset();


console.info.restore();
console.error.restore();
