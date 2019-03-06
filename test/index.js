import path from 'path';

import TextToSVG from '../src/index';

const fontFile = path.resolve(
  __dirname,
  '../fonts/GlacialIndifference-Bold.otf'
);

describe('TextToSVG', () => {
  describe('TextToSVG', () => {
    it('load font', async () => {
      await TextToSVG.load(fontFile);
    });

    it('load font sync', () => {
      TextToSVG.loadSync(fontFile);
    });
  });

  describe('TextToSVG', () => {
    it('get with and height', async () => {
      const svg = await TextToSVG.load(fontFile);
      const width = svg.getWidth('Hello, World');
      const height = svg.getHeight(42);

      width.should.be.a.Number().and.above(0);
      height.should.be.a.Number().and.above(0);
    });

    it('get font metrics', async () => {
      const svg = await TextToSVG.load(fontFile);
      const {
        x,
        y,
        baseline,
        width,
        height,
        ascender,
        descender
      } = svg.getMetrics();

      x.should.be.a.Number().and.eql(0);
      y.should.be.a.Number().and.below(0);
      baseline.should.be.a.Number().and.eql(0);
      width.should.be.a.Number().and.above(0);
      height.should.be.a.Number().and.above(0);
      ascender.should.be.a.Number().and.above(0);
      descender.should.be.a.Number().and.below(0);
    });

    it('get path definition', async () => {
      const svg = await TextToSVG.load(fontFile);
      const d = svg.getD('Hello, World');

      d.should.be.a.String();
      d.length.should.be.above(0);
    });
  });
});
