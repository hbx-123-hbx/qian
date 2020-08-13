const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');
const PurifycssWebpack = require('purifycss-webpack');
const webpack = require("webpack");

module.exports = {
    // 开发环境配置： production:生产环境（线上）development：开发环境（开发）
    mode: 'development',
    // 入口文件配置
    // entry:'./src/index.js',
    entry: {
        index: './src/index.js',
        main: './src/main.js'
    },
    // 出口文件
    output: {
        // 绝对路径
        path: path.resolve(__dirname, 'dist'),
        // filename:'bundle.js'
        filename: '[name].js',
        // 配置图片路径
        // publicPath:'http://127.0.0.1:8081/',
        publicPath: 'http://localhost:8081/',

    },
    devServer: {
        //设置基本目录结构
        contentBase: path.resolve(__dirname, 'dist'),
        //服务器的IP地址，可以使用IP或者localhost
        // host: "127.0.0.1",
        host: 'localhost',
        //配置服务器端口号
        port: '8081',
        open: true,//自动打开浏览器
        // compress: true,//服务器压缩是否开启
    },
    plugins: [
        //处理html文件的打包
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            minify: {
                removeAttributeQuotes: true,//去引号
                //collapseWhitespace:true, //压缩
            },
            hash: true
        }),
        //每次构建先删除dist再重新打包dist
        // new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),

        new PurifycssWebpack({
            paths: glob.sync(path.join(__dirname, './src/*.html'))
        }),
        new webpack.ProvidePlugin({
            $:"jquery"
        }),
    ],
    //配置loader
    module: {
        rules: [
            {
                //针对css处理规则
                test: /\.css$/,
                // use:['style-loader','css-loader'],
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    }, 'postcss-loader']
            }, {
                //针对图片文件的处理规则
                test: /\.(jpg|png|gif)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 500,
                        outputPath: "images/",
                        esModule: false
                    }
                }]
            }, {
                //针对html文件的处理
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            }, {
                //针对sass处理规则
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            }, {
                //针对js文件的处理（es6 => es5）
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                //不把node_modules中的文件进行转换
                exclude: /node_modules/
            }
        ]
    }
}