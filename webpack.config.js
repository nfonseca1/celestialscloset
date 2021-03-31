const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "production",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
        publicPath: '/'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".scss"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-react"]
                    }
                }
            },
            {
                test: /\.tsx?$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        configFile: "tsconfig.webpack.json"
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "styles.css"
                        }
                    },
                    "sass-loader"
                ]
            }
        ]
    },
    devtool: "source-map",
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'dist'),
        proxy: {
            '/api': 'http://localhost:3000/api'
        }
    },
    plugins: [
        new HTMLWebpackPlugin({
            inject: 'body',
            template: 'index.html'
        })
    ]
}