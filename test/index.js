/**
 * Tests
 */

'use strict';

const assert = require('assert');
const seedColor = require('../');

it('ちゃんとColorクラスが返ってくる', () => {
	const color = seedColor('strawberry-pasta');
	assert.notEqual(color, null);
});

it('RGB値に0を含められる', () => {
	const color = seedColor('DataAltitude');
	assert.notEqual(color, null);
});

describe('Color', () => {
	it('# toHex', () => {
		const color = seedColor('strawberry-pasta');
		assert.equal(color.toHex(), '#201b7e');
	});
});
