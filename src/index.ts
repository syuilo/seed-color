import * as seedrandom from 'seedrandom';
import Color from './color';

const _ = (seed: string) => {
	// Init randomizer
	const random = seedrandom(seed);

	const r = Math.floor(random() * 256);
	const g = Math.floor(random() * 256);
	const b = Math.floor(random() * 256);

	return new Color(r, g, b);
};

Object.defineProperty(_, "default", { value: _ });

module.exports = _;

export default _;
