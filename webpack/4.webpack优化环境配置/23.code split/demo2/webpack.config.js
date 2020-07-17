const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/*
  

*/


//定义nodejs的环境变量
process.env.NODE_ENV = 'production'


module.exports = {
   
    // entry:'./src/js/index.js',// 单入口
    entry:{
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
    /*
        1. 可以将node_modules中代码单独打包成一个chunk最终输出
        2. 自动分析多入口chunk中，是否有公共依赖，如果有会打包成单独一个chunk

    */
    optimization:{
        splitChunks:{
            chunks:'all'
        }
    },
    mode: 'production',

}