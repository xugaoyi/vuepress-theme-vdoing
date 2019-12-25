/**
 * nodejs自动生成永久链接
 */
const fs = require('fs'); // 文件模块
const path = require('path'); // 路径模块
const logger = require('tracer').colorConsole(); // 控制台工具(用于控制台打印信息包含时间、打印类型、文件及代码行号、对象、颜色)  
const MD5 = require('md5.js');
const arg = process.argv.splice(2)[0]; // 获取命令行 传入参数

const docsRoot = path.join(__dirname, '..', 'docs'); // docs文件路径

main();

/**
 * 主体函数
 */
function main() {
  const files = readFileList(docsRoot); // 读取所有md文件

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
  const date = stat.birthtime; // 创建时间
  const dateStr = `${date.getFullYear()}-${zero(date.getMonth()+1)}-${zero(date.getDate())}`;
  const newData = `---\r\ntitle: ${file.name}\r\ndate: ${dateStr}\r\npermalink: ${new MD5().update(file.name).digest('hex').substring(0,16)}\r\n---\r\n` + dataStr;
  fs.writeFileSync(file.filePath, newData); // 写入
}

// 补0
function zero(d){
  return d.toString().padStart(2,'0')
}


// 读取所有md文件
function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((item, index) => {
      let filePath = path.join(dir, item);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory() && item !== '.vuepress') {      
          readFileList(path.join(dir, item), filesList);  //递归读取文件
      } else {
        if(path.basename(dir) !== 'docs'){ // 过滤docs目录级下的文件
          // 过滤非md文件
          let [, name, type] = path.basename(filePath).split('.');
          if(type === 'md'){
            filesList.push({
              name,
              filePath
            });
          }
        }
      }        
  });
  return filesList;
}


/**
 * 读取指定目录下的文件绝对路径
 * @param {String} root 指定的目录
*/
function readTocs(root){
  const result = [];
  const files = fs.readdirSync(root); // 方法：读取目录,返回数组，成员是root底下所有的目录名 (包含文件文件夹和文件)
  files.forEach(name => {
    const file = path.resolve(root, name); // 方法：将路径或路径片段的序列解析为绝对路径
    if (fs.statSync(file).isDirectory() && name !== '.vuepress') { // 是否为文件夹目录，并排除.vuepress文件
      result.push(file);
    }
  })
  return result;
}


