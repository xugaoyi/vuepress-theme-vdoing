import { DefaultThemeConfig } from '@vuepress/types'

// vdoing主题配置类型
export interface VdoingThemeConfig extends DefaultThemeConfig {
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


}
