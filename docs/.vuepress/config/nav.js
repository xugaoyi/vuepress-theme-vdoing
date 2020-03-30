module.exports = [
  {text: '首页', link: '/'},

  {text: '前端',
    link: '/web/', // 目录页，新增的配置项
    items: [
      {text: '前端文章', items: [
        {text: 'JavaScript', link: '/pages/8143cc480faf9a11/'},
        {text: 'Vue', link: '/pages/802a1ca6f7b71c59/'},
      ]},
      {text: '学习笔记', items:[
        {text: '《JavaScript教程》笔记', link: '/note/javascript/'},
        {text: '《ES6 教程》笔记', link: '/note/es6/'},
        {text: '《Vue》笔记', link: '/note/vue/'},
        {text: '《TypeScript 从零实现 axios》', link: '/note/typescript-axios/'},
        {text: '小程序笔记', link: '/note/wx-miniprogram/'},
      ]}
    ]
  },
  {text: '页面', 
    link: '/ui/',
    items: [
      {text: 'HTML', link: '/pages/8309a5b876fc95e3/'},
      {text: 'CSS', link: '/pages/0a83b083bdf257cb/'},
    ]
  },
  {text: '技术',
    link: '/technology/',
    items: [
      {text: '技术文档', link: '/pages/9a7ee40fc232253e/'},
      {text: 'GitHub技巧', link: '/pages/4c778760be26d8b3/'},
      {text: 'Nodejs', link: '/pages/117708e0af7f0bd9/'},
      {text: '博客搭建', link: '/pages/41f87d890d0a02af/'},
    ]
  },
  {text: '更多', 
    link: '/more/',
    items: [
      {text: '学习', link: '/pages/a8692ab3bdcb4588/'},
      {text: '面试', link: '/pages/aea6571b7a8bae86/'},
      {text: '心情杂货', link: '/pages/2d615df9a36a98ed/'},
      {text: '学习网站', link: '/pages/2e9ba3fa6e1ed0e9/'},
      {text: '在线工具', link: '/pages/9c2232288caaa8ec/'},
      {text: '友情链接', link: '/pages/844eea1b2387fb96/'},
    ]
  },
  {text: '关于', link: '/about/'},
  {text: '时间轴', link: '/timeline/'},
]