const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
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
        filename: 'build.js',
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
                            ]
                        }
                    },
                    {
                        test:/\(png|jpg|gif)$/,
                        laoder:'url-loader',
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
            filename: 'css/build.css'
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
    mode: 'production'

}