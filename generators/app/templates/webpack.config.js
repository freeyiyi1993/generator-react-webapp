var isDev = (process.env.NODE_ENV) ? false : true;
var config = require('./etc/webpack.dev.js');

module.exports = config;
