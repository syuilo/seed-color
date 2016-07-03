/**
 * Color
 */
export class Color {

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
					r: parseInt((<any>hex.substr(0, 1)).repeat(2), 16),
					g: parseInt((<any>hex.substr(1, 1)).repeat(2), 16),
					b: parseInt((<any>hex.substr(2, 1)).repeat(2), 16)
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
			if (Color.names.hasOwnProperty(x)) {
				return Color.parseHex(Color.names[x]);
			} else {
				return null;
			}
		}
	}

	/**
	 * Convert RGB to HSV
	 */
	public static rgbToHsv(color: string): HSV;
	public static rgbToHsv(color: Color): HSV;
	public static rgbToHsv(rgb: RGB): HSV;
	public static rgbToHsv(rgb: number[]): HSV;
	public static rgbToHsv(r: number, g: number, b: number): HSV;
	public static rgbToHsv(x: any, y: any, z: any): HSV {
		let r: number, g: number, b: number;

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
	public static rgbToHsl(color: string): HSL;
	public static rgbToHsl(color: Color): HSL;
	public static rgbToHsl(rgb: RGB): HSL;
	public static rgbToHsl(rgb: number[]): HSL;
	public static rgbToHsl(r: number, g: number, b: number): HSL;
	public static rgbToHsl(x: any, y: any, z: any): HSL {
		let r: number, g: number, b: number;

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
	public static hsvToRgb(x: any, y: number, z: number): RGB {
		let r: number, g: number, b: number;

		let h: number, s: number, v: number;
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
			return {'r': v, 'g': v, 'b': v};
		}

		s = s / 255;

		const
			i = Math.floor(h / 60) % 6,
			f = (h / 60) - i,
			p = v * (1 - s),
			q = v * (1 - f * s),
			t = v * (1 - (1 - f) * s);

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
	public static hslToRgb(x: any, y: number, z: number): RGB {
		let r: number, g: number, b: number;

		let h: number, s: number, l: number;
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
				if (t < 1/6) return p + (q - p) * 6 * t;
				if (t < 1/2) return q;
				if (t < 2/3) return p + (q - p) * (2 / 3 - t) * 6;
				return p;
			}

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

	constructor(rgb: RGB);
	constructor(hsv: HSV);
	constructor(hsl: HSL);
	constructor(color: string);
	constructor(color: Color);
	constructor(r: number, g: number, b: number);
	constructor(x: any, y: number, z: number) {
		// r, g, b
		if (x && y && z) {
			this.r = x;
			this.g = y;
			this.b = z;
		}

		// Color name or Color code
		else if (typeof x === 'string') {
			const rgb = Color.parseString(x);
			if (rgb !== null) {
				this.setRGB(rgb);
			} else {
				throw 'unknown color string';
			}
		}

		// RGB, HSV or HSL object
		else if (typeof x === 'object') {
			if (x.r && x.g && x.b) {
				this.setRGB(x);
			} else if (x.h && x.s && x.v) {
				this.setHSV(x);
			} else if (x.h && x.s && x.l) {
				this.setHSL(x);
			} else {
				throw 'Invalid color space';
			}
		}

		// Other
		else {
			throw 'Invalid color arugument';
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
	public setHSV(x: any, y: number, z: number): void {
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
	public setHSL(x: any, y: number, z: number): void {
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
	 * Get CSS value string
	 */
	public toCSS(compress = false): string {
		// `value` is set if this color was originally
		// converted from a named color string so we need
		// to respect this and try to output named color too.
		if (this.value) {
			return this.value;
		}

		// If we have some transparency, the only way to represent it
		// is via `rgba`. Otherwise, we use the hex representation,
		// which has better compatibility with older browsers.
		// Values are capped between `0` and `255`, rounded and zero-padded.
		if (this.a < 1) {
			return "rgba(" + this.rgb.map(c =>
				clamp(Math.round(c), 255)
			).concat(clamp(this.a, 1))
				.join(',' + (compress ? '' : ' ')) + ")";
		}

		color = this.toRGB();

		if (compress) {
				var splitcolor = color.split('');

				// Convert color to short format
				if (splitcolor[1] === splitcolor[2] && splitcolor[3] === splitcolor[4] && splitcolor[5] === splitcolor[6]) {
						color = '#' + splitcolor[1] + splitcolor[3] + splitcolor[5];
				}
		}

		return color;
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

	/**
	 * X11 color names
	 */
	public static names = {
		AliceBlue:            '#F0F8FF',
		AntiqueWhite:         '#FAEBD7',
		Aqua:                 '#00FFFF',
		Aquamarine:           '#7FFFD4',
		Azure:                '#F0FFFF',
		Beige:                '#F5F5DC',
		Bisque:               '#FFE4C4',
		Black:                '#000000',
		BlanchedAlmond:       '#FFEBCD',
		Blue:                 '#0000FF',
		BlueViolet:           '#8A2BE2',
		Brown:                '#A52A2A',
		BurlyWood:            '#DEB887',
		CadetBlue:            '#5F9EA0',
		Chartreuse:           '#7FFF00',
		Chocolate:            '#D2691E',
		Coral:                '#FF7F50',
		CornflowerBlue:       '#6495ED',
		Cornsilk:             '#FFF8DC',
		Crimson:              '#DC143C',
		Cyan:                 '#00FFFF',
		DarkBlue:             '#00008B',
		DarkCyan:             '#008B8B',
		DarkGoldenrod:        '#B8860B',
		DarkGray:             '#A9A9A9',
		DarkGreen:            '#006400',
		DarkKhaki:            '#BDB76B',
		DarkMagenta:          '#8B008B',
		DarkOliveGreen:       '#556B2F',
		DarkOrange:           '#FF8C00',
		DarkOrchid:           '#9932CC',
		DarkRed:              '#8B0000',
		DarkSalmon:           '#E9967A',
		DarkSeaGreen:         '#8FBC8F',
		DarkSlateBlue:        '#483D8B',
		DarkSlateGray:        '#2F4F4F',
		DarkTurquoise:        '#00CED1',
		DarkViolet:           '#9400D3',
		DeepPink:             '#FF1493',
		DeepSkyBlue:          '#00BFFF',
		DimGray:              '#696969',
		DodgerBlue:           '#1E90FF',
		FireBrick:            '#B22222',
		FloralWhite:          '#FFFAF0',
		ForestGreen:          '#228B22',
		Fuchsia:              '#FF00FF',
		Gainsboro:            '#DCDCDC',
		GhostWhite:           '#F8F8FF',
		Gold:                 '#FFD700',
		GoldenRod:            '#DAA520',
		Gray:                 '#808080',
		Green:                '#008000',
		GreenYellow:          '#ADFF2F',
		HoneyDew:             '#F0FFF0',
		HotPink:              '#FF69B4',
		IndianRed:            '#CD5C5C',
		Indigo:               '#4B0082',
		Ivory:                '#FFFFF0',
		Khaki:                '#F0E68C',
		Lavender:             '#E6E6FA',
		LavenderBlush:        '#FFF0F5',
		LawnGreen:            '#7CFC00',
		LemonChiffon:         '#FFFACD',
		LightBlue:            '#ADD8E6',
		LightCoral:           '#F08080',
		LightCyan:            '#E0FFFF',
		LightGoldenRodYellow: '#FAFAD2',
		LightGray:            '#D3D3D3',
		LightPink:            '#FFB6C1',
		LightSalmon:          '#FFA07A',
		LightSeaGreen:        '#20B2AA',
		LightSkyBlue:         '#87CEFA',
		LightSlateGray:       '#778899',
		LightSteelBlue:       '#B0C4DE',
		LightYellow:          '#FFFFE0',
		Lime:                 '#00FF00',
		LimeGreen:            '#32CD32',
		Linen:                '#FAF0E6',
		Magenta:              '#FF00FF',
		Maroon:               '#800000',
		MediumAquamarine:     '#66CDAA',
		MediumBlue:           '#0000CD',
		MediumOrchid:         '#BA55D3',
		MediumPurple:         '#9370DB',
		MediumSeaGreen:       '#3CB371',
		MediumSlateBlue:      '#7B68EE',
		MediumSpringGreen:    '#00FA9A',
		MediumTurquoise:      '#48D1CC',
		MediumVioletRed:      '#C71585',
	};
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
