import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/cobalto-validation.js',
    format: 'cjs'
  },
  plugins: [typescript()]
};