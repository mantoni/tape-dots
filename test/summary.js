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


// prints tests, pass and ok on one line
console.log(''); // swallowed
console.log('# tests 42');
console.log('# pass  42');
console.log(''); // swallowed
console.log('# ok');

sinon.assert.calledOnce(console.info);
sinon.assert.calledWith(console.info, '# tests 42 | pass 42 | ok');
sinon.assert.notCalled(log);
sinon.assert.notCalled(console.error);
console.info.reset();


// prints tests, pass and fail on one line
console.log(''); // swallowed
console.log('# tests 42');
console.log('# pass  40');
console.log('# fail  2');

sinon.assert.calledOnce(console.info);
sinon.assert.calledWith(console.info, '# tests 42 | pass 40 | fail 2');
sinon.assert.notCalled(log);
sinon.assert.notCalled(console.error);
console.info.reset();


console.info.restore();
console.error.restore();
