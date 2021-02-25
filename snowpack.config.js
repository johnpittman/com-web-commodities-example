// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  alias: {
    '@client': './src',
    '@root': '.'
  },
  buildOptions: {
    sourcemap: true
  },
  devOptions: {
    port: 9000
  },
  mount: {
    src: '/'
  },
  optimize: {
    entrypoints: 'auto',
    preload: false,
    bundle: true,
    splitting: true,
    treeshake: true,
    manifest: false,
    minify: true,
    target: 'es2020'
  },
  packageOptions: {
    source: 'local'
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-postcss',
    'snowpack-svgr-plugin'
  ],
  routes: [{ match: 'routes', src: '.*', dest: '/index.html' }]
};
