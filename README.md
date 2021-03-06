# minip-cli

> ## 项目简介

**此项目是由本人个人开发的一款微信小程序脚手架**

**脚手架默认模板(目前只有一个模板)采用 webpack 打包达到小程序工程化开发，解决了微信小程序 JS 文件只能引用相对路径，wxml 中引入 wxs 只能引入相对路径，不能使用 Less(模板默认 less，暂不支持选择其他 css 预处理器)等问题，模板还特地内置了小程序请求拦截器、时间管理器、时间&金额过滤器、常用正则等开发常用工具类**

> ## 如何使用？

```
npm install minip-cli -g

minip init <项目名>

cd <项目名>

npm install

// 监听修改自动刷新,代码不会压缩混淆
npm run dev

// 代码压缩混淆(上传体验版时用)
npm run build

// 查看js模块依赖图
npm run build --report

// 之后打开微信开发者工具导入项目即可

```

> ## 注意事项

**目前暂不支持 TS**

**webpack 可以帮助我们 ES6 转 ES5，压缩和混淆代码，因此这些事情，不需要微信开发者工具帮我们做了。点击微信开发者工具右上角的详情按钮，在项目设置中，反勾选 ES6 转 ES5，上传代码时自动压缩混淆等选项。**

**大家如果还有什么脚手架内没满足问题可以给我提 issue**

> ## 项目 git 地址

<https://github.com/HaiRongHaHA/minip-cli>

> ## 参考文献

[zf-cli：珠峰培训脚手架课程代码](https://gitee.com/Jerret321/zf-cli/)

[掘金：【中高级前端必备】手摸手教你撸一个脚手架](https://juejin.im/post/5d37d982e51d45108c59a635)
