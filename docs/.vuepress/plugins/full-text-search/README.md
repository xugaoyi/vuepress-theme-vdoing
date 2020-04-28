# vuepress 中文全文搜索插件

> 代码来自[https://github.com/leo-buneev/vuepress-plugin-fulltext-search](https://github.com/leo-buneev/vuepress-plugin-fulltext-search)，但是只支持英文全文搜索，做了部分改动

## 改动说明
+ 修改[flexsearch](https://github.com/nextapps-de/flexsearch)默认配置

+ 使用中文分词模块[segmentit](https://github.com/linonetwo/segmentit)

```js
  // ./services/flexsearchSvc.js
  // flexsearch 默认配置的修改, 以及引入中文分词模块
  let defaultOptions = {
      encode: false,
      async: true,
      tokenize: function(str){
        var result = segmentit.doSegment(str, {
          simple: true
        });
        return result;
     }
  }
```

  


## 如何使用

+ 把整体代码拷贝到vuepress项目目录下，如

  ```
  .
  ├─ docs
  ├─ myPlugins
  │  └─ fullSearchBox // 当前插件所在文件夹
  └─ package.json
  ```

  

+ 在`config.js`中引用该插件

  ```js
  plugins: [
      require.resolve('../../myPlugins/fullSearchBox/')
  ]
  ```

+ 在`package.json`中加入以下依赖

  ```json
   "devDependencies": {
      "flexsearch": "nextapps-de/flexsearch",
      "html-to-text": "^5.1.1",
      "segmentit": "^2.0.3",
    }
  ```
  
+ 安装依赖

  ```
  npm i
  ```

+ 运行

## 不足的地方

加载segment词典会有1 - 2s的卡顿

## License

MIT