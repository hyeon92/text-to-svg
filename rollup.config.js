export default {
  input: './src/index.mjs',
  output: {
    file: './lib/index.js',
    format: 'cjs'
  },
  external: ['opentype.js']
};
