/**
 * 生成frontmatter (标题、日期、永久链接)
 */
const fs = require('fs'); // 文件模块
const logger = require('tracer').colorConsole(); // 控制台工具(用于控制台打印信息包含时间、打印类型、文件及代码行号、对象、颜色) 
const matter = require('gray-matter'); // FrontMatter解析器 https://github.com/jonschlinkert/gray-matter
const YAML = require('json2yaml')
const arg = process.argv.splice(2)[0]; // 获取命令行传入的参数
const readFileList = require('./modules/readFileList');

main();

/**
 * 主体函数
 */
function main() {
  const files = readFileList(); // 读取所有md文件数据

  files.forEach(file => {
    let dataStr = fs.readFileSync(file.filePath, 'utf8');// 读取每个md文件内容

    /**
     * fileMatterObj => {content:'剔除frontmatter的文件内容字符串', data:{<frontmatter对象>}, ...}
     */
    const fileMatterObj = matter(dataStr);

    if (Object.keys(fileMatterObj.data).length === 0) { // 未定义FrontMatter数据
      const stat = fs.statSync(file.filePath);
      const dateStr = dateFormat(stat.birthtime);// 文件的创建时间
      const newData = `---\r\ntitle: ${file.name}\r\ndate: ${dateStr}\r\npermalink: ${file.permalink}\r\n---\r\n` + fileMatterObj.content;
      fs.writeFileSync(file.filePath, newData); // 写入
      console.log(`写入FrontMatter：${file.filePath} `)

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
        const newData = YAML.stringify(matterData) + '---\r\n' + fileMatterObj.content;
        fs.writeFileSync(file.filePath, newData); // 写入
        console.log(`更新FrontMatter：${file.filePath} `)
      }
      

      // 更新title和permalink
      if (arg === '-update' && matterData.title != file.name){ // 当title和文件名不一致时才更新
        matterData.title = file.name;
        if (/pages/.test(matterData.permalink)) {
          matterData.permalink = file.permalink;
        }
        // 修复date时区和格式被修改的问题 (并非更新date的值)
        const date = new Date(matterData.date);
        matterData.date = `${date.getUTCFullYear()}-${zero(date.getUTCMonth()+1)}-${zero(date.getUTCDate())} ${zero(date.getUTCHours())}:${zero(date.getUTCMinutes())}:${zero(date.getUTCSeconds())}`;
        
        const newData2 = YAML.stringify(JSON.parse(JSON.stringify(matterData))) + '---\r\n' + fileMatterObj.content;
        fs.writeFileSync(file.filePath, newData2); // 写入
        console.log(`更新FrontMatter标题和链接：${file.filePath}`)
      }

    }
    
  })

}

// 日期的格式
function dateFormat(date) {
  return `${date.getFullYear()}-${zero(date.getMonth()+1)}-${zero(date.getDate())} ${zero(date.getHours())}:${zero(date.getMinutes())}:${zero(date.getSeconds())}`
}

// 小于10补0
function zero(d){
  return d.toString().padStart(2,'0')
}
