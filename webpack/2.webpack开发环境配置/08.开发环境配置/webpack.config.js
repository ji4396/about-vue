
/*
 开发环境配置：
  能让代码运行即可
   项目运行指令：
   webpack   // 有输出  会输出打包结果  打包命令
   npx webpack-dev-server  // 只会在内存中编译打包 没有输出
*/

const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports={
    entry:'./src/js/index.js',
    output:{
        filename:'js/build.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                //处理图片资源
                test:/\.(jpg|png|gif)$/,
                loader:'url-loader',
                options:{
                    limit:10*1024,
                    name:'[hash:10].[ext]',
                    outputPath:'imgs'
                },

            },
            {
                //处理html中的img资源
                test:/\.html$/,
                loader:'html-loader',
            },
            {
                //处理其他资源
                exclude:/\.(html|css|js|less|jpg|png|gif)/,
                loader:'file-loader',
                options:{
                    name:'[hash:10].[ext]',
                    outputPath:'media'
                }
            }


        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    devServer:{
        contentBase: resolve(__dirname,'build'),
        compress:true,
        port:3000,
        open:true
    },
    mode:'development'
}