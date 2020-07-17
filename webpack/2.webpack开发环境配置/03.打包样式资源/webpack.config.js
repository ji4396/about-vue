/*
 webpack.config.js 配置文件

 作用：运行webpack 会加载里面的配置

 所有的构建工具都是急于node.js平台运行的-模块化默认采用commonjs
*/
const {resolve} = require('path')

module.exports = {
    //webpack配置
    //入口
    entry:'./src/index.js',
    //出口
    output:{
        //输出文件名
        filename:'build.js',
        //输出路径
        path:resolve(__dirname,'build')
    },
    //loader配置
    module:{
        //详细loader配置
        rules:[
            {
                test: /\.css$/,
                use:[
                    //use数组中loader执行顺序：从右到左，从下到上，依次执行
                    //创建style标签，将js中的样式资源插入进行，添加到head中生效
                    'style-loader',
                    //将css文件比那成commonjs模块加载js中，里面内容是样式字符串
                    'css-loader'
                ]
            },
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    //将less编译成css文件
                    //需要下载less-loader和less
                    'less-loader'
                ]
            }
        ]
    },
    //plugin 配置
    plugins:[
        //详细plugins配置
    ],
    mode:'development'
}