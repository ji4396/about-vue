


import $ from 'jquery'

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

const a = sum(1, 2, 3, 4);

// eslint-disable-next-line
console.log(a, 'aaaa');

// eslint-disable-next-line
console.log($)

