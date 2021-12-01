/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */

module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  plugins: [
    {
      /*
       * This craco-alias method is taken from this medium article:
       * https://newbedev.com/create-react-app-typescript-3-5-path-alias
       */
      plugin: require('craco-alias'),
      options: {
        source: 'tsconfig',

        // baseUrl SHOULD be specified; plugin does not take it from tsconfig
        baseUrl: './src',
        /*
         * tsConfigPath should point to the file where "baseUrl" and "paths"
         * are specified
         */
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
}
