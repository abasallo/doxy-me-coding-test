const TerserPlugin = require('terser-webpack-plugin')
const ZipPlugin = require('zip-webpack-plugin')

const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/lambda.ts',
  mode: 'production',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build-webpack'),
    libraryTarget: 'umd'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false
      })
    ]
  },
  plugins: [
    new ZipPlugin({
      filename: 'lambda.zip',
      include: [/\.js$/]
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^pg-native$/,
      contextRegExp: /./
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^pg-hstore$/,
      contextRegExp: /./
    })
  ]
}
