# Enhanced-search

此插件`Enhanced-search` 是基于官方的搜索框插件 [@vuepress/plugin-search](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-search) 做了功能添加，添加的功能如下：

* 在搜索结果最底部添加了 `在MDN中搜索'xxx'` 和 `在Runoob中搜索'xxx'` 选项。



### 使用

在`config.js`的`plugins`选项添加插件：

```js
require('./plugins/enhanced-search')
```

此插件会覆盖原本的 `plugin-search` 插件，但参数选项和 `plugin-search` 插件完全一致。

