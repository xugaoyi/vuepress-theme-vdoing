var nav = require('./config/nav.js');
var sidebar = require('./config/sidebar.js');
module.exports = {
  title: 'Evan Blog', // 标题
  description: 'Evan Blog 个人博客，基于vuepress构建，专注前端学习与总结', // 描述，以 <meta> 标签渲染到当前页面的 HTML 中
  // process.env.VUEPRESS_BASE 在package.json生成
 // base: process.env.VUEPRESS_BASE || '/', // 基础路径，默认'/',如果放到github pages要改成仓库名
  head: [ // 注入到当前页面<head> 中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
    ['link', { rel: 'icon', href: '/img/logo.png' }] //favicons，资源放在public文件夹
  ],
  markdown: {
    lineNumbers: true // 代码行号
  },
  plugins: ['@vuepress/back-to-top', '@vuepress/medium-zoom'], // 插件
  themeConfig: { // 主题配置
    logo: '/img/logo.png', // 导航栏logo
    nav: nav,
    repo: 'xugaoyi/evanblog', // 导航栏生成Github链接
    // editLinks: true, // 编辑链接
    // editLinkText: '在 Github 上编辑此页',
    lastUpdated: '上次更新', // 上次更新时间，及前缀文字   string | boolean
    // displayAllHeaders: true // 默认值：false
    sidebar: 'auto', //自动侧边栏
    //sidebar: sidebar,
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
    'vuepress-plugin-baidu-autopush',
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
      'vuepress-plugin-baidu-tongji',
      {
        hm: '8a59017a97d9fc47d607481723b7815d'
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
