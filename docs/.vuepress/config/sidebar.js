module.exports = { // 侧边栏
  '/other/': [// 针对不同页面设置不同侧边栏
    {
      title: '技术',
      collapsable: false, //是否可折叠，可选的，默认true
      sidebarDepth: 2, // 深度，可选的, 默认值是 1
      children: [
        ['git','Git使用文档'], // 同 {title: 'Git使用文档',path: 'git'}
        ['github','GitHub高级搜索技巧'],
        ['markdown','Markdown使用教程'],
        ['npm','npm使用教程'],
      ]
    },

    {
      title: '学习',
      collapsable: false,
      children: [
        ['LearningAndMemory','学习网学习效果低，忘性很大怎么办？'],
        ['study','学习网站分享'],
      ]
    },

    {
      title: '面试',
      collapsable: false,
      children: [
        ['interview','面试问题集锦'],
      ]
    },
    {
      title: '其他',
      collapsable: false,
      children: [
        ['https://github.com/xugaoyi/evanblog','关于本博客搭建'],
      ]
    },
  ],
  // '/': [ // 在最后定义，在没有单独设置侧边栏时统一使用这个侧边栏
  //   '',
  //   'git',
  //   'github',
  //   'markdown',
  //   'study',
  //   'interview'
  //   // '/',
  //   // {
  //   //   title: 'foo', // 标题，必要的
  //   //   path: '/foo/', // 标题的路径，可选的, 应该是一个绝对路径
  //   //   collapsable: false, // 是否可折叠，可选的，默认true
  //   //   sidebarDepth: 1,    // 深度，可选的, 默认值是 1
  //   //   children: [
  //   //     ['foo/', '子页1'],
  //   //     'foo/1',
  //   //     'foo/2',
  //   //   ]
  //   // },
  //   // {
  //   //   title: 'bar',
  //   //   children: [
  //   //     ['bar/', '子页2'],
  //   //     'bar/3',
  //   //     'bar/4',
  //   //   ]
  //   // }
  // ],
}