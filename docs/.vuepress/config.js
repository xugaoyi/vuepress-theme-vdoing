const nav = require('./config/nav.js');
const sidebar = require('./config/sidebar.js');
module.exports = {
  title: 'Evan Blog', // 标题
  description: 'Evan Blog个人技术博客,基于vuepress构建,专注web前端学习与总结。JavaScript,js,ES6,TypeScript,vue,python,css3,html5,Node,git,github等技术文章。', // 描述,以 <meta> 标签渲染到当前页面的 HTML 中
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
    logo: '/img/logo2.png', // 导航栏logo
    nav,
    repo: 'xugaoyi/evanblog', // 导航栏右侧生成Github链接
    // editLinks: true, // 编辑链接
    // editLinkText: '在 Github 上编辑此页',
    lastUpdated: '更新于', // 更新的时间，及前缀文字   string | boolean
    // displayAllHeaders: true // 默认值：false
    //sidebar: 'auto', //自动侧边栏
    sidebar
  },
  // locales: {
  //   // 键名是该语言所属的子路径
  //   // 作为特例，默认语言可以使用 '/' 作为其路径。
  //   '/': {
  //     lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
  //     title: 'Evan 博客',
  //     description:
  //       '博客文章列表，包括儿童编程、儿童教育及程序开发、个人感悟等主题 '
  //   },
  //   '/en/': {
  //     lang: 'en-US',
  //     title: 'Evan Blog',
  //     description:
  //       "children's programming, children's education and program development"
  //   }
  // },
  plugins: [ // 插件
    'vuepress-plugin-baidu-autopush', // 百度自动推送，作用：加快将页面推送给百度搜索
    '@vuepress/back-to-top', // 返回顶部
    [
      '@vuepress/medium-zoom',
      {
        options: {
          background: 'rgba(0,0,0,0.8)'
        }
      }
    ], // 缩放图片
    [
      'vuepress-plugin-baidu-tongji', // 百度统计，https://tongji.baidu.com
      {
        hm: '837775213e724293b4af2b9526e238b4'
      }
    ]
  ],
  configureWebpack: {
    //webpack别名 如![Image from alias](~@alias/image.png)
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  }
}
