const nav = require('./config/nav.js');
// const sidebar = require('./config/sidebar.js');
const sidebar = require('./config/sidebar-auto.js');

module.exports = {
  title: 'Evan Blog', // 标题
  description: 'Evan Blog,web前端技术博客,基于vuepress构建,专注web前端学习与总结。JavaScript,js,ES6,TypeScript,vue,python,css3,html5,Node,git,github等技术文章。', // 描述,以 <meta> 标签渲染到当前页面的 HTML 中
  // process.env.VUEPRESS_BASE 在package.json生成
 // base: process.env.VUEPRESS_BASE || '/', // 基础路径，默认'/',如果放到github pages要改成仓库名
  head: [ // 注入到当前页面<head> 中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
    ['link', { rel: 'icon', href: '/img/logo2.png' }], //favicons，资源放在public文件夹
    ['meta', { name: 'keywords', content: 'Evan Blog,个人博客,技术博客,vuepress,技术文档,web前端,前端学习,技术总结与分享,JavaScript,js,ES6,TypeScript,vue,python,css3,html5,Node,git,github,markdown,面试问答集锦'}],
    ['meta', { name: 'baidu-site-verification', content: 'YwUALncFiI'}],
    // ['script', { src: 'https://hm.baidu.com/hm.js?837775213e724293b4af2b9526e238b4'}]
  ],
  markdown: {
    lineNumbers: true // 代码行号
  },
  themeConfig: { // 主题配置
    nav,
    sidebar, // 侧边栏    'auto' | 自定义
    logo: '/img/logo2.png', // 导航栏logo
    repo: 'xugaoyi/evanblog', // 导航栏右侧生成Github链接
    lastUpdated: '更新于', // 更新的时间，及前缀文字   string | boolean
    // editLinks: true, // 编辑链接
    // editLinkText: '在 Github 上编辑此页',
    // displayAllHeaders: true, // 默认值：false
  },
  plugins: [ // 插件
    'vuepress-plugin-baidu-autopush', // 百度自动推送，作用：加快将页面推送给百度搜索
    '@vuepress/back-to-top', // 返回顶部
    [
      '@vuepress/medium-zoom', // 缩放图片
      {
        options: {
          background: 'rgba(0,0,0,0.8)'
        }
      }
    ], 
    [
      'vuepress-plugin-baidu-tongji', // 百度统计，https://tongji.baidu.com
      {
        hm: '837775213e724293b4af2b9526e238b4'
      }
    ],
    [
      'vuepress-plugin-comment', // 评论
      {
        choosen: 'gitalk', 
        options: {
          clientID: 'a6e1355287947096b88b',
          clientSecret: 'f0e77d070fabfcd5af95bebb82b2d574d7248d71',
          repo: 'blog', // GitHub 仓库
          owner: 'xugaoyi', // GitHub仓库所有者
          admin: ['xugaoyi'], // 对仓库有写权限的人
          distractionFreeMode: false,
          id: "<%- frontmatter.permalink.slice(-16) %>", //  页面的唯一标识,长度不能超过50
          title: "「评论」<%- frontmatter.title %>", // GitHub issue 的标题
          // id: "<%- (window.location.origin + (frontmatter.to.path || window.location.pathname)).slice(-50) %>", 
          // title: "「评论」<%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>", 
          labels: ["Gitalk", "Comment"], // GitHub issue 的标签
          body:"页面：<%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>" // GitHub issue 的内容
        }
      }
    ]
  ],
  // configureWebpack: {
  //   //webpack别名 如![Image from alias](~@alias/image.png)
  //   resolve: {
  //     alias: {
  //       '@alias': 'path/to/some/dir'
  //     }
  //   }
  // }
}
