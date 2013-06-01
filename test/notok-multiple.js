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


// redirects multiple 'not ok' messages to error
console.log('# First');
console.log('ok 1 test');
console.log('not ok 2 test');
console.log('  ---');
console.log('    first');
console.log('  ...');
console.log('ok 3 test');
console.log('# Second');
console.log('not ok 4 test');
console.log('  ---');
console.log('    second');
console.log('  ...');
console.log('1..4');

sinon.assert.calledTwice(log);
sinon.assert.calledWith(log, '# .F.F');
sinon.assert.calledWith(log, '1..4');
sinon.assert.calledTwice(console.info);
sinon.assert.calledWith(console.info, '# First');
sinon.assert.calledWith(console.info, '# Second');
sinon.assert.calledTwice(console.error);
sinon.assert.calledWith(console.error,
    'not ok 2 test\n' +
    '  ---\n' +
    '    first\n' +
    '  ...');
sinon.assert.calledWith(console.error,
    'not ok 4 test\n' +
    '  ---\n' +
    '    second\n' +
    '  ...');
sinon.assert.callOrder(log, console.info, console.error, console.info);
log.reset();
console.info.reset();
console.error.reset();


console.info.restore();
console.error.restore();
