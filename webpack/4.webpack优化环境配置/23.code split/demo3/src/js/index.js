


function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}


/*
  通过js代码， 让某个文件被单独打包成一个chunk



*/

import(/* webpackChunkName: 'test' */'./test').then(({mul,count})=>{
  //文件加载成功
  //eslint-disable-next-line
  console.log(mul(1,2),'mul')
}).catch(()=>{
  console.log('文件加载失败')
})

const a = sum(1, 2, 3, 4);
// eslint-disable-next-line
console.log(a, 'aaaa');



