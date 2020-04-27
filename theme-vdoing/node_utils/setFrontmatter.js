const fs = require('fs'); // 文件模块
const matter = require('gray-matter'); // FrontMatter解析器 https://github.com/jonschlinkert/gray-matter
const jsonToYaml = require('json2yaml')
const chalk = require('chalk') // 命令行打印美化
// const arg = process.argv.splice(2)[0]; // 获取命令行传入的参数
const readFileList = require('./modules/readFileList');
const { type, repairDate, dateFormat} = require('./modules/fn');
const log = console.log

const PREFIX = '/pages/'


/**
 * 给.md文件设置frontmatter(标题、日期、永久链接)
 */
function setFrontmatter(sourceDir) {
  const files = readFileList(sourceDir); // 读取所有md文件数据

  files.forEach(file => {
    let dataStr = fs.readFileSync(file.filePath, 'utf8');// 读取每个md文件内容

    // fileMatterObj => {content:'剔除frontmatter后的文件内容字符串', data:{<frontmatter对象>}, ...}
    const fileMatterObj = matter(dataStr);

    if (Object.keys(fileMatterObj.data).length === 0) { // 未定义FrontMatter数据
      const stat = fs.statSync(file.filePath);
      const dateStr = dateFormat(stat.birthtime);// 文件的创建时间

     
      const categories = getCategories(file)
// 注意下面这个字符串的格式会映射到文件
const newData = `---
title: ${file.name}
date: ${dateStr}
permalink: ${getPermalink()}
categories: 
  - ${categories[0]}${categories[1] ? '\r\n  - '+ categories[1] : ''}
tags: 
  - 
---
\r\n${fileMatterObj.content}`;
      
      fs.writeFileSync(file.filePath, newData); // 写入
      log(chalk.blue('tip ') + chalk.green(`write frontmatter(写入frontmatter)：${file.filePath} `))

    } else { // 已有FrontMatter
      const matterData = fileMatterObj.data;
      let mark = false;

      // 已有FrontMatter，但是没有title、date、permalink、categories、tags数据的
      if (!matterData.hasOwnProperty('title')) { // 标题
        matterData.title = file.name;
        mark = true;
      }

      if (!matterData.hasOwnProperty('date')) { // 日期
        const stat = fs.statSync(file.filePath);
        matterData.date = dateFormat(stat.birthtime);
        mark = true;
      }

      if (!matterData.hasOwnProperty('permalink')) { // 永久链接
        matterData.permalink = getPermalink();
        mark = true;
      }

      if ( !matterData.hasOwnProperty('pageComponent') && matterData.article !== false ) { // 是文章页才添加分类和标签
        if (!matterData.hasOwnProperty('categories')) { // 分类
          matterData.categories = getCategories(file)
          mark = true;
        }
  
        if (!matterData.hasOwnProperty('tags')) { // 标签
          matterData.tags = [''];
          mark = true;
        }
      }

      if (mark) {
        if(matterData.date && type(matterData.date) === 'date') {
          matterData.date = repairDate(matterData.date) // 修复时间格式
        }
        const newData = jsonToYaml.stringify(matterData).replace(/\n\s{2}/g,"\n").replace(/"/g,"") + '---\r\n' + fileMatterObj.content;
        fs.writeFileSync(file.filePath, newData); // 写入
        log(chalk.blue('tip ') + chalk.green(`write frontmatter(写入frontmatter)：${file.filePath} `))
      }
      
    }
  })
}

// 获取分类数据
function getCategories(file) {
  let categories = ['博文']

  if (file.filePath.indexOf('_posts') === -1) { // 不在_posts文件夹
    const filePathArr = file.filePath.split('\\')
    categories[0] = filePathArr[filePathArr.length - 3].split('.').pop() // 获取分类1
    const c = filePathArr[filePathArr.length - 2].split('.').pop() // 获取分类2
    if (c !== 'docs') {
      categories[1] = c
    }
  }
  return categories
}

// 定义永久链接数据
function getPermalink() {
  return `${PREFIX + (Math.random() + Math.random()).toString(16).slice(2, 8)}`
}


module.exports = setFrontmatter;
