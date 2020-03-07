# 一个简洁至上的 博客 & 文档 & 笔记管理 主题

![CI](https://github.com/xugaoyi/blog/workflows/CI/badge.svg) ![baiduPush](https://github.com/xugaoyi/blog/workflows/baiduPush/badge.svg) ![last-commit](https://img.shields.io/github/last-commit/xugaoyi/blog) ![GitHub stars](https://img.shields.io/github/stars/xugaoyi/blog) [![QQ](https://img.shields.io/badge/撩我-894072666-brightgreen)](tencent://message/?uin=894072666&Site=&Menu=yes)


## Introduce

1. 根据 [vuepress](https://vuepress.vuejs.org/zh/) 的默认主题修改而成，追求**简洁至上**。

2. 这是一个兼具 **博客文章** & **技术文档** & **学习笔记** 管理的博客主题。

3. 添加博客所需的**评论**、**时间轴**、**分类**、**最近更新** 等。

4. 这主题可以很方便的管理你的**学习笔记**和**技术文档**，**扩展的搜索框**让你快速查找文档。

5. 添加对*前端程序员*很友好**demo演示模块**，很方便的在博客中插入demo，同时可以查看demo源码，跳转到codepen在线编辑。

6. 自动侧边栏满足不了需求？手动配置侧边栏工作繁杂？没关系，我们有**自动生成侧边栏**！

   [根据目录自动生成侧边栏的约定说明](https://github.com/xugaoyi/blog/issues/113)

   > **分类标签**不需要你每个文件都设置 [Front Matter](https://vuepress.vuejs.org/zh/guide/frontmatter.html)，只需按照我们的目录约定，我们会按照目录来进行分类，这更适合管理你的学习笔记。

7. vuepress 的页面链接对于博客来说是一个阴暗面，官方对于 [永久链接](https://vuepress.vuejs.org/zh/guide/permalinks.html) 的处理我个人不是特别喜欢，因此我们就有了**自动生成永久链接**，你不需要给每个页面定义一个[Front Matter](https://vuepress.vuejs.org/zh/guide/frontmatter.html)指定永久链接，我们会通过文件名来生成一个永久链接码到你的页面Front Matter。但这并不妨碍你在特定页面手动指定自己喜欢的永久链接。

   [自动生成的Front Matter](https://github.com/xugaoyi/blog/issues/324)

8. **自动部署**，内置 `deploy.sh` 和 [GitHub Actions](https://github.com/features/actions) 两种自动部署脚本，一键发布到 GitHub Pages 或 国内访问速度更快的Coding Pages。

   [自动部署到 github 或 coding](https://github.com/xugaoyi/blog/issues/325)

9. 效果：[ Evan's blog](https://xugaoyi.com/)



## Quick start

```bash
# 克隆项目后进入
git clone https://github.com/xugaoyi/blog
cd blog

# 安装依赖并运行开发服务
npm install # or yarn install
npm run dev # or yarn dev
```



## Other

1. **百度推送和统计**

   以插件的形式加入百度推送和统计，`npm`安装如下插件并配置

   ```js
   //config.js
   'vuepress-plugin-baidu-autopush', // 百度推送
   
   [
       'vuepress-plugin-baidu-tongji', // 百度统计
       {
           hm: '8a5**************47d607481723b7815d' // 设置你自己的hm参数
       }
   ]
   ```

2. **评论模块**

   [使用Gitalk实现静态博客无后台评论系统](https://xugaoyi.com/pages/1da0bf9a988eafe5/)

3. **自定义域名及解析**

   [自定义域名及解析](https://github.com/xugaoyi/blog/issues/326)

4. **SEO相关**

   ```js
   // config.js
   module.exports = {
       description: '填写网站描述', // 以 <meta> 标签渲染到页面html中
       head: [ // 注入到页面<head> 中的标签,[tagName, { attrName: attrValue }]
           ['meta', { name: 'keywords', content: '填写关键字'}]
       ]
   }
   ```

5. **图床**

   [GitHub + jsDelivr + TinyPNG+ PicGo 打造稳定快速、高效免费图床](https://xugaoyi.com/pages/a5f73af5185fdf0a/)

6. **结合GitHub Actions开发的每天定时百度推送，加快收录**

   [GitHub Actions 定时运行代码：每天定时百度链接推送](https://xugaoyi.com/pages/f44d2f9ad04ab8d3/)

7. **在线编辑和新增文章的方法**

   [在线编辑和新增文章的方法](https://github.com/xugaoyi/blog/issues/327)



