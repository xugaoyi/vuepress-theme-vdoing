/**
 * 生成frontmatter (标题、日期、永久链接)
 */
const fs = require('fs'); // 文件模块
const logger = require('tracer').colorConsole(); // 控制台工具(用于控制台打印信息包含时间、打印类型、文件及代码行号、对象、颜色)  
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
    if(dataStr.substring(0,3) !== '---'){ // 没有FrontMatter
      console.log(`写入FrontMatter：${file.filePath}`)
      writeFrontMatter(file, dataStr);
    } else { // 已有FrontMatter
      if (arg !== '-update'){
        return;
      }
      // 重新写入FrontMatter
      const dataArr = dataStr.split(/\r\n|\n|\r/gm);
      const fmArr = dataArr.slice(0,5);
      const dataStrOld = dataArr.slice(5).join('\r\n');
        // 判断FrontMatter 是否为自动生成的格式
      if (fmArr[0] === '---' && /title/.test(fmArr[1]) && /date/.test(fmArr[2]) && /permalink/.test(fmArr[3]) && fmArr[4] === '---') {
        console.log(`更新FrontMatter：${file.filePath} `)
        writeFrontMatter(file, dataStrOld);
      } else {
        logger.warn(`此文件FrontMatter更新失败${file.filePath}，因为它的FrontMatter格式并非自动生成的。`)
      }
    }
  })

}

// 写入FrontMatter
function writeFrontMatter(file, dataStr) {
  const stat = fs.statSync(file.filePath);
  const date = stat.birthtime; // 文件的创建时间
  const dateStr = `${date.getFullYear()}-${zero(date.getMonth()+1)}-${zero(date.getDate())} ${zero(date.getHours())}:${zero(date.getMinutes())}:${zero(date.getSeconds())}`;
  const newData = `---\r\ntitle: ${file.name}\r\ndate: ${dateStr}\r\npermalink: ${file.permalink}\r\n---\r\n` + dataStr;
  fs.writeFileSync(file.filePath, newData); // 写入
}

// 补0
function zero(d){
  return d.toString().padStart(2,'0')
}
