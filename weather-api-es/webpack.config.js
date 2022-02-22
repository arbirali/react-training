const path = require('path');

let base = {
  mode: 'development',
  entry: [
    './src/js/index.js',
    './src/scss/style.scss',
  ],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devServer: {
    static: './',
    hot: false,
    devMiddleware: {
      publicPath: './dist/',
      writeToDisk: true,
   },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [ 'babel-loader' ],
      }, {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: { outputPath: 'css/', name: '[name].min.css'}
          },
          'sass-loader'
        ]
      }
    ]
  }
};

module.exports = (env) => {
  const isProduction = env.production;

  return isProduction ? {
    ...base,
    mode: 'production'
  } : {
    ...base,
    devtool: 'inline-source-map'
  }
};
