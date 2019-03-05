# text-to-svg

> Convert text to SVG path without native dependencies. Forked from [shrhdk/text-to-svg](https://github.com/shrhdk/text-to-svg).

```js
import TextToSVG from '@spurtli/text-to-svg';
const textToSVG = await TextToSVG.load();

const attributes = {fill: 'red', stroke: 'black'};
const options = {x: 0, y: 0, fontSize: 72, anchor: 'top', attributes: attributes};

const path = textToSVG.getD('Hello, World!', options);

console.log(path);
```

## Installation

```
$ npm i -S @spurtli/text-to-svg
```

## Constructor

```js
// Argument is file path (NOT URL)
const textToSVG = await TextToSVG.load('/fonts/Noto-Sans.otf');

const path = textToSVG.getD('hello');

console.log(path);
```

## API

### `TextToSVG.getD(text, options = {})`

Get the path data for `d` attribute of `path`.

 - `text`: Text to convert to SVG path.

Options is an optional object containing:

 - `x`: Horizontal position of the beginning of the text. (default: `0`)
 - `y`: Vertical position of the baseline of the text. (default: `0`)
 - `fontSize`: Size of the text (default: `72`).
 - `kerning`: if `true` takes kerning information into account (default: `true`)
 - `letterSpacing`: letter-spacing value in `em`.
 - `tracking`: tracking value. (em / 1000)
 - `anchor`: Anchor of object in coordinate. (default: `'left baseline'`)
   - (`left`, `center`, `right`) + (`baseline`, `top`, `middle`, `bottom`)

Return value example

```
M5.27-54.07L10.62-54.07L10.62-34.00Q15.86-39.23 21.02-39.23Q26.89-39.23 29.60-34.07Q31.11-31.15 31.11-27L31.11-3.66L25.77-3.66L25.77-25.42Q25.77-34.14 20.18-34.14Q16.42-34.14 13.57-31.39Q10.62-28.44 10.62-24.64L10.62-3.66L5.27-3.66L5.27-54.07ZM67.68-14.27Q64.55-2.25 54.07-2.25Q47.57-2.25 43.77-7.66Q40.32-12.62 40.32-20.74Q40.32-28.51 43.56-33.47Q47.36-39.23 54-39.23Q66.97-39.23 67.82-19.65L45.74-19.65Q46.16-7.07 54.14-7.07Q60.47-7.07 62.05-14.27L67.68-14.27M62.05-24.26Q60.89-34.42 54-34.42Q47.36-34.42 45.95-24.26L62.05-24.26ZM92.81-11.53Q92.81-8.44 95.77-8.44Q98.19-8.44 101.07-9L101.07-3.62Q96.82-3.02 94.82-3.02Q87.19-3.02 87.19-10.51L87.19-54.07L92.81-54.07L92.81-11.53ZM128.81-11.53Q128.81-8.44 131.77-8.44Q134.19-8.44 137.07-9L137.07-3.62Q132.82-3.02 130.82-3.02Q123.19-3.02 123.19-10.51L123.19-54.07L128.81-54.07L128.81-11.53ZM162.07-39.23Q168.68-39.23 172.44-33.40Q175.68-28.55 175.68-20.74Q175.68-14.87 173.74-10.44Q170.16-2.21 161.93-2.21Q155.57-2.21 151.77-7.63Q148.32-12.59 148.32-20.74Q148.32-29.53 152.30-34.56Q156.09-39.23 162.07-39.23M161.93-34.21Q158.06-34.21 155.88-30.16Q153.95-26.61 153.95-20.74Q153.95-15.33 155.53-11.92Q157.71-7.24 162-7.24Q165.94-7.24 168.12-11.29Q170.05-14.84 170.05-20.67Q170.05-26.75 168.05-30.23Q165.90-34.21 161.93-34.21Z
```

### `TextToSVG.getMetrics(text, option = {})`

Measure text size.

 - `text`: Text to measure size.

Options is an optional object containing:

 - `x`: Horizontal position of the beginning of the text. (default: `0`)
 - `y`: Vertical position of the baseline of the text. (default: `0`)
 - `fontSize`: Size of the text (default: `72`).
 - `kerning`: if `true` takes kerning information into account (default: `true`)
 - `letterSpacing`: letter-spacing value in `em`.
 - `tracking`: tracking value. (em / 1000)
 - `anchor`: Anchor of object in coordinate. (default: `'left baseline'`)

An example of return value.

```json
{
  "x": 0,
  "y": -63.3515625,
  "baseline": 0,
  "width": 180,
  "height": 72,
  "ascender": 63.3515625,
  "descender": -8.6484375
}
```

## License

* [MIT](./LICENSE)

## Credits

`@spurtli/text-to-svg` depends on the following software:

- [opentype.js](https://github.com/nodebox/opentype.js): Copyright (c) 2015 Frederik De Bleser

These are released under the [MIT license](https://opensource.org/licenses/MIT)
