// 此文件没有用到，仅用于测试和侧边栏数据格式的参考。

module.exports = { // 侧边栏
  '/01.前端/': [
    {
      title: 'JavaScript',
      collapsable: false, //是否可折叠，可选的，默认true
      children: [
        ['01.JavaScript/01.JavaScript中的名词概念','JavaScript中的名词概念'], 
        ['01.JavaScript/02.数据类型转换','数据类型转换'],
        ['01.JavaScript/03.ES5面向对象','ES5面向对象'],
        ['01.JavaScript/04.ES6面向对象','ES6面向对象'],
        ['01.JavaScript/05.new命令原理','new命令原理'],
        ['01.JavaScript/06.多种数组去重性能对比','多种数组去重性能对比'],
      ]
    },
  ],
  '/02.页面/': [
    {
      title: 'html-css',
      collapsable: false,
      children: [
        ['01.html-css/00.flex布局语法','flex布局语法'],
        ['01.html-css/01.flex布局案例-基础','flex布局案例-基础'], 
        ['01.html-css/02.flex布局案例-骰子','flex布局案例-骰子'],
        ['01.html-css/03.flex布局案例-网格布局','flex布局案例-网格布局'],
        ['01.html-css/04.flex布局案例-圣杯布局','flex布局案例-圣杯布局'],
        ['01.html-css/05.flex布局案例-输入框布局','flex布局案例-输入框布局'], 
        ['01.html-css/06.CSS3之transform过渡','CSS3之transform过渡'], 
        ['01.html-css/07.CSS3之animation动画','CSS3之animation动画'], 
      ]
    },
  ],
  '/03.技术杂谈/': [
    {
      title: '技术杂谈',
      collapsable: false, //是否可折叠，可选的，默认true
      sidebarDepth: 2, // 深度，可选的, 默认值是 1
      children: [
        ['01.Git使用手册','Git使用手册'], // 同 {path: '01.Git使用手册', title: 'Git使用文档'}
        ['02.GitHub高级搜索技巧','GitHub高级搜索技巧'],
        ['03.Markdown使用教程','Markdown使用教程'],
        ['04.npm常用命令','npm常用命令'],
        ['05.yaml语言教程','yaml语言教程'],
        ['06.解决百度无法收录搭建在GitHub上的个人博客的问题','解决百度无法收录搭建在GitHub上的个人博客的问题'],
        ['07.使用Gitalk实现静态博客无后台评论系统','使用Gitalk实现静态博客无后台评论系统'],
      ]
    }
  ],
  '/04.其他/': [
    {
      title: '学习',
      collapsable: false, 
      children: [
        ['01.学习/01.学习网站','学习网站'],
        ['01.学习/02.学习效率低，忘性很大怎么办？','学习效率低，忘性很大怎么办？'],
      ]
    },
    {
      title: '学习笔记',
      collapsable: false, 
      children: [
        ['02.学习笔记/01.小程序笔记','小程序笔记'],
      ]
    },
    {
      title: '面试',
      collapsable: false, //是否可折叠，可选的，默认true
      children: [
        ['03.面试/01.面试问题集锦','面试问题集锦'],
      ]
    },
    ['01.在线工具','在线工具'],
    ['02.友情链接','友情链接'],
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