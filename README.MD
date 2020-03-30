# vuepress-theme-vdoing

## 一个简洁而精致的 知识管理 & 博客 & 文档  主题

[![CI](https://github.com/xugaoyi/vuepress-theme-vdoing-blog/workflows/CI/badge.svg)](https://github.com/xugaoyi/vuepress-theme-vdoing-blog/actions?query=workflow%3ACI) [![baiduPush](https://github.com/xugaoyi/vuepress-theme-vdoing-blog/workflows/baiduPush/badge.svg)](https://github.com/xugaoyi/vuepress-theme-vdoing-blog/actions?query=workflow%3AbaiduPush) [![last-commit](https://img.shields.io/github/last-commit/xugaoyi/vuepress-theme-vdoing-blog)](https://github.com/xugaoyi/vuepress-theme-vdoing-blog/commits/master) [![GitHub stars](https://img.shields.io/github/stars/xugaoyi/vuepress-theme-vdoing-blog)](https://github.com/xugaoyi/vuepress-theme-vdoing-blog/stargazers) [![QQ](https://img.shields.io/badge/撩我-894072666-brightgreen)](https://xugaoyi.com/about/#%E8%81%94%E7%B3%BB)

效果预览：[ Evan's blog](https://xugaoyi.com/)



## Original intention 初衷

这个主题的初衷是打造一个 **结构化** 与 **碎片化** 并存的个人**知识库**。[详情](https://github.com/xugaoyi/vuepress-theme-vdoing-blog/issues/339)

>  目前功能已比较完整，但仍在不断的完善当中。如果你有什么建议欢迎提**Issues**，喜欢这个项目的欢迎点个**Star**持续关注。

## Introduce 介绍

1. 根据 [VuePress](https://vuepress.vuejs.org/zh/) 的默认主题修改而成，仍以官方配置为主，追求**简洁**同时又不失**美观**。

2. 这是一个兼具 **知识管理** & **博客文章** & **技术文档** 的主题。

3. 一个**结构化的知识库**，形成一本本像书一样清晰易读的知识库。同时博客功能提供一种**碎片化**形态。

4. 添加方便管理 **学习笔记** 和 **技术文档** 的 **目录页**、**自动生成侧边栏工具**、**自动生成Front Matter工具**、**扩展的搜索框插件**、**面包屑**、**快捷翻页按钮** 等，多维度的让你快速定位到任何你想要找的笔记或文档。

   <details>
    <summary>查看文档</summary>
    <ul>
        </li>
        <li>简单的<b>目录页</b>配置，查看 <a href="https://github.com/xugaoyi/vuepress-theme-vdoing-blog/issues/330">目录页配置</a>
        </li>
        <li><b>自动生成侧边栏工具</b> 让你拥有一个结构清晰的侧边栏，无需手动配置。<br/>
        <a href="https://github.com/xugaoyi/vuepress-theme-vdoing-blog/issues/113">根据目录自动生成侧边栏和分类标签的约定说明</a>
        </li>
        <li><b>自动生成Front Matter工具</b> 助你专注于写作，你无需给每个文件都手写front matter。<br/>
        <a href="https://github.com/xugaoyi/vuepress-theme-vdoing-blog/issues/324">自动生成Front Matter工具</a>
        </li>
        <li>
        可以添加第三方搜索链接的<a href="https://github.com/xugaoyi/vuepress-theme-vdoing-blog/blob/master/docs/.vuepress/plugins/enhanced-search/README.md">扩展的搜索框插件</a>
        </li>
       <li>
        	<b>面包屑</b>和<b>快捷翻页按钮</b>内置于主题，无需配置。（面包屑数据依赖于自动生成侧边栏工具）
        </li>
    </ul>
   </details>


5. 添加博客相关的 **评论**、**时间轴+分类页**、**最近更新栏** 、**文章信息栏（作者与创建时间）**、**博主信息栏**、**页脚版权栏**等。
   <details>
    <summary>查看文档</summary>
    <ul>
        <li><a href="https://github.com/dongyuanxin/vuepress-plugin-comment">评论栏插件</a>
        </li>
        <li><a href="https://github.com/xugaoyi/vuepress-theme-vdoing-blog/issues/331">时间轴+分类 页面配置</a> (分类数据依赖于自动生成侧边栏工具)
        </li>
        <li>
            <a href="https://github.com/xugaoyi/vuepress-theme-vdoing-blog/issues/335">文章信息栏（作者与创建时间）</a>
        </li>
        <li><a href="https://github.com/xugaoyi/vuepress-theme-vdoing-blog/issues/334">最近更新栏</a></li>
        <li><a href="https://github.com/xugaoyi/vuepress-theme-vdoing-blog/issues/336">博主信息栏</a></li>
        <li><a href="https://github.com/xugaoyi/vuepress-theme-vdoing-blog/issues/337">页脚版权栏</a></li>
    </ul>
   </details>
   
6. 首页样式美化

   [首页配置](https://github.com/xugaoyi/vuepress-theme-vdoing-blog/issues/338)


## Start 开始

```bash
# 克隆项目后进入
git clone https://github.com/xugaoyi/vuepress-theme-vdoing-blog
cd vuepress-theme-vdoing-blog

# 安装依赖并运行开发服务
npm install # or yarn install
npm run dev # or yarn dev
```

## Plugin 插件

推荐几款插件


1. 对*前端程序员*很友好**Demo演示模块插件**，很方便的在博客中插入demo，同时可以查看demo源码，跳转到codepen在线编辑。

   [vuepress-plugin-demo-block](https://www.npmjs.com/package/vuepress-plugin-demo-block)

2. 代码块一键复制插件

   [vuepress-plugin-one-click-copy](https://www.npmjs.com/package/vuepress-plugin-one-click-copy)

3. H1标题美化徽章插件

   [title-badge](https://github.com/xugaoyi/vuepress-theme-vdoing-blog/tree/master/docs/.vuepress/plugins/title-badge)

   > 此插件未上传npm，以本地插件引入:

   ```js
   // config.js
   module.exports = {
       plugins: [
           [require('./plugins/title-badge'), { // h1标题徽章
               // badges: [ // 替换默认的徽章图标
               //   'data:image/png;base64,**',
               //   'data:image/png;base64,***',
               // ]
           }]
      ]
   }
   ```

4. 可以添加第三方搜索链接的搜索框插件

   [enhanced-search](https://github.com/xugaoyi/vuepress-theme-vdoing-blog/blob/master/docs/.vuepress/plugins/enhanced-search/README.md)

   > 此插件未上传npm，以本地插件引入

5. 百度推送和统计插件

   [vuepress-plugin-baidu-autopush](https://www.npmjs.com/package/vuepress-plugin-baidu-autopush)

   [vuepress-plugin-baidu-tongji](https://www.npmjs.com/package/vuepress-plugin-baidu-tongji)

## Deploy 部署

1. 内置 `deploy.sh` 和 [GitHub Actions](https://github.com/features/actions) 两种**自动部署**脚本，一键发布到 GitHub Pages 或 国内访问速度更快的Coding Pages。

   [自动部署到 github 或 coding](https://github.com/xugaoyi/vuepress-theme-vdoing-blog/issues/325)



## Other 其他

1. **评论模块的搭建**

   [使用Gitalk实现静态博客无后台评论系统](https://xugaoyi.com/pages/1da0bf9a988eafe5/)

2. **自定义域名及解析**

   [自定义域名及解析](https://github.com/xugaoyi/vuepress-theme-vdoing-blog/issues/326)

3. **SEO相关**

   ```js
   // config.js
   module.exports = {
       description: '填写网站描述', // 以 <meta> 标签渲染到页面html中
       head: [ // 注入到页面<head> 中的标签,[tagName, { attrName: attrValue }]
           ['meta', { name: 'keywords', content: '填写关键字'}]
       ]
   }
   ```

4. **图床**

   [GitHub + jsDelivr + TinyPNG+ PicGo 打造稳定快速、高效免费图床](https://xugaoyi.com/pages/a5f73af5185fdf0a/)

5. **结合GitHub Actions开发的每天定时百度推送，加快收录**

   [GitHub Actions 定时运行代码：每天定时百度链接推送](https://xugaoyi.com/pages/f44d2f9ad04ab8d3/)

6. **在线编辑和新增文章的方法**

   [在线编辑和新增文章的方法](https://github.com/xugaoyi/vuepress-theme-vdoing-blog/issues/327)

