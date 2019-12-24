/**
 * nodejs自动生成永久链接
 */
const fs = require('fs'); // 文件模块
const path = require('path'); // 路径模块
const logger = require('tracer').colorConsole(); // 控制台工具(用于控制台打印信息包含时间、打印类型、文件及代码行号、对象、颜色)  


const docsRoot = path.join(__dirname, '..', 'docs'); // docs文件路径



// 读取所有文件
function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((item, index) => {
      var fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory() && item !== '.vuepress') {      
          readFileList(path.join(dir, item), filesList);  //递归读取文件
      } else {
          filesList.push(fullPath);    
      }        
  });
  return filesList;
}

let filesList = readFileList(docsRoot);
console.log(filesList);














// main();

// /**
//  * 主体函数
//  */
// function main() {
//   const tocs = readTocs(docsRoot); // 得到一个对路路径目录数组
//   tocs.forEach(toc => { // toc为每个目录的绝对路径
//     // console.log(toc)
//     // E:\Github仓库集合\vuepress-Evan-blog\docs\01.前端
//     // E:\Github仓库集合\vuepress-Evan-blog\docs\02.页面
//     // E:\Github仓库集合\vuepress-Evan-blog\docs\03.技术杂谈
//     // E:\Github仓库集合\vuepress-Evan-blog\docs\04.其他
//     // E:\Github仓库集合\vuepress-Evan-blog\docs\05.关于我


//     const files = fs.readdirSync(toc); // 读取目录（文件和文件夹）,返回数组
//     console.log(files)
    
//     let [order, title, type] = filename.split('.');



//     files.forEach(filename => {

//       const file = path.resolve(toc, filename); // 方法：将路径或路径片段的序列解析为绝对路径
//       const stat = fs.statSync(file); // 文件信息
//       // console.log(file)
//       if(stat.isDirectory()){ // 是否为文件夹目录

//       } else {

//       }
//     })

//   })
// }


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


