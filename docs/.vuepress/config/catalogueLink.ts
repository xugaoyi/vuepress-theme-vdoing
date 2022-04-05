// 目录链接映射配置
export default {
  // 是否展开（默认true）
  expand: true,
  // 是否显示图标（默认false）
  iconShow: false,
  // 树形序号相关的设置
  treeNumberSet: {
    // 序号显示的总开关（默认true）
    show: true,
    // 序号显示到的级别（此处填写整数，例如：1、2、3。默认-1，负数表示显示全部级别。）
    level: -1,
    // 只有链接才显示序号（默认false）
    onlyLink: false,
    // 链接是否显示序号（默认true）
    link: true,
  },
  // 目录链接映射
  linksMap: [
    // 这是第一种配置：树形（有children）
    {
      catalogueLink: '/tree-demo',
      title: '一级标题',
      children: [
        {
          title: '二级标题1',
          items: [
            { text: '二级标题1 - 三级链接1', link: '/demo-link/' },
            { text: '二级标题1 - 三级链接2', link: '/demo-link/' },
          ],
          children: [
            { 
              title: '三级标题1',
              items: [
                { text: '三级标题1 - 四级链接1', link: '/demo-link/' },
                { text: '三级标题1 - 四级链接2', link: '/demo-link/' },
                { text: '三级标题1 - 四级链接3', link: '/demo-link/' },
              ],
            },
            { 
              title: '三级标题2',
              items: [
                { text: '三级标题2 - 四级链接1', link: '/demo-link/' },
                { text: '三级标题2 - 四级链接2', link: '/demo-link/' },
              ],
              children: [
                { 
                  title: '四级标题1',
                  items: [
                    { text: '四级标题1 - 五级链接1', link: '/demo-link/' },
                    { text: '四级标题1 - 五级链接2', link: '/demo-link/' },
                  ],
                },
                { 
                  title: '四级标题2',
                  items: [
                    { text: '四级标题2 - 五级链接1', link: '/demo-link/' },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: '二级标题2',
          items: [
            { text: '二级标题2 - 三级链接1', link: '/demo-link/' },
          ],
          children: [
            {
              title: '三级标题1',
              items: [
                { text: '三级标题1 - 四级链接1', link: '/demo-link/' },
              ],
              }
          ]
        },
      ],
    },
    // 这是第二种配置：非树形（没有children，只有items）
    {
      catalogueLink: '/no-tree-demo/',
      items: [
        { text: '非树形1', link: '/demo-link/' },
        { text: '非树形2', link: '/demo-link/' },
        { text: '非树形3', link: '/demo-link/' },
      ],
    }
  ]

}