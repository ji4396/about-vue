const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");




module.exports={
    entry:'./src/js/index.js',
    output:{
        filename:'js/build.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    // 'style-loader',//会创建style标签 将样式放上去

                    //取代style-loader , 提取css成单独文件
                    MiniCssExtractPlugin.loader,
                    'css-loader',//将css文件整合到js中
                
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'css/build.css'
        })
    ],
    mode:'development'
}