/**
 * 百度链接推送文件生成
 */
const fs = require('fs');
const path = require('path');
const MD5 = require('md5.js');

const { readFileList, docsRoot, PREFIX } = require('./frontmatter');
const urlsRoot = path.join(__dirname, '..', 'urls.txt'); // 百度链接推送文件

const DOMAIN = 'https://evanblogweb.com'

main();

/**
 * 主体函数
 */
function main() {
  fs.writeFileSync(urlsRoot, DOMAIN)
  const files = readFileList(docsRoot); // 读取所有md文件
  files.forEach( file => {
    const link = `\r\n${DOMAIN}${PREFIX}${new MD5().update(file.name).digest('hex').substring(0,16)}/`;
    console.log(link);
    fs.appendFileSync(urlsRoot, link);
  })
  
}
