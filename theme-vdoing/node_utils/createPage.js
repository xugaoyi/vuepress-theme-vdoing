// 生成页面（分类页、标签页、归档页...）

const fs = require('fs'); // 文件模块
const path = require('path'); // 路径模块
const chalk = require('chalk') // 命令行打印美化
const log = console.log

function createPage(sourceDir, page) {
  const dirPath = path.join(sourceDir, '@pages') // 生成的文件夹路径

  // 文件夹不存在时
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath) // 创建文件夹
  }

  const pagePath = path.join(dirPath, `${page}.md`) // 生成的文件路径

  // 文件已经存在时跳出
  if (fs.existsSync(pagePath)) {
    return
  }

// 注意：反引号字符串的格式会映射到文件
let content = ''
if (page.indexOf('categories') > -1) {
  content = `---
categoriesPage: true
title: 分类
permalink: /categories/
article: false
---`
} else if (page.indexOf('tags') > -1){
  content = `---
tagsPage: true
title: 标签
permalink: /tags/
article: false
---`
} else if (page.indexOf('archives') > -1){
  content = `---
archivesPage: true
title: 归档
permalink: /archives/
article: false
---`
} 

  if (content) {
    fs.writeFileSync(pagePath, content)
    log(chalk.blue('tip ') + chalk.green(`create page(生成页面): ${pagePath}`))
  }
}

module.exports = createPage
