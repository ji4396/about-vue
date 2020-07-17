const { resolve, dirname } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


/*
  
*/
module.exports = {
    entry:'./src/js/index.js',
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
        ]
    },
    plugins:[
        new HtmlWebpackPlugin()
    ],
    mode:'development',
    // 解析模块规则
    resolve:{
        //配置解析模块路径别名: 优点 简写路径 缺点 路径没有提示
        alias:{
            '@':resolve(__dirname,'src')
        },
        //配置省略文件路径的后缀名
        extensions:['.js','.json','.css','.jsx'],
        //告诉webpack 解析模块去找哪个目录
        modules:[resolve(__dirname,'../../node_modules'),'node_modules']

    },
    devServer:{
        //运行代码的目录
        contentBase:resolve(__dirname,'build'),
        //监视contentbase目录下所有文件，一旦变化就会reload
        watchContentBase:true,
        watchOptions:{
            //忽略文件
            ignored:/node_modules/
        },
        //启用gzip压缩
        compress:true,
        port:8222,
        host:'localhost',
        open:true,//自动打开浏览器
        hot: true,//开启HMR功能
        clientLogLevel:'none',//不要显示启动服务器日志信息
        quiet:true, //除了一些基本启动信息以外，其他内容都不要显示
        overlay:false, // 如果出现错误，不要全屏提示～
        //服务器代理 --》 解决开发环境跨域问题
        proxy:{
            //一旦devServer(8222)服务器接收到/api/xxx请求，就会把请求转发到另一个服务器（3000）
            '/api':{
                target:'http://localhost:8222',
                //发送请求时，请求路径重写，将/api/xxx --> /xxx(去掉/api)
                pathRewrite:{
                    '^api':''
                }
            }

        }
    }
}