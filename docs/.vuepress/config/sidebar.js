module.exports = { // 侧边栏
  '/web/': [
    {
      title: 'JavaScript',
      collapsable: false, //是否可折叠，可选的，默认true
      children: [
        ['JavaScript/01.JavaScript中的名词概念','JavaScript中的名词概念'], 
        ['JavaScript/02.数据类型转换','数据类型转换'],
        ['JavaScript/03.ES5面向对象','ES5面向对象'],
        ['JavaScript/04.ES6面向对象','ES6面向对象'],
        ['JavaScript/05.new命令原理','new命令原理'],
        ['JavaScript/06.多种数组去重性能对比','多种数组去重性能对比'],
      ]
    },
  ],
  '/ui/': [
    {
      title: 'HTML/CSS',
      collapsable: false,
      children: [
        ['00.flex布局语法','flex布局语法'],
        ['01.flex布局案例-基础','flex布局案例-基础'], 
        ['02.flex布局案例-骰子','flex布局案例-骰子'],
        ['03.flex布局案例-网格布局','flex布局案例-网格布局'],
        ['04.flex布局案例-圣杯布局','flex布局案例-圣杯布局'],
        ['05.flex布局案例-输入框布局','flex布局案例-输入框布局'], 
        ['06.CSS3之transform过渡','CSS3之transform过渡'], 
        ['07.CSS3之animation动画','CSS3之animation动画'], 
      ]
    },
  ],
  '/other/': [
    {
      title: '技术',
      collapsable: false, //是否可折叠，可选的，默认true
      sidebarDepth: 2, // 深度，可选的, 默认值是 1
      children: [
        ['git','Git使用文档'], // 同 {title: 'Git使用文档',path: 'git'}
        ['github','GitHub高级搜索技巧'],
        ['markdown','Markdown使用教程'],
        ['npm','npm使用教程'],
        ['yaml','yaml教程'],
      ]
    },
    {
      title: '学习',
      collapsable: false,
      children: [
        ['LearningAndMemory','学习效果低，忘性很大怎么办？'],
        ['study','学习网站分享'],
      ]
    },
    {
      title: '学习笔记',
      collapsable: false,
      children: [
        ['note/01.小程序笔记','小程序笔记'],
        ['https://github.com/xugaoyi/python-learn','《Python语言程序设计》基础课程学习'],
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
        ['utils','在线工具'],
        ['https://github.com/xugaoyi/evanblog','关于本博客搭建'],
        ['baidushoulu','解决百度无法收录搭建在GitHub上的个人博客的问题']
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