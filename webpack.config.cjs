const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Babel loader for JS and JSX files
const babelLoader = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env',
            ['@babel/preset-react', {'runtime': 'automatic'}]]
        }
      }
    }
  ]
};

// Add image loader rule
const imageLoader = {
  rules: [
    {
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',       // Preserve original image name and extension
            outputPath: 'images/',       // Output to 'dist/images' folder
            publicPath: '/images/',      // Access images via '/images/'
          }
        }
      ]
    }
  ]
};

const resolve = {
  extensions: ['.js', '.jsx']
};

const serverConfig = {
  target: 'node',
  mode: 'development',
  entry: './src/server/server.jsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'server.cjs',
  },
  module: babelLoader, // Only need Babel loader on server-side
  plugins: [
    new webpack.EnvironmentPlugin({
      PORT: 3001
    })
  ],
  resolve
};

const clientConfig = {
  target: 'web',
  mode: 'development',
  entry: './src/client/index.jsx',
  output: {
    path: path.join(__dirname, '/dist'),
    /*
     * Appends /static to index.html when looking for client.js
     * This is where Express is serving static files from
     */
    publicPath: '/static',
    filename: 'client.js',
  },
  module: {
    rules: [
      ...babelLoader.rules,  // Use Babel for JS/JSX
      ...imageLoader.rules   // Use file-loader for images
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: `${__dirname}/src/client/index.html`
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/public/images'), to: 'images' } // Copies images to 'dist/images'
      ]
    }),
  ],
  resolve
};

module.exports = [serverConfig, clientConfig];
