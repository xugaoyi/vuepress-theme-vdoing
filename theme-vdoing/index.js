const path = require('path')
const setFrontmatter = require('./node_utils/setFrontmatter')
const getSidebarData = require('./node_utils/getSidebarData')
const {createPage, deletePage} = require('./node_utils/handlePage')
const chalk = require('chalk') // 命令行打印美化
const log = console.log


// Theme API.
module.exports = (options, ctx) => {
  const { sourceDir, themeConfig, siteConfig } = ctx
  
  // 自动设置front matter
  setFrontmatter(sourceDir, themeConfig)

  // 自动生成结构化侧边栏
  const sidebar = themeConfig.sidebar
  if(sidebar === 'structuring' || sidebar && sidebar.mode === 'structuring') {
    const collapsable = themeConfig.sidebar.collapsable === false ? false : true
    const sidebarData = getSidebarData(sourceDir, collapsable)
    if(sidebarData) {
      themeConfig.sidebar = sidebarData
      log(chalk.blue('tip ') + chalk.green('add sidebar data. 侧边栏数据成功生成。'))
    } else {
      themeConfig.sidebar = 'auto'
      log(chalk.yellow('warning: fail to add sidebar data, switch to "auto". 未能添加侧边栏数据，将切换为“auto”。'))
    }
  }

  // 分类页
  if (themeConfig.category !== false) {
    createPage(sourceDir, 'categoriesPage')
  } else {
    deletePage(sourceDir, 'categoriesPage')
  }

  // 标签页
  if (themeConfig.tag !== false) {
    createPage(sourceDir, 'tagsPage')
  } else {
    deletePage(sourceDir, 'tagsPage')
  }
  
  // 归档页
  if (themeConfig.archive !== false) {
    createPage(sourceDir, 'archivesPage')
  } else {
    deletePage(sourceDir, 'archivesPage')
  }

  // resolve algolia
  const isAlgoliaSearch = (
    themeConfig.algolia
    || Object
        .keys(siteConfig.locales && themeConfig.locales || {})
        .some(base => themeConfig.locales[base].algolia)
  )

  const enableSmoothScroll = themeConfig.smoothScroll === true

  return {
    alias () {
      return {
        '@AlgoliaSearchBox': isAlgoliaSearch
          ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
          : path.resolve(__dirname, 'noopModule.js')
      }
    },

    plugins: [
      ['@vuepress/active-header-links', options.activeHeaderLinks],
      '@vuepress/search',
      '@vuepress/plugin-nprogress',
      ['container', {
        type: 'tip',
        defaultTitle: {
          '/': 'TIP',
          '/zh/': '提示'
        }
      }],
      ['container', {
        type: 'warning',
        defaultTitle: {
          '/': 'WARNING',
          '/zh/': '注意'
        }
      }],
      ['container', {
        type: 'danger',
        defaultTitle: {
          '/': 'WARNING',
          '/zh/': '警告'
        }
      }],
      ['smooth-scroll', enableSmoothScroll]
    ]
  }
}
