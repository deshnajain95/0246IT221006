const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = function override(config) {
  
  config.resolve.fallback = {
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    stream: require.resolve("stream-browserify"),
    util: require.resolve("util/"),
    zlib: require.resolve("browserify-zlib"),
    assert: require.resolve("assert/"),
    url: require.resolve("url/"),
  };

  
  config.plugins.push(new NodePolyfillPlugin());

  return config;
};
