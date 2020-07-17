const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/*
  

*/


//定义nodejs的环境变量
process.env.NODE_ENV = 'production'


module.exports = {
   
    // entry:'./src/js/index.js' 单入口

    entry: {
        //多入口：有一个入口，最终输出就有一个bundle
        main:'./src/js/index.js',
        test:'./src/js/test.js'
    },
    output: {
        //[name]: 取文件名
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            minify:{
                collapseWhitespace:true,
                removeComments:true
            }
        })
    ],
    mode: 'production',

}