'use strict';

const loaderUtils = require('loader-utils');

module.exports = function(content) {
  console.log('-----------------自定义loader1-----------------');
  console.log(this.data.value);
  console.log('-----------------我前置钩子数据↑');
  console.log(content);
  console.log(
    '-----------------loader执行传入的是上一个loader执行结果,倒叙执行↑'
  );

  const options = loaderUtils.getOptions(this);
  console.log(options);
  console.log('-----------------自定义loader1option↑');

  //buff or tostring 下一步由 AST静态语法分析树处理
  const acorn = require('acorn');
  const walk = require('acorn-walk');
  const magicStr = require('magic-string');
  const AST = acorn.parse(content);
  const code = new magicStr(content);
  // console.log(AST);
  walk.simple(AST, {
    VariableDeclaration(node) {
      //拿到const节点 更换为 var
      console.log(node);
      const { start } = node;
      code.overwrite(start, start + 5, 'var');
    }
  });

  return code.toString();
};
//前置钩子
module.exports.pitch = function(r, prequset, data) {
  data.value = '我是前置钩子';
};
