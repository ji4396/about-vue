const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


/*
  entry: 入口起点
   1.string  --> ',./src/index.js'
     打包形成一个chunk , 输出一个bundle文件
     此时chunk名称默认是main
   2.array
     多入口
     所有入口文件最终只会形成一个chunk 输出出去只有一个bundle文件。
      -- 》 只有在HMR功能中 让html热更新生效～
   3.object
     多入口
     有几个入口文件就形成几个chunk，输出几个bundle文件
     此时chunk的名称是key

     --> 特殊用法  
     entry:{
         // 所有入口文件最终只会形成一个chunk 输出出去只有一个bundle文件。
        index:['./src/index.js','./src/count.js'],
        // 形成一个chunk , 输出一个bundle文件
        add:'./src/add.js'
    },
*/
module.exports = {
    entry:{
        index:'./src/index.js',
        add:'./src/add.js'
    },
    output:{
        filename:'js/[name].js',
        path:resolve(__dirname,'build')
    },
    plugins:[
        new HtmlWebpackPlugin()
    ],
    mode:'development'
}