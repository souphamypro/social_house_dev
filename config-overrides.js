const webpack = require('webpack');
module.exports = function override(config, env) {
    reactStrictMode = true;
    config.resolve.fallback = {
        // "http": require.resolve("stream-http"),
        // "os": require.resolve("os-browserify/browser"),
        // "https": require.resolve("https-browserify"),
        // "url": require.resolve("url/"),
        "assert": require.resolve("assert"),
        "stream": require.resolve("stream-browserify"),
        "http": false,
        "os": false,
        "https": false,
        "url": false,
        "assert": false,
        "stream": false
    }
    config.plugins.push(
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
    );
    return config;
}