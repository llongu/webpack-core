//webpack核心使用tapable实现插件 =》tapable.spec.js
/**
 * compiler 代表完整的webpack环境配置
 * compiler.run()=》compilation 代表一次资源对象完整的构建
 * compilation 该对象也提供很多关机步骤的回调，带来了一次版本chunk
 * compilation.buildModule=>laooders=>chunk (不认识的代码解析)
 * parser=>（AST=>ACORN) dependency （负责依赖收集）
 * template 自带的代码模板类，生成最后的解析结果
 * compiler / compilation 都继承自tapable
 */

const PluginName = 'MyPlugin';

class MyPlugin {
  //webpack执行的apply
  apply(compiler) {
    //compiler=>hooks 钩子=>PluginName 注册接口
    //compilation 代表资源的构建完成回调
    compiler.hooks.run.tap(PluginName, compilation => {
      console.log(PluginName);
      console.log('================================');
      console.log('webapck 构建开始');
      console.log('================================');
    });
  }
}

module.exports = MyPlugin;
