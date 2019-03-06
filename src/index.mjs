import opentype from 'opentype.js';

function parseAnchorOption(anchor) {
  let horizontal = anchor.match(/left|center|right/gi) || [];
  horizontal = horizontal.length === 0 ? 'left' : horizontal[0];

  let vertical = anchor.match(/baseline|top|bottom|middle/gi) || [];
  vertical = vertical.length === 0 ? 'baseline' : vertical[0];

  return {
    horizontal,
    vertical
  };
}

export default class TextToSVG {
  constructor(font) {
    this.font = font;
  }

  static load(url) {
    return new Promise((resolve, reject) => {
      opentype.load(url, (err, font) => {
        if (err !== null) {
          return reject(err);
        }
        return resolve(new TextToSVG(font));
      });
    });
  }

  getWidth(text, options = {}) {
    const { fontSize = 72, kerning = false, letterSpacing, tracking } = options;
    const fontScale = (1 / this.font.unitsPerEm) * fontSize;
    const glyphs = this.font.stringToGlyphs(String(text));

    return glyphs.reduce((width, glyph, i) => {
      if (glyph.advanceWidth) {
        width += glyph.advanceWidth * fontScale;
      }

      if (kerning && i < glyphs.length - 1) {
        const kerningValue = this.font.getKerningValue(glyph, glyphs[i + 1]);
        width += kerningValue * fontScale;
      }

      if (letterSpacing) {
        width += letterSpacing * fontSize;
      } else if (tracking) {
        width += (tracking / 1000) * fontSize;
      }

      return width;
    }, 0);
  }

  getHeight(fontSize = 72) {
    const fontScale = (1 / this.font.unitsPerEm) * fontSize;
    return (this.font.ascender - this.font.descender) * fontScale;
  }

  getMetrics(text, options = {}) {
    const { anchor: rawAnchor = '', fontSize = 72 } = options;
    let { x = 0, y = 0 } = options;

    const anchor = parseAnchorOption(rawAnchor);

    const width = this.getWidth(text, options);
    const height = this.getHeight(fontSize);

    const fontScale = (1 / this.font.unitsPerEm) * fontSize;
    const ascender = this.font.ascender * fontScale;
    const descender = this.font.descender * fontScale;

    switch (anchor.horizontal) {
      case 'left':
        x -= 0;
        break;
      case 'center':
        x -= width / 2;
        break;
      case 'right':
        x -= width;
        break;
      default:
        throw new Error(`Unknown anchor option: ${anchor.horizontal}`);
    }

    switch (anchor.vertical) {
      case 'baseline':
        y -= ascender;
        break;
      case 'top':
        y -= 0;
        break;
      case 'middle':
        y -= height / 2;
        break;
      case 'bottom':
        y -= height;
        break;
      default:
        throw new Error(`Unknown anchor option: ${anchor.vertical}`);
    }

    const baseline = y + ascender;

    return {
      x,
      y,
      baseline,
      width,
      height,
      ascender,
      descender
    };
  }

  getD(text, options = {}) {
    const {
      fontSize = 72,
      kerning = false,
      letterSpacing = false,
      tracking = false
    } = options;
    const { x, baseline } = this.getMetrics(text, options);
    const path = this.font.getPath(text, x, baseline, fontSize, {
      kerning,
      letterSpacing,
      tracking
    });
    return path.toPathData();
  }
}
