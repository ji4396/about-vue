
import '@/css/index'

console.log('index.js文件～～～～')

import(/* webpackChunkName: 'a'  */'./a.js')
.then(({add})=>{
    console.log(add())
})
