const path = require('path');

const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

const MyPlugin = require('./plugin/MyPlugin.js');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve('./loader/index.js'),
            options: {
              data: '自定义配置'
            }
          },
          {
            loader: path.resolve('./loader/index2.js')
          }
        ]
      }
    ]
  },
  plugins: [
    new MyPlugin(),
    new WebpackBuildNotifierPlugin({
      title: '通知标题',
      // logo: path.resolve("./img/favicon.png"),
      suppressSuccess: true
    })
  ]
};
