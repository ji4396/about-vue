
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
            语法检查  eslint-loader eslint 
            注意 只检查自己的源代码，第三方库不检查
            设置检查规则
                package.json中eslintConfig中配置
                airbnb 风格指南  -->  eslint-config-airbnb-base eslint-plugin-import

                "eslintConfig":{
                    "extends":"airbnb-base"
                }
           */
          {
              test:/\.js$/,
              exclude:/node_modules/,
              loader:'eslint-loader',
              options:{
                 //自动修复 
                fix:true
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