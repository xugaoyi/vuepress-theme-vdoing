const fs = require('fs'); // 文件模块
const matter = require('gray-matter'); // FrontMatter解析器 https://github.com/jonschlinkert/gray-matter
const jsonToYaml = require('json2yaml')
const chalk = require('chalk') // 命令行打印美化
// const arg = process.argv.splice(2)[0]; // 获取命令行传入的参数
const readFileList = require('./modules/readFileList');
const { type, repairDate, dateFormat} = require('./modules/fn');
const log = console.log

/**
 * 给.md文件设置frontmatter(标题、日期、永久链接)
 */
function setFrontmatter(sourceDir) {
  const files = readFileList(sourceDir); // 读取所有md文件数据

  files.forEach(file => {
    let dataStr = fs.readFileSync(file.filePath, 'utf8');// 读取每个md文件内容

    /**
     * fileMatterObj => {content:'剔除frontmatter后的文件内容字符串', data:{<frontmatter对象>}, ...}
     */
    const fileMatterObj = matter(dataStr);

    if (Object.keys(fileMatterObj.data).length === 0) { // 未定义FrontMatter数据
      const stat = fs.statSync(file.filePath);
      const dateStr = dateFormat(stat.birthtime);// 文件的创建时间
      const newData = `---\r\ntitle: ${file.name}\r\ndate: ${dateStr}\r\npermalink: ${file.permalink}\r\n---\r\n` + fileMatterObj.content;
      fs.writeFileSync(file.filePath, newData); // 写入
      log(chalk.blue('tip ') + chalk.green(`write frontmatter(写入frontmatter)：${file.filePath} `))

    } else { // 已有FrontMatter
      const matterData = fileMatterObj.data;
      let mark = false;

      // 已有FrontMatter，但是没有title、date、permalink数据的
      if (!matterData.hasOwnProperty('title')) {
        matterData.title = file.name;
        mark = true;
      }

      if (!matterData.hasOwnProperty('date')) {
        const stat = fs.statSync(file.filePath);
        matterData.date = dateFormat(stat.birthtime);
        mark = true;
      }

      if (!matterData.hasOwnProperty('permalink')) {
        matterData.permalink = file.permalink;
        mark = true;
      }

      if (mark) {
        if(matterData.date && type(matterData.date) === 'date') {
          matterData.date = repairDate(matterData.date) // 修复时间格式
        }
        const newData = jsonToYaml.stringify(matterData).replace(/\n\s{2}/g,"\n").replace(/"/g,"") + '---\r\n' + fileMatterObj.content;
        fs.writeFileSync(file.filePath, newData); // 写入
        log(chalk.blue('tip ') + chalk.green(`write frontmatter(写入frontmatter)：${file.filePath} `))
      }
      

      // 更新title和permalink
      // if (arg === '-update' && matterData.title != file.name){ // 当title和文件名不一致时才更新
      //   matterData.title = file.name;
      //   if (/pages/.test(matterData.permalink)) {
      //     matterData.permalink = file.permalink;
      //   }
      //   // 修复date时区和格式被修改的问题 (并非更新date的值)
      //   matterData.date = repairDate(matterData.date);
        
      //   const newData2 = jsonToYaml.stringify(JSON.parse(JSON.stringify(matterData))).replace(/\n\s{2}/g,"\n").replace(/"/g,"") + '---\r\n' + fileMatterObj.content;
      //   fs.writeFileSync(file.filePath, newData2); // 写入
      //   log(chalk.blue('tip ') + chalk.green(`update frontmatter title and permalink(更新frontmatter的标题和永久链接)：${file.filePath} `))
      // }

    }
  })
}

module.exports = setFrontmatter;
