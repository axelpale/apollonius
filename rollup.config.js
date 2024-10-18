import terser from '@rollup/plugin-terser'

export default {
  input: 'index.js',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      exports: 'named'
    },
    {
      file: 'dist/apollonius.min.js',
      format: 'umd',
      name: 'apollonius',
      exports: 'named',
      plugins: [terser()]
    }
  ]
}
