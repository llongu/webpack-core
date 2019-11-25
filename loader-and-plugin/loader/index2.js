/**
 *  最后传入的loader最早调用
 */
module.exports = function(content) {
  console.log('-----------------自定义loader2-----------------');
  console.log(content);

  return content;
};
