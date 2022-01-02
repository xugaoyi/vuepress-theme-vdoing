import { DefaultThemeConfig } from '@vuepress/types'

type NoSidebar4DefaultThemeConfig = Omit<DefaultThemeConfig, 'sidebar'> // 忽略sidebar属性

/**
 * Vdoing主题配置类型
 * @see https://doc.xugaoyi.com/
 */
export interface VdoingThemeConfig extends NoSidebar4DefaultThemeConfig {
  /**
   * 是否打开分类功能. Enable classification
   * @default true
   */
  category?: boolean;

  /**
   * 是否打开标签功能. Enable tag
   * @default true
   */
  tag?: boolean;

  /**
   * 是否打开归档功能. Enable archive
   * @default true
   */
  archive?: boolean;

  /**
   * 碎片化文章（_posts文件夹的文章）预设生成的分类值
   * @default '随笔'
   */
  categoryText?: string;

  /**
   * body背景大图链接。单张图片 string | 多张图片 string[], 多张图片时每隔15秒换一张。
   * @default ''
   */
  bodyBgImg?: string | string[];

  /**
   * body背景图透明度，选值 0.1 ~ 1.0
   * @default 0.5
   */
  bodyBgImgOpacity?: 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;

  /**
   * 是否显示文章标题前的图标
   * @default true
   */
  titleBadge?: boolean;

  /**
   * 文章标题前图标的地址
   * @default <内置图标>
   */
  titleBadgeIcons?: string[];

  /**
   * 文章内容块的背景风格. 1 方格 | 2 横线 | 3 竖线 | 4 左斜线 | 5 右斜线 | 6 点状
   * @default <none>
   */
  contentBgStyle?: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * 最近更新栏. showToArticle 是否显示到文章页底部，默认true。 moreArticle “更多文章”跳转的页面，默认'/archives'
   * @default {showToArticle: true, moreArticle: '/archives'}
   */
  updateBar?: {
    showToArticle: boolean,
    moreArticle?: '/archives' | string
  };

  /**
   * 宽屏时是否显示右侧文章大纲栏 (屏宽小于1300px下无论如何都不显示)
   * @default true
   */
  rightMenuBar?: boolean;

  /**
   * 初始状态是否打开左侧边栏 (注：这里只是决定收起还是展开侧边栏)
   * @default true
   */
  sidebarOpen?: boolean;

  /**
   * 是否显示快捷翻页按钮
   * @default true
   */
  pageButton?: boolean;

  /**
   * 侧边栏配置
   */
  sidebar?:
  | 'structuring'
  | { mode: 'structuring', collapsable: Boolean }
  | DefaultThemeConfig['sidebar']

  /**
   * 文章默认的作者信息
   */
  author?: string | { name: string, link?: string }

  /**
   * 博主信息 (显示在首页侧边栏)
   */
  blogger?: {
    avatar: string,
    name: string,
    slogan?: string,
  }

  /**
   * 社交图标 (显示于博主信息栏和页脚栏)
   * @内置图标-see：https://doc.xugaoyi.com/pages/a20ce8/#social
   */
  social?: {
    iconfontCssFile?: string,
    icons: {
      iconClass: string,
      title: string,
      link: string,
    }[]
  }

  /**
   * 页脚信息
   */
  footer?: {
    createYear: number,
    copyrightInfo: string
  }

  /**
   * 自定义hmtl(广告)模块
   * @see: https://doc.xugaoyi.com/pages/a20ce8/#htmlmodules
   */
  htmlModules?: {
    homeSidebarB?: string,
    sidebarT?: string,
    sidebarB?: string,
    pageT?: string,
    pageB?: string,
    pageTshowMode?: 'article' | 'custom',
    pageBshowMode?: 'article' | 'custom',
    windowLB?: string,
    windowRB?: string,
  }

  /**
   * 兼容其他未列举配置项
   */
  [key: string]: any;
}
