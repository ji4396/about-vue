

console.log('index.js')


// import {mul} from './test'


btn1.onclick = function(){
  //懒加载 
  // 预加载 prefetch: 会在使用之前，提前加载js文件
  //正常加载可以认为是并行加载（同一时间加载多个文件）
  // 预加载 prefetch 等其他资源加载完毕，浏览器空闲了，再去加载资源
  import(/* webpackChunkName: 'test', webpackPrefetch:true*/'./test').then(({mul})=>{
    console.log(mul())
  })
}