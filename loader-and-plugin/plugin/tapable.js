//webpack核心使用tapable实现插件机制
const {
  SyncHook, //同步串行，不关心监听函数返回值
  SyncBailHook, //同步串行 只要监听函数有一个返回值不为null，就跳过所有
  SyncWaterfallHook, //同步串行 上一个监听函数的范围一直可以传给下一个
  SyncLoopHook, //同步循环，监听函数返回ture的执行
  AsyncParallelHook, //↓跟上面一样 只是变异步
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook
} = require('tapable');

//接受一个可选参数 字符串数组
//hook=compiler.hooks
const hook = new SyncHook(['name']);

//订阅
hook.tap('1', function(name) {
  console.log(name, 1);
  return 'SyncWaterfallHook';
});

hook.tap('2', function(name) {
  console.log(name, 2);
});

//执行钩子
hook.call('webpack!!!');

const synchook = new SyncBailHook(['name']);

synchook.tap('1', function(name) {
  console.log(name, 1);
  return '有返回值就跳过后面步骤';
});

synchook.tap('2', function(name) {
  console.log(name, 2);
});

synchook.call(' SyncWebpack!!!');

//node plugin/tapable.spec.js
