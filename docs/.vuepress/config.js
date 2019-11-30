var sidebar = require('./config/sidebar.json')
module.exports = {
  title: 'Coding Yang BLOG',
  description: 'Just playing around',
  base: process.env.VUEPRESS_BASE || '/',
  themeConfig: {
    nav: [
      {text: '首页', link: '/'},
      {
        text: '文章',
        items: [
          {text: '儿童编程教育', link: '/article_child/'},
          {text: '技术文章', link: '/article_tech/'},
          {text: '个人', link: '/article_self/'}
        ]
      },
      {
        text: '教育软件',
        items: [
          {text: '识字率测试', link: 'http://www.codingyang.com/word/'},
          {
            text: '奖励记录星',
            link: 'http://www.codingyang.com/stars/'
          },

          {text: '相关介绍', link: '/child/'}
        ]
      },
      {text: '其他程序', link: '/code/'},
      {
        text: '联系我',
        ariaLabel: '其他技术博客',
        items: [
          {text: '联系我', link: '/about/'},
          {text: 'CSDN', link: 'https://blog.csdn.net/henjuewang'},
          {text: '简书', link: 'https://www.jianshu.com/u/2d95604f4b82'},
          {text: '微博', link: 'https://weibo.com/u/1828163444'},
          {text: 'github', link: 'https://github.com/rackar'},
          {text: '码云', link: 'https://gitee.com/rackar'}
        ]
      }
    ],
    // sidebar: 'auto', //自动侧边栏
    sidebar: sidebar
    // displayAllHeaders: true // 默认值：false
  },
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
      title: 'CodingYang 博客',
      description:
        '博客文章列表，包括儿童编程、儿童教育及程序开发、个人感悟等主题 '
    },
    '/en/': {
      lang: 'en-US',
      title: 'CodingYang BLOG',
      description:
        "children's programming, children's education and program development"
    }
  },
  plugins: [
    'vuepress-plugin-baidu-autopush',
    [
      'vuepress-plugin-baidu-tongji',
      {
        hm: '19a1f669e77c8a8c0bf92f95cca4c782'
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
