const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/*
   tree shaking:
    去除无用代码
    前提： 1.必须使用es6模块化 2.开启production环境
    作用：减少代码体积

    在package.json中配置
     "sideEffects":false 所有代码都没有副作用（都可以进行tree shaking）
      问题： 可能会把css/@babel-polyfill(副作用) 文件干掉
      "sideEffects":["*css","*.less"]

*/


//定义nodejs的环境变量
process.env.NODE_ENV = 'production'


const commonCssLoader = [
    MiniCssExtractPlugin.loader, 'css-loader',
    {
        //还需要在package.json中定义browserslist，默认是加载生产环境
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [
                require('postcss-preset-env')()
            ]
        }
    }
]

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/build.[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                //在package.json中eslintConfig --> airbnb
                test:/\.js$/,
                exclude:/node_modules/,
                //优先执行
                enforce:'pre',
                loader:'eslint-loader',
                options:{
                    fix:true
                }
            },
            {
                //以下loader只会匹配一个 提高生产环境打包构建速度
                //注意： 不能有两项配置处理同一种类型文件
                oneOf:[
                    {
                        test: /\.css$/,
                        use: [...commonCssLoader]
                    },
                    {
                        test: /\.less$/,
                        use: [...commonCssLoader,'less-loader']
                    },
                    /*
                    正常来讲，一个文件只能被一个loader处理
                    当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序:
                       先执行eslint 再执行babel
                    */
                    
                    {
                        test:/\.js$/,
                        exclude:/node_modules/,
                        loader:'babel-loader',
                        options:{
                            presets:[
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns:'usage',
                                        corejs:{version:3},
                                        targets:{
                                            chrome:'60',
                                            firefox:'60'
                                        }
                                    }
                                ]
                            ],
                            //开启babel缓存
                            //第二次构建时，会读取之前的缓存
                            cacheDirectory:true

                        }
                    },
                    {
                        test:/\.(png|jpg|gif)$/,
                        loader:'url-loader',
                        options:{
                            limit:8*1024,
                            name:'[hash:10].[ext]',
                            outputPath:'image'
                        }
                    },
                    {
                        //处理html中的图片
                        test:/\.html$/,
                        loader:'html-loader',
                    },
                    {
                        exclude:/\.(js|css|less|html|jpg|png|gif)/,
                        loader:'file-loader',
                        options:{
                            outputPath:'other'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        //提取css成单独文件
        new MiniCssExtractPlugin({
            filename: 'css/build.[contenthash:10].css'
        }),
        new OptimizeCssAssetsPlugin(),
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            minify:{
                collapseWhitespace:true,
                removeComments:true
            }
        })
    ],
    mode: 'production',
    devtool:'source-map'

}