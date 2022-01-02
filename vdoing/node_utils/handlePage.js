// 生成或删除页面（分类页、标签页、归档页...）

const fs = require('fs'); // 文件模块
const path = require('path'); // 路径模块
const chalk = require('chalk') // 命令行打印美化
const { type } = require('./modules/fn');
const log = console.log

function createPage (sourceDir, page) {
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
  } else if (page.indexOf('tags') > -1) {
    content = `---
tagsPage: true
title: 标签
permalink: /tags/
article: false
---`
  } else if (page.indexOf('archives') > -1) {
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

// 删除页面文件
function deletePage (sourceDir, page) {
  const dirPath = path.join(sourceDir, '@pages') // 文件夹路径
  const pagePath = path.join(dirPath, `${page}.md`) // 文件路径

  // 文件是否存在
  if (fs.existsSync(pagePath)) {
    fs.unlinkSync(pagePath)
    log(chalk.blue('tip ') + chalk.green(`delete page(删除页面): ${pagePath}`))
  }
  deleteDir(dirPath)
}

// 删除文件夹
function deleteDir (dirPath) {
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath)
    if (type(files) === 'array' && files.length === 0) {
      fs.rmdirSync(dirPath)
      log(chalk.blue('tip ') + chalk.green(`delete dir(删除目录): ${dirPath}`))
    }
  }
}

module.exports = {
  createPage,
  deletePage
}
