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
    {
      title: 'CSS/HTML',
      collapsable: false,
      children: [
        ['CSS-HTML/01.flex布局基础','flex布局基础'], 
        ['CSS-HTML/02.flex布局案例-骰子','flex布局案例-骰子'],
        ['CSS-HTML/03.flex布局案例-网格布局','flex布局案例-网格布局'],
        ['CSS-HTML/04.flex布局案例-圣杯布局','flex布局案例-圣杯布局'],
        ['CSS-HTML/05.flex布局案例-输入框布局','flex布局案例-输入框布局'], 
        ['CSS-HTML/06.CSS3之transform过渡','CSS3之transform过渡'], 
        ['CSS-HTML/07.CSS3之animation动画','CSS3之animation动画'], 
      ]
    },
  ],
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