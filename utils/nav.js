/**
 * 生成导航栏数据
 */

// 思路：从sidebar.js中抽离一套获取目录文件结构树的代码，然后共用这块代码，对返回的数据做二次处理，分别产出侧边栏、导航栏、百度链接推送、首页内部链接数据。
// 考虑：需要对导航和首页内链接做个性化处理，暂时不做自动化生成。

// const fs = require('fs');
// const path = require('path');

// const readFileList = require('./modules/readFileList');
// const navPath = path.join(__dirname, '..', 'docs', '.vuepress', 'config', 'nav-auto.js'); // 导航栏js文件要保存的路径

// main();



// /**
//  * 主体函数
//  */
// function main() {
//   let navArr = [{text: '首页', link: '/'}];
//   const files = readFileList(); // 读取所有md文件数据
//   files.forEach( file => {
//     //if (file.order === 1) {
//       //console.log(file.filePath.split('\\'))
//     //}
//   })
  
// }
