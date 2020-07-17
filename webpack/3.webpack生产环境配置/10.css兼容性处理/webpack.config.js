const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


//设置node.js环境变量,不设置默认是生产环境
process.env.NODE_ENV = 'development'

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
                        /*
                     css兼容性处理 postcss --> postcss-loader postcss-preset-env

                     帮postcss找到packjson.page中browserslist里面的配置，通过配置加载指定
                     的css兼容性样式

                    "browserslist":{
                        //开发环境 --》 设置环境变量：process.env.NODE-ENV = development
                        "development":[
                        "last 1 chrome version",
                        "last 1 firefox version",
                        "last 1 safari version"
                        ],
                        //生产环境 默认生产环境
                        "production":[
                        ">0.2%",
                        "not dead",
                        "not op_mini all"
                        ]
                    }
                    */
                   //使用loader的默认配置
                   //    'postcss-loader'
                   {
                    loader:'postcss-loader',
                    options:{
                      ident:'postcss',
                      plugins:()=>[
                          //postcss插件
                          require('postcss-preset-env')()
                      ]
                    }
                 }
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