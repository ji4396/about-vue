const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/*
    缓存：
     babel 缓存
       cacheDirectory:true
       --> 让第二次打包构建速度更快
     文件资源缓存
        hash: 每次webpack构建时会生成唯一一个hash值
         问题： 因为js和css同时使用一个hash值，
           如果重新打包，重新打包会使所有缓存失效（可能只更改一个文件）
        chunkhash:根据chunk生成hash值。 如果打包来源于同一个chunk 那么hash值就一样
          问题：js和css同时使用一个hash值
           因为css是在js中被引入的，所以同属于一个chunk
        contenthashs:根据文件的内容生成hash值。 不同文件hash值不同
         --》 让代码上线运行缓存更好使用
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
    devtool:'eval-source-map'

}