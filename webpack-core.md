# webpack core 分析

## 同步异步打包结果 sync-async-bundle

1. 同步打包:
   闭包执行，传入文件 key 和 value(fn)，查看有无缓存文件，**webpack_require** 调用文件，eval 执行代码， 同时传入 **webpack_require** 该函数，嵌套调用

2. 异步打包  
   通过定义变量 webpackjsonp push chunk 文件(window["webpackJsonp"].push == webpackJsonpCallback),
   webpackJsonpCallback 解析文件，赋值到 installedChunks
   **webpack_require** 执行，main.js ，main.js 执行 **webpack_require**.e
   **webpack_require**.e 获取文件名，取得文件，创建 promise 查询 installedChunks，是否已加载安装，有返回，否则 创建 script 加载文件，返回
   **webpack_require**.t 执行 **webpack_require** 执行 文件

## Loader

1.  执行顺序

    resolve loader 文件，loader 执行顺序为倒叙执行，接收 content 并且将处理结果传入下一个 loader 接收继续处理

## plugin

    使用tapable实现插件机制 compiler / compilation 都继承自tapable
    初始化会调用插件apply
    创建 -> 在webpack compiler 对象上创建
    注册 -> 插件将自己的方法注册在对于钩子上
    调用 -> 编译过程，触发钩子，也触发插件

# 流程

    compiler 编译核心 代表完整的 webpack 环境配置
    compilation 每次一编译资源


    启动构建，读取参数，创建 compiler,调用 compiler.run 开始构建，挂上钩子，从 entry 出发，针对每个 module 调用 loader 进行编译，之后进行 acorn 解析，生成 AST 静态语法树，再将 module 组合成 chunk 文件，经 template 编译后生成 bundle 代码

# 优化

    1. 输入完整文件名，减少文件查找，exclude,include

    2. webpack为什么会慢？

       loader + plugin + nodejs是单线程 + webpack本身就会慢

    3. entry多无解 cache-loader + thread-loader

        plugin -》 多核 webpack-parallel-uglify-plugin
        optimize-css-assets-webpack-plugin

    4. entry多了 削减entry

        项目A
        本机免密登录
        项目B
        #ssh 192.168.21.1
        #远程编译的脚本
        #scp 拷贝本机的dist

    5. 合理的devtool

    6. 固定chunkid 持久化缓存 name-all-modules-plugin

    7. externals 加上引入CDN资源 import vue from "vue"

# tip

    module:在webpack中所有文件都是模块，一个模块会对应一个文件，webpack会通过入口找到所有依赖的模块
    chunk:代码块，一个chunk由多个模块组合而成
    assets:打包出的资源,一般和chunk个数相同

    hash对js和css进行签名时，每一次hash值都不一样，导致无法利用缓存,hash字段是根据每次编译compilation的内容计算所得，也可以理解为项目总体文件的hash值，而不是针对每个具体文件的。(所以每一次编译都会有一个新的hash，并不适用)

    不用hash，而用chunkhash(js和css要使用chunkhash)，chunkhash的话每一个js的模块对应的值是不同的(根据js里的不同内容进行生成)

    chunkhash只适用于js和css，img中是没有这种东西的

    css 是使用 ExtractTextPlugin 插件引入的，这时候可以使用到这个插件提供的 contenthash，如下(使用后 css 就有独立于 js 外的指纹了)，
    new ExtractTextPlugin("[name]-[contenthash].css
