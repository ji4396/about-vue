
const {resolve} = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports={
    entry:'./src/js/index.js',
    output:{
        filename:'build.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
          /*
            js兼容性处理 bable-loader @babel/core
            1.基本js兼容性处理  --》 @babel/preset-env
              问题：只能转换基本语法  不能处理promise
            2.全部js兼容性处理 --》 @babel/polyfill  
              在入口文件中引入 @babel/polyfill  
              问题：只要解决部分兼容性问题，但是会引入所有兼容性代码，体积太大了
            3.需要做兼容性的就做：按需加载 --》 core-js
          */
         {
             test:/\.js$/,
             exclude:/node_modules/,
             loader:'babel-loader',
             options:{
                 //预设：指示babel做什么样的兼容性处理
                 presets:[
                     ['@babel/preset-env',
                     {
                         //按需加载
                         useBuiltIns:'usage',
                         //指定core-js版本
                         corejs:{
                             version:3
                         },
                         //指定做到哪个版本的浏览器
                         targets:{
                            chrome:'60',
                            firefox:'60',
                            ie:'9',
                            safari:'10',
                            edge:'17'
                         }
                     }]
                ]
             }
          }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    mode:'development'
}