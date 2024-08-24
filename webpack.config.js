const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/app.js', // Điểm đầu vào của ứng dụng AngularJS
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', // Đưa CSS vào trong DOM
          'css-loader', // Chuyển CSS thành các mô-đun JS
          'sass-loader', // Biên dịch SCSS thành CSS
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/, // Đối với file JavaScript
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Đường dẫn đến file HTML gốc
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/views', to: 'views' }, // Sao chép thư mục views vào dist/views
        { from: 'src/components/studentDialog/studentDialog.html', to: 'components/studentDialog/studentDialog.html' }, // Sao chép student dialog vào dist
        { from: 'src/components/courseDialog/courseDialog.html', to: 'components/courseDialog/courseDialog.html' }, // Sao chép course dialog vào dist
      ],
    }),
  ],
  devServer: {
    static: './dist',
    hot: true,
    port: 8080, // Cổng server
    open: true, // Tự động mở trình duyệt khi khởi động
  },
  mode: 'development',
};
