// 生成页面（分类页、标签页等）

const fs = require('fs'); // 文件模块
const path = require('path'); // 路径模块
const chalk = require('chalk') // 命令行打印美化

const log = console.log

function createPage(sourceDir, page) {
  const pageRoot = path.join(sourceDir, '@pages', `${page}.md`) // 生成的文件路径

// 判断相应的文件是否已经存在

// 注意：反引号字符串的格式会映射到文件
let content = ''
if (page.indexOf('categories')) {
  content = `---
categoriesPage: true
title: 分类
permalink: /categories/
article: false
---`
} else if (page.indexOf('tags')){
  content = `---
tagsPage: true
title: 标签
permalink: /tags/
article: false
---`
}
  fs.writeFileSync(urlsRoot, content)
  log(chalk.blue('tip ') + chalk.green(`create page(生成页面): ${page}`))
}

module.exports = createPage
