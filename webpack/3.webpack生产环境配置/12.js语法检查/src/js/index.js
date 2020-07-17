function add() {
  return 1;
}

// 下一行eslint所有规则都失效（下一行不尽行eslint检查）
// eslint-disable-next-line
console.log(add());
