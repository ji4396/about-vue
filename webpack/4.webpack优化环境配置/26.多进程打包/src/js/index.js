import '../css/index.css';

import { mul } from './test';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

const a = sum(1, 2, 3, 4);

// eslint-disable-next-line
console.log(a, 'aaaa');

// eslint-disable-next-line
console.log(mul(1, 2));

/*

 1.eslint不识别window,navigator全局变量
 解决 需要修改package.json中eslintConfig配置

    "env":{
      "browser":true
    }
 2。sw代码必须运行在服务器上
    -- 》 nodejs
    -->
      npm i serve -g
      serve -s build 启动服务器，将build目录下的所有资源做为静态资源暴露出去

*/

// 注册serviceworker
// 处理兼容性问题
if ('serviceWorker' in window.navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => {
        // eslint-disable-next-line
        console.log('sw注册成功');
      })
      .catch(() => {
        // eslint-disable-next-line
        console.log('sw注册失败');
      });
  });
}
