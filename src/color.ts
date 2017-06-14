/**
 * Color
 */
export default class Color {

	/**
	 * Red
	 */
	public r: number;

	/**
	 * Green
	 */
	public g: number;

	/**
	 * Blue
	 */
	public b: number;

	/**
	 * Alpha
	 */
	public a: number;

	/**
	 * RGB Array: [r, g, b]
	 */
	public get rgb(): number[] {
		return [this.r, this.g, this.b];
	}
	public set rgb(rgb: number[]) {
		this.r = rgb[0];
		this.g = rgb[1];
		this.b = rgb[2];
	}

	/**
	 * Hex to RGB
	 */
	public static parseHex(hex: string): RGB {
		if (hex[0] === '#') {
			hex = hex.substr(1);
		}

		switch (hex.length) {
			case 6: // #rrggbb
				return {
					r: parseInt(hex.substr(0, 2), 16),
					g: parseInt(hex.substr(2, 2), 16),
					b: parseInt(hex.substr(4, 2), 16)
				};

			case 3: // #rgb
				return {
					r: parseInt(hex.substr(0, 1).repeat(2), 16),
					g: parseInt(hex.substr(1, 1).repeat(2), 16),
					b: parseInt(hex.substr(2, 1).repeat(2), 16)
				};

			default:
				throw 'Invalid color code';
		}
	}

	/**
	 * Analyze string
	 */
	public static parseString(x: string): RGB {
		if (x[0] === '#') {
			return Color.parseHex(x);
		} else {
			return null;
		}
	}

	/**
	 * Convert RGB to HSV
	 */
	public static rgbToHsv(color: string | Color | RGB | number[]): HSV;
	public static rgbToHsv(r: number, g: number, b: number): HSV;
	public static rgbToHsv(x: any, y?: any, z?: any): HSV {
		let r: number;
		let g: number;
		let b: number;

		if (x && y && z) {
			r = x;
			g = y;
			b = z;
		} else if (typeof x === 'string') {
			const rgb = Color.parseString(x);
			if (rgb !== null) {
				r = rgb.r;
				g = rgb.g;
				b = rgb.b;
			} else {
				throw 'unknown color string';
			}
		} else if (Array.isArray(x)) {
			r = x[0];
			g = x[1];
			b = x[2];
		} else if (x.hasOwnProperty('r') && x.hasOwnProperty('g') && x.hasOwnProperty('b')) {
			r = x.r;
			g = x.g;
			b = x.b;
		} else {
			throw 'invalid argument';
		}

		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		const d = max - min;

		let h: number;
		let s: number;
		const v = max;

		if (max === 0) {
			s = 0;
		} else {
			s = d / max;
		}

		if (max === min) {
			h = 0;
		} else {
			switch (max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2;               break;
				case b: h = (r - g) / d + 4;               break;
			}

			h /= 6;
		}

		return { h, s, v };
	}

	/**
	 * Convert RGB to HSL
	 */
	public static rgbToHsl(color: string | Color | RGB | number[]): HSL;
	public static rgbToHsl(r: number, g: number, b: number): HSL;
	public static rgbToHsl(x: any, y?: any, z?: any): HSL {
		let r: number;
		let g: number;
		let b: number;

		if (x && y && z) {
			r = x;
			g = y;
			b = z;
		} else if (typeof x === 'string') {
			const rgb = Color.parseString(x);
			if (rgb !== null) {
				r = rgb.r;
				g = rgb.g;
				b = rgb.b;
			} else {
				throw 'unknown color string';
			}
		} else if (Array.isArray(x)) {
			r = x[0];
			g = x[1];
			b = x[2];
		} else if (x.hasOwnProperty('r') && x.hasOwnProperty('g') && x.hasOwnProperty('b')) {
			r = x.r;
			g = x.g;
			b = x.b;
		} else {
			throw 'invalid argument';
		}

		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		const d = max - min;

		let h: number;
		const l = (max + min) / 2;
		let s: number;

		if (max === min) {
			h = 0;
			s = 0;
		} else {
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

			switch (max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2;               break;
				case b: h = (r - g) / d + 4;               break;
			}

			h /= 6;
		}

		return { h, s, l };
	}

	/**
	 * Convert HSV to RGB
	 */
	public static hsvToRgb(hsv: HSV): RGB;
	public static hsvToRgb(h: number, s: number, v: number): RGB;
	public static hsvToRgb(x: any, y?: number, z?: number): RGB {
		let r: number;
		let g: number;
		let b: number;

		let h: number;
		let s: number;
		let v: number;

		if (typeof x === 'object') {
			h = x.h;
			s = x.s;
			v = x.v;
		} else {
			h = x;
			s = y;
			v = z;
		}

		while (h < 0) {
			h += 360;
		}

		h = h % 360;

		if (s === 0) {
			v = Math.round(v);
			return { r: v, g: v, b: v };
		}

		s = s / 255;

		const i = Math.floor(h / 60) % 6;
		const f = (h / 60) - i;
		const p = v * (1 - s);
		const q = v * (1 - f * s);
		const t = v * (1 - (1 - f) * s);

		switch (i) {
			case 0: r = v; g = t; b = p; break;
			case 1: r = q; g = v; b = p; break;
			case 2: r = p; g = v; b = t; break;
			case 3: r = p; g = q; b = v; break;
			case 4: r = t; g = p; b = v; break;
			case 5: r = v; g = p; b = q; break;
		}

		return {
			r: Math.round(r),
			g: Math.round(g),
			b: Math.round(b)
		};
	}

