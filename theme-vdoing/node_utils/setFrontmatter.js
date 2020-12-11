const fs = require('fs'); // 文件模块
const matter = require('gray-matter'); // FrontMatter解析器 https://github.com/jonschlinkert/gray-matter
const jsonToYaml = require('json2yaml')
const chalk = require('chalk') // 命令行打印美化
// const arg = process.argv.splice(2)[0]; // 获取命令行传入的参数
const readFileList = require('./modules/readFileList');
const { type, repairDate, dateFormat } = require('./modules/fn');
const log = console.log
const path = require('path');

const PREFIX = '/pages/'


/**
 * 给.md文件设置frontmatter(标题、日期、永久链接等数据)
 */
function setFrontmatter (sourceDir, themeConfig) {

  const isCategory = themeConfig.category
  const isTag = themeConfig.tag
  const categoryText = themeConfig.categoryText || '随笔'

  const files = readFileList(sourceDir); // 读取所有md文件数据

  files.forEach(file => {
    let dataStr = fs.readFileSync(file.filePath, 'utf8');// 读取每个md文件内容

    // fileMatterObj => {content:'剔除frontmatter后的文件内容字符串', data:{<frontmatter对象>}, ...}
    const fileMatterObj = matter(dataStr);

    if (Object.keys(fileMatterObj.data).length === 0) { // 未定义FrontMatter数据
      const stat = fs.statSync(file.filePath);
      const dateStr = dateFormat(
        getBirthtime(stat)
      ); // 文件的创建时间
      const categories = getCategories(
        file,
        categoryText
      );

      let cateLabelStr = '';
      categories.forEach(item => {
        cateLabelStr += '\r\n  - ' + item
      });

      let cateStr = '';
      if (!(isCategory === false)) {
        cateStr = '\r\ncategories:' + cateLabelStr
      };

        // 注意下面这些反引号字符串的格式会映射到文件
        //       const cateStr = isCategory === false ? '' : `
        // categories:
        //   - ${categories[0]}${categories[1] ? '\r\n  - ' + categories[1] : ''}`;

      const tagsStr = isTag === false ? '' : `
tags:
  - `;

      const fmData = `---
title: ${file.name}
date: ${dateStr}
permalink: ${getPermalink()}${file.filePath.indexOf('_posts') > -1 ? '\r\nsidebar: auto' : ''}${cateStr}${tagsStr}
---`;

      fs.writeFileSync(file.filePath, `${fmData}\r\n${fileMatterObj.content}`); // 写入
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
        matterData.date = dateFormat(getBirthtime(stat));
        mark = true;
      }

      if (!matterData.hasOwnProperty('permalink')) { // 永久链接
        matterData.permalink = getPermalink();
        mark = true;
      }

      if (file.filePath.indexOf('_posts') > -1 && !matterData.hasOwnProperty('sidebar')) { // auto侧边栏，_posts文件夹特有
        matterData.sidebar = "auto";
        mark = true;
      }

      if (!matterData.hasOwnProperty('pageComponent') && matterData.article !== false) { // 是文章页才添加分类和标签
        if (isCategory !== false && !matterData.hasOwnProperty('categories')) { // 分类
          matterData.categories = getCategories(file, categoryText)
          mark = true;
        }

        if (isTag !== false && !matterData.hasOwnProperty('tags')) { // 标签
          matterData.tags = [''];
          mark = true;
        }
      }

      if (mark) {
        if (matterData.date && type(matterData.date) === 'date') {
          matterData.date = repairDate(matterData.date) // 修复时间格式
        }
        const newData = jsonToYaml.stringify(matterData).replace(/\n\s{2}/g, "\n").replace(/"/g, "") + '---\r\n' + fileMatterObj.content;
        fs.writeFileSync(file.filePath, newData); // 写入
        log(chalk.blue('tip ') + chalk.green(`write frontmatter(写入frontmatter)：${file.filePath} `))
      }

    }
  })
}

// 获取分类数据
function getCategories (file, categoryText) {
  let categories = []

  if (file.filePath.indexOf('_posts') === -1) {
    // 不在_posts文件夹
    let filePathArr = file.filePath.split(path.sep) // path.sep用于兼容不同系统下的路径斜杠
    filePathArr.pop()

    let ind = filePathArr.indexOf('docs')
    if (ind !== -1) {
      while (filePathArr[++ind] !== undefined) {
        categories.push(filePathArr[ind].split('.').pop()) // 获取分类
      }
    }
  } else {
    categories.push(categoryText)
  }
  return categories
}

// 获取文件创建时间
function getBirthtime (stat) {
  // 在一些系统下无法获取birthtime属性的正确时间，使用atime代替
  return stat.birthtime.getFullYear() != 1970 ? stat.birthtime : stat.atime
}

// 定义永久链接数据
function getPermalink () {
  return `${PREFIX + (Math.random() + Math.random()).toString(16).slice(2, 8)}/`
}


module.exports = setFrontmatter;
