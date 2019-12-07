module.exports = { // 侧边栏
  '/other/': [// 针对不同页面设置不同侧边栏
    {
      title: 'Git使用文档',
      path: 'git',
      collapsable: false
    },
    {
      title: 'GitHub使用技巧',
      collapsable: false,
      children: [
        ['github', 'GitHub高级搜索技巧']
      ]
    },
    {
      title: 'Markdown使用教程',
      path: 'markdown',
      collapsable: false
    },
    {
      title: '学习网站分享',
      path: 'study',
      collapsable: false
    },
    {
      title: '面试问题集锦',
      path: 'interview',
      collapsable: false
    },
  ],
  '/': [ // 在最后定义，在没有单独设置侧边栏时统一使用这个侧边栏
    '',
    'git',
    'github',
    'markdown',
    'study',
    'interview'
    // '/',
    // {
    //   title: 'foo', // 标题，必要的
    //   path: '/foo/', // 标题的路径，可选的, 应该是一个绝对路径
    //   collapsable: false, // 是否可折叠，可选的，默认true
    //   sidebarDepth: 1,    // 深度，可选的, 默认值是 1
    //   children: [
    //     ['foo/', '子页1'],
    //     'foo/1',
    //     'foo/2',
    //   ]
    // },
    // {
    //   title: 'bar',
    //   children: [
    //     ['bar/', '子页2'],
    //     'bar/3',
    //     'bar/4',
    //   ]
    // }
  ],
}