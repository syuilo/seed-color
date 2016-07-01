import * as seedrandom from 'seedrandom';

export type RGB = {
	r: number;
	g: number;
	b: number;
};

export type HSV = {
	h: number;
	s: number;
	v: number;
};

export type HSL = {
	h: number;
	s: number;
	l: number;
};

export class Color {
	public r: number;
	public g: number;
	public b: number;

	constructor(r: number, g: number, b: number) {
		this.r = r;
		this.g = g;
		this.b = b;
	}

	public toRGB(): RGB {
		return {
			r: this.r,
			g: this.g,
			b: this.b
		};
	}

	public toHSV(): HSV {
		const max = Math.max(this.r, this.g, this.b);
		const min = Math.min(this.r, this.g, this.b);
		const v = max;
		const d = max - min;
		let h: number;
		let s: number;

		if (max === 0) {
			s = 0;
		} else {
			s = d / max;
		}

		if (max === min) {
			h = 0;
		} else {
			switch (max) {
				case this.r:
					h = (this.g - this.b) / d + (this.g < this.b ? 6 : 0);
					break;
				case this.g:
					h = (this.b - this.r) / d + 2;
					break;
				case this.b:
					h = (this.r - this.g) / d + 4;
					break;
			}

			h /= 6;
		}

		return {
			h,
			s,
			v
		};
	}

	public toHSL(): HSL {
		const max = Math.max(this.r, this.g, this.b);
		const min = Math.min(this.r, this.g, this.b);
		const l = (max + min) / 2;
		const d = max - min;
		let h: number;
		let s: number;

		if (max === min) {
			h = 0;
			s = 0;
		} else {
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

			switch (max) {
				case this.r:
					h = (this.g - this.b) / d + (this.g < this.b ? 6 : 0);
					break;
				case this.g:
					h = (this.b - this.r) / d + 2;
					break;
				case this.b:
					h = (this.r - this.g) / d + 4;
					break;
			}

			h /= 6;
		}

		return {
			h,
			s,
			l
		};
	}

	public toHex(withNumberSign: boolean = true): string {
		const rHex1 = this.r.toString(16);
		const gHex1 = this.g.toString(16);
		const bHex1 = this.b.toString(16);

		const rHex2 = `0${rHex1}`.slice(-2);
		const gHex2 = `0${gHex1}`.slice(-2);
		const bHex2 = `0${bHex1}`.slice(-2);

		return withNumberSign
			? `#${rHex2}${gHex2}${bHex2}`
			: rHex2 + gHex2 + bHex2;
	}

	public luminance(rWeight = 0.2126, gWeight = 0.7152, bWeight = 0.0722): number {
		return (
			(rWeight * this.r / 255) +
			(gWeight * this.g / 255) +
			(bWeight * this.b / 255)
		);
	}

	public contrast(threshold = 0.43, dark?: Color, light?: Color): Color {
		return this.luminance() > threshold
			? dark || new Color(0, 0, 0)
			: light || new Color(255, 255, 255);
	}

	public invert(): Color {
		return new Color(255 - this.r, 255 - this.g, 255 - this.b);
	}
}

const _ = (seed: string) => {
	// Init randomizer
	const random = seedrandom(seed);

	const r = Math.floor(random() * 255);
	const g = Math.floor(random() * 255);
	const b = Math.floor(random() * 255);

	return new Color(r, g, b);
};

Object.defineProperty(_, "default", { value: _ });

module.exports = _;

export default _;
