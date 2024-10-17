import terser from '@rollup/plugin-terser'
// NOTE Experimental JSON import
import { default as pjson } from './package.json' with { type: 'json' }

export default {
  input: 'index.js',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      exports: 'named'
    },
    {
      file: `dist/${pjson.name}-${pjson.version}.min.js`,
      format: 'umd',
      name: 'apollonius',
      exports: 'named',
      plugins: [terser()]
    }
  ]
}
