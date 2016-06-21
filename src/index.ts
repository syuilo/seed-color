import * as seedrandom from 'seedrandom';

export class Color {
	public r: number;
	public g: number;
	public b: number;

	constructor(r: number, g: number, b: number) {
		this.r = r;
		this.g = g;
		this.b = b;
	}

	public toHex(withNumberSign: boolean = true): string {
		// 16進数に変換
		const rHex1 = this.r.toString(16);
		const gHex1 = this.g.toString(16);
		const bHex1 = this.b.toString(16);

		// 0埋め
		const rHex2 = `0${rHex1}`.slice(-2);
		const gHex2 = `0${gHex1}`.slice(-2);
		const bHex2 = `0${bHex1}`.slice(-2);

		return withNumberSign ? `#${rHex2}${gHex2}${bHex2}` : rHex2 + gHex2 + bHex2;
	}

	public getLuminance(weights: {r: number, g: number, b: number} = {r: 0.298912, g: 0.586611, b: 0.114478}): number {
		return Math.floor(
			weights.r * this.r + weights.g * this.g + weights.b * this.b);
	}

	public getForegroundColor(threshold: number = 100, weights?: {r: number, g: number, b: number}): Color {
		return this.getLuminance(weights) > threshold ? new Color(0, 0, 0) : new Color(255, 255, 255);
	}
}

const _ = (seed: string) => {
	// Init randomizer
	const random = seedrandom(seed);

	// 各チャンネルをランダムに決定
	const r = Math.floor(random() * 255);
	const g = Math.floor(random() * 255);
	const b = Math.floor(random() * 255);

	return new Color(r, g, b);
};

module.exports = _;

export default _;