	/**
	 * Convert HSL to RGB
	 */
	public static hslToRgb(hsl: HSL): RGB;
	public static hslToRgb(h: number, s: number, l: number): RGB;
	public static hslToRgb(x: any, y?: number, z?: number): RGB {
		let r: number;
		let g: number;
		let b: number;

		let h: number;
		let s: number;
		let l: number;

		if (typeof x === 'object') {
			h = x.h;
			s = x.s;
			l = x.l;
		} else {
			h = x;
			s = y;
			l = z;
		}

		if (s === 0) {
			r = g = b = l; // achromatic
		} else {
			const hueToRgb = (p: number, q: number, t: number) => {
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1 / 6) return p + (q - p) * 6 * t;
				if (t < 1 / 2) return q;
				if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
				return p;
			};

			const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			const p = 2 * l - q;

			r = hueToRgb(p, q, h + 1 / 3);
			g = hueToRgb(p, q, h);
			b = hueToRgb(p, q, h - 1 / 3);
		}

		return {
			r: Math.round(r * 255),
			g: Math.round(g * 255),
			b: Math.round(b * 255)
		};
	}

	constructor(color: string | Color | RGB | HSV | HSL);
	constructor(r: number, g: number, b: number);
	constructor(x: any, y?: number, z?: number) {
		// r, g, b
		if (x && y && z) {
			this.r = x;
			this.g = y;
			this.b = z;

		// Color name or Color code
		} else if (typeof x === 'string') {
			const rgb = Color.parseString(x);
			if (rgb !== null) {
				this.setRGB(rgb);
			} else {
				throw 'unknown color string';
			}

		// RGB, HSV or HSL object
		} else if (typeof x === 'object') {
			if (x.r && x.g && x.b) {
				this.setRGB(x);
			} else if (x.h && x.s && x.v) {
				this.setHSV(x);
			} else if (x.h && x.s && x.l) {
				this.setHSL(x);
			} else {
				throw 'Invalid color space';
			}

		// Other
		} else {
			throw 'Invalid arugument';
		}
	}

	/**
	 * Get an RGB object that represent this color
	 */
	public toRGB(): RGB {
		return {
			r: this.r,
			g: this.g,
			b: this.b
		};
	}

	/**
	 * Set the color using the RGB
	 */
	public setRGB(rgb: RGB): Color {
		this.r = rgb.r;
		this.g = rgb.g;
		this.b = rgb.b;
		return this;
	}

	/**
	 * Get HSV object
	 */
	public toHSV(): HSV {
		return Color.rgbToHsv(this);
	}

	/**
	 * Set the color using the HSV
	 */
	public setHSV(hsv: HSV): void;
	public setHSV(h: number, s: number, v: number): void;
	public setHSV(x: any, y?: number, z?: number): void {
		this.setRGB(Color.hsvToRgb(x, y, z));
	}

	/**
	 * Get HSL object
	 */
	public toHSL(): HSL {
		return Color.rgbToHsl(this);
	}

	/**
	 * Set the color using the HSL
	 */
	public setHSL(hsl: HSL): void;
	public setHSL(h: number, s: number, l: number): void;
	public setHSL(x: any, y?: number, z?: number): void {
		this.setRGB(Color.hslToRgb(x, y, z));
	}

	/**
	 * Get color code
	 */
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

	/**
	 * Get luminance of this color
	 */
	public luminance(rWeight = 0.2126, gWeight = 0.7152, bWeight = 0.0722): number {
		return (
			(rWeight * this.r / 255) +
			(gWeight * this.g / 255) +
			(bWeight * this.b / 255)
		);
	}

	public contrast(threshold = 0.43, dark?: Color, light?: Color): Color {
		return this.luminance() > threshold
			? dark  || new Color(0  , 0  , 0  )
			: light || new Color(255, 255, 255);
	}

	/**
	 * Invert this color
	 */
	public invert(): Color {
		this.r = 255 - this.r;
		this.g = 255 - this.g;
		this.b = 255 - this.b;
		return this;
	}

	/**
	 * Clone this instance
	 */
	public clone(): Color {
		return new Color(this);
	}
}

function clamp(v: number, max: number): number {
	return Math.min(Math.max(v, 0), max);
}

/**
 * "Red Green Blue" color space
 */
export type RGB = {
	/**
	 * Red
	 */
	r: number;

	/**
	 * Green
	 */
	g: number;

	/**
	 * Blue
	 */
	b: number;

	/**
	 * Alpha
	 */
	a?: number;
};

/**
 * "Hue Saturation Brightness" color space
 */
export type HSV = {
	/**
	 * Hue
	 */
	h: number;

	/**
	 * Saturation
	 */
	s: number;

	/**
	 * Brightness
	 */
	v: number;

	/**
	 * Alpha
	 */
	a?: number;
};

/**
 * "Hue Saturation Luminance" color space
 */
export type HSL = {
	/**
	 * Hue
	 */
	h: number;

	/**
	 * Saturation
	 */
	s: number;

	/**
	 * Luminance
	 */
	l: number;

	/**
	 * Alpha
	 */
	a?: number;
};
