'use strict'
// Template version: 1.2.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');
const os = require('os');

var localhost = '';
try {
  var network = os.networkInterfaces();
  Object.keys(network).forEach(function(key) {
    var nets = network[key];
    
    nets.forEach(function(netItem) {
      if (/192\.168\./.test(netItem.address)) {
        localhost = netItem.address;
      }
    })
  });
  localhost = network[Object.keys(network)[0]][1].address
} catch (e) {
  localhost = 'localhost';
}

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/test/*': {
        target: 'http://localhost:2333',
        changeOrigin: true,
        headers: {
          'Accept' : 'application/json, text/plain',
          'X-Requested-With': 'XMLHttpRequest'
        },
      },
      '/stargate_kangebao/*': {
        target: 'http://10.0.22.57:11180',
        changeOrigin: true,
        headers: {
          'Accept' : 'application/json, text/plain',
          'X-Requested-With': 'XMLHttpRequest'
        },
      },
      '/rest/*': {
        target: 'http://activitytest.minshenglife.com',
        changeOrigin: true,
        headers: {
          'Accept' : 'application/json, text/plain',
          'X-Requested-With': 'XMLHttpRequest'
        },
      },
      '*': {
        target: 'http://test.msjk95596.com',
        // target: 'http://192.168.1.121',
        changeOrigin: true,
        headers: {
          'Accept' : 'application/json, text/plain',
          'X-Requested-With': 'XMLHttpRequest'
        },
      }
    },

    // Various Dev Server settings
    host: localhost, // can be overwritten by process.env.HOST
    port: 5000, // can be overwritten by process.env.HOST, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },
  
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',
    
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
