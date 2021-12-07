const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  "mode": "development",
  "entry": "./src/renderer/index.js",
  "output": {
    "path": __dirname + "/build",
    "filename": "bundle.js"
  },
  "devServer": {
    "port": 3000
  },
  "devtool": "source-map",
  "module": {
    "rules": [
      {
        "test": /\.(js|jsx)$/,
        "exclude": /node_modules/,
        "use": {
          "loader": "babel-loader"
        }
      },
      {
        "test": /\.css$/,
        "use": [
          "style-loader",
          "css-loader"
        ]
      },
      {
        "test": /\.html$/,
        "use": [
          {
            "loader": "html-loader"
          }
        ]
      }
    ]
  },
  "plugins": [
    new HtmlWebPackPlugin({
      template: "./src/assets/index.html",
      filename: "./index.html"
    }),
    new ESLintPlugin()
  ]
}