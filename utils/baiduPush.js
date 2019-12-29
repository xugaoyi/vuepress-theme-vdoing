/**
 * 生成百度链接推送文件
 */
const fs = require('fs');
const path = require('path');

const readFileList = require('./modules/readFileList');
const urlsRoot = path.join(__dirname, '..', 'urls.txt'); // 百度链接推送文件

const DOMAIN = 'https://xugaoyi.com'

main();

/**
 * 主体函数
 */
function main() {
  fs.writeFileSync(urlsRoot, DOMAIN)
  const files = readFileList(); // 读取所有md文件数据
  files.forEach( file => {
    const link = `\r\n${DOMAIN}${file.permalink}/`;
    console.log(link);
    fs.appendFileSync(urlsRoot, link);
  })
  
}
