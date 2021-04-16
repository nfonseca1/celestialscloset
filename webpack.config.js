const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    mode: "production",
    entry: {
        home: "./src/home.tsx",
        collection: "./src/collection.tsx",
        adminRegistration: "./src/adminRegistration.tsx",
        adminLogin: "./src/adminLogin.tsx",
        dashboard: "./src/dashboard.tsx"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        publicPath: '/'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".scss"]
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
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
                            name: "[name].css"
                        }
                    },
                    "sass-loader"
                ]
            }
        ]
    },
    //devtool: "source-map",
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'dist'),
        proxy: {
            '/admin': 'http://localhost:3000',
            '/api': 'http://localhost:3000',
            '/collection': 'http://localhost:3000',
            '/': 'http://localhost:3000'
        }
    },
    plugins: [
        new HTMLWebpackPlugin({
            inject: 'body',
            template: 'index.html',
            filename: 'home.html',
            chunks: ['home']
        }),
        new HTMLWebpackPlugin({
            inject: 'body',
            template: 'index.html',
            filename: 'collection.html',
            chunks: ['collection']
        }),
        new HTMLWebpackPlugin({
            inject: 'body',
            template: 'admin.html',
            filename: 'adminRegistration.html',
            chunks: ['adminRegistration']
        }),
        new HTMLWebpackPlugin({
            inject: 'body',
            template: 'admin.html',
            filename: 'adminLogin.html',
            chunks: ['adminLogin']
        }),
        new HTMLWebpackPlugin({
            inject: 'body',
            template: 'index.html',
            filename: 'admin.html',
            chunks: ['dashboard']
        }),
        new CompressionPlugin(),
        new CompressionPlugin({
            filename: "[path][base].br",
            algorithm: "brotliCompress"
        })
    ]
}