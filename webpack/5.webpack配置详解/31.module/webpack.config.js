const { resolve, dirname } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


/*
  
*/
module.exports = {
    entry:'./src/index.js',
    output:{
        //文件名称（指定名称 + 目录）
        filename:'js/[name].js',
        //输出文件目录（将来所有资源输出的公共目录）
        path:resolve(__dirname,'build'),
    },
    module:{
        rules:[
            //loader配置    
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                include:resolve(__dirname,'src'),

                enforce:'pre', //优先执行
                // enforce:'post'  //延后执行
                //单个loader使用loader
                loader:'eslint-loader',
                options:{}
            },
            {
                //以下配置只会生效一个
                oneOf:[]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin()
    ],
    mode:'development'
}