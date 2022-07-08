const fs = require('fs'); // 文件模块
const matter = require('gray-matter'); // FrontMatter解析器 https://github.com/jonschlinkert/gray-matter
const jsonToYaml = require('json2yaml')
const chalk = require('chalk') // 命令行打印美化
// const arg = process.argv.splice(2)[0]; // 获取命令行传入的参数
const readFileList = require('./modules/readFileList');
const { type, repairDate, dateFormat } = require('./modules/fn');
const log = console.log
const path = require('path');
const os = require('os');

const PREFIX = '/pages/'

/**
 * 给.md文件设置frontmatter(标题、日期、永久链接等数据)
 */
function setFrontmatter(sourceDir, themeConfig) {
  const { category: isCategory, tag: isTag, categoryText = '随笔', extendFrontmatter } = themeConfig
  const files = readFileList(sourceDir) // 读取所有md文件数据
  // 扩展自定义生成frontmatter
  const extendFrontmatterStr = extendFrontmatter ?
    jsonToYaml.stringify(extendFrontmatter)
      .replace(/\n\s{2}/g, "\n")
      .replace(/"|---\n/g, "")
    : '';

  files.forEach(file => {
    let dataStr = fs.readFileSync(file.filePath, 'utf8');// 读取每个md文件内容

    // fileMatterObj => {content:'剔除frontmatter后的文件内容字符串', data:{<frontmatter对象>}, ...}
    const fileMatterObj = matter(dataStr, {});

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
        cateLabelStr += os.EOL + '  - ' + item
      });

      let cateStr = '';
      if (!(isCategory === false)) {
        cateStr = os.EOL + 'categories:' + cateLabelStr
      };

      // 注意下面这些反引号字符串的格式会映射到文件
      const tagsStr = isTag === false ? '' : `
tags:
  - `;

      const fmData = `---
title: ${file.name}
date: ${dateStr}
permalink: ${getPermalink()}${file.filePath.indexOf('_posts') > -1 ? os.EOL + 'sidebar: auto' : ''}${cateStr}${tagsStr}
${extendFrontmatterStr}---`;

      fs.writeFileSync(file.filePath, `${fmData}${os.EOL}${fileMatterObj.content}`); // 写入
      log(chalk.blue('tip ') + chalk.green(`write frontmatter(写入frontmatter)：${file.filePath} `))

    } else { // 已有FrontMatter
      let matterData = fileMatterObj.data;
      let hasChange = false;

      // 已有FrontMatter，但是没有title、date、permalink、categories、tags数据的
      if (!matterData.hasOwnProperty('title')) { // 标题
        matterData.title = file.name;
        hasChange = true;
      }

      if (!matterData.hasOwnProperty('date')) { // 日期
        const stat = fs.statSync(file.filePath);
        matterData.date = dateFormat(getBirthtime(stat));
        hasChange = true;
      }

      if (!matterData.hasOwnProperty('permalink')) { // 永久链接
        matterData.permalink = getPermalink();
        hasChange = true;
      }

      if (file.filePath.indexOf('_posts') > -1 && !matterData.hasOwnProperty('sidebar')) { // auto侧边栏，_posts文件夹特有
        matterData.sidebar = "auto";
        hasChange = true;
      }

      if (!matterData.hasOwnProperty('pageComponent') && matterData.article !== false) { // 是文章页才添加分类和标签
        if (isCategory !== false && !matterData.hasOwnProperty('categories')) { // 分类
          matterData.categories = getCategories(file, categoryText)
          hasChange = true;
        }
        if (isTag !== false && !matterData.hasOwnProperty('tags')) { // 标签
          matterData.tags = [''];
          hasChange = true;
        }
      }

      // 扩展自动生成frontmatter的字段
      if (type(extendFrontmatter) === 'object') {
        Object.keys(extendFrontmatter).forEach(keyName => {
          if (!matterData.hasOwnProperty(keyName)) {
            matterData[keyName] = extendFrontmatter[keyName]
            hasChange = true;
          }
        })
      }

      if (hasChange) {
        if (matterData.date && type(matterData.date) === 'date') {
          matterData.date = repairDate(matterData.date) // 修复时间格式
        }
        const newData = jsonToYaml.stringify(matterData).replace(/\n\s{2}/g, "\n").replace(/"/g, "") + '---' + os.EOL + fileMatterObj.content;
        fs.writeFileSync(file.filePath, newData); // 写入
        log(chalk.blue('tip ') + chalk.green(`write frontmatter(写入frontmatter)：${file.filePath} `))
      }

    }
  })
}

// 获取分类数据
function getCategories(file, categoryText) {
  let categories = []

  if (file.filePath.indexOf('_posts') === -1) {
    // 不在_posts文件夹
    let filePathArr = file.filePath.split(path.sep) // path.sep用于兼容不同系统下的路径斜杠
    filePathArr.pop()

    let ind = filePathArr.indexOf('docs')
    if (ind !== -1) {
      while (filePathArr[++ind] !== undefined) {
        const item = filePathArr[ind]
        const firstDotIndex = item.indexOf('.');
        categories.push(item.substring(firstDotIndex + 1) || '') // 获取分类
        // categories.push(filePathArr[ind].split('.').pop()) // 获取分类
      }
    }
  } else {
    // 碎片化文章的分类生成
    const matchResult = file.filePath.match(/_posts\/(\S*)\//);
    const resultStr = matchResult ? matchResult[1] : ''
    const resultArr = resultStr.split('/').filter(Boolean)

    if (resultArr.length) {
      categories.push(...resultArr)
    } else {
      categories.push(categoryText)
    }
  }
  return categories
}

// 获取文件创建时间
function getBirthtime(stat) {
  // 在一些系统下无法获取birthtime属性的正确时间，使用atime代替
  return stat.birthtime.getFullYear() != 1970 ? stat.birthtime : stat.atime
}

// 定义永久链接数据
function getPermalink() {
  return `${PREFIX + (Math.random() + Math.random()).toString(16).slice(2, 8)}/`
}


module.exports = setFrontmatter;
