
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
          
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    //生产环境自动压缩js代码
    mode:'production'
}