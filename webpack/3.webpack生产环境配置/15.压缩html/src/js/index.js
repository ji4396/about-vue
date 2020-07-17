//会把有兼容性的所有处理方法都提供出来
// import '@babel/polyfill'

const add = () => 1;

// 下一行eslint所有规则都失效（下一行不尽行eslint检查）
// eslint-disable-next-line
console.log(add());

const a =  new Promise((res)=>{
  setTimeout(()=>{
    console.log('zhixingwancheng')
    res()
  },1000)
})

console.log(a)
