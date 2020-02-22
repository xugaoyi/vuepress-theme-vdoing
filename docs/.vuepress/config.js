const nav = require('./config/nav.js');
const sidebar = require('./config/sidebar-auto.js');

module.exports = {
  title: "Evan's blog", // 标题
  description: 'web前端技术博客,简洁至上,专注web前端学习与总结。JavaScript,js,ES6,TypeScript,vue,python,css3,html5,Node,git,github等技术文章。', // 描述,以 <meta> 标签渲染到当前页面的 HTML 中
  // base: '/blog/', //默认'/' || github仓库名'/<仓库名>/',
  head: [ // 注入到当前页面<head> 中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
    ['link', { rel: 'icon', href: '/img/EB-logo.png' }], //favicons，资源放在public文件夹
    ['meta', { name: 'keywords', content: '前端博客,个人技术博客,前端,前端开发,前端框架,web前端,前端面试题,技术文档,学习,面试,JavaScript,js,ES6,TypeScript,vue,python,css3,html5,Node,git,github,markdown'}],
    ['meta', { name: 'baidu-site-verification', content: '7F55weZDDc'}],
    ['meta', { name: 'theme-color', content: '#11a8cd'}], // 移动浏览器主题颜色
    // ['script', { src: 'https://hm.baidu.com/hm.js?837775213e724293b4af2b9526e238b4'}]

    // 以下是vuepress-plugin-demo-block插件所需依赖
    // ['script', { src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js' }], // 此文件会影响导航router-link-active样式的切换
    // ['script', { src: 'https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js' }],
  ],
  markdown: {
    // lineNumbers: true // 代码行号
  },
  themeConfig: { // 主题配置
    nav,
    sidebar, // 侧边栏    'auto' | 自定义
    sidebarDepth: 2, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
    logo: '/img/EB-logo.png', // 导航栏logo
    repo: 'xugaoyi/blog', // 导航栏右侧生成Github链接
    searchMaxSuggestions: 10, // 搜索显示最大数
    lastUpdated: '上次更新', // 更新的时间，及前缀文字   string | boolean (取值为git提交时间)

    docsDir: 'docs', // 编辑的文件夹
    editLinks: true, // 编辑链接
    editLinkText: '编辑',
    // displayAllHeaders: true, // 默认值：false
  },
  plugins: [ // 插件
    require('./plugins/love-me'), // 鼠标点击爱心特效
    require('./plugins/title-badge'), // h1标题徽章
    'vuepress-plugin-baidu-autopush', // 百度自动推送，作用：加快将页面推送给百度搜索
    '@vuepress/back-to-top', // 返回顶部

    // ['@vuepress/search', { 
    //   searchMaxSuggestions: 10 
    // }],

    ['demo-block', { // demo演示模块
      settings: {
        // jsLib: ['http://xxx'], // 在线示例(jsfiddle, codepen)中的js依赖
        // cssLib: ['http://xxx'], // 在线示例中的css依赖
        // vue: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js', // 在线示例中的vue依赖
        jsfiddle: false, // 是否显示 jsfiddle 链接
        codepen: true, // 是否显示 codepen 链接
        horizontal: false // 是否展示为横向样式
      }
    }],
    [
      'vuepress-plugin-zooming', // 放大图片
      {
        selector:'.theme-default-content :not(h1) img',
        options: {
          bgColor: 'rgba(0,0,0,0.6)'
        },
      },
    ],
    [
      'vuepress-plugin-baidu-tongji', // 百度统计，https://tongji.baidu.com
      {
        hm: '503f098e7e5b3a5b5d8c5fc2938af002'
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
          id: "<%- (frontmatter.permalink || frontmatter.to.path).slice(-16) %>", //  页面的唯一标识,长度不能超过50
          title: "「评论」<%- frontmatter.title %>", // GitHub issue 的标题
          // id: "<%- (window.location.origin + (frontmatter.to.path || window.location.pathname)).slice(-50) %>", 
          // title: "「评论」<%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>", 
          labels: ["Gitalk", "Comment"], // GitHub issue 的标签
          body:"页面：<%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>" // GitHub issue 的内容
        }
      }
    ],
    [
      '@vuepress/last-updated', // "上次更新"时间格式
      {
        transformer: (timestamp, lang) => {
          const moment = require('moment') // https://momentjs.com/
          return moment(timestamp).format('YYYY/MM/DD, H:MM:SS');
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
