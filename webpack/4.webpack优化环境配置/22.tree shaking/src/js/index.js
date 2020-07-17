import '../css/index.css';

import { mul } from './test';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

const a = sum(1, 2, 3, 4);

// eslint-diable-next-line
console.log(a, 'aaaa');

console.log(mul(1, 2));
