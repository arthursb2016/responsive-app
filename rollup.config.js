import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.esm.mjs',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs'
    }
  ],
  external: ['magic-string'],
  plugins: [
    typescript({ tsconfig: 'tsconfig.json', useTsconfigDeclarationDir: true }),
    resolve(),
    commonjs()
  ]
}