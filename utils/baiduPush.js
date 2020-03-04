/**
 * 生成百度链接推送文件
 */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter'); // FrontMatter解析器 https://github.com/jonschlinkert/gray-matter
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
    const { data } = matter(fs.readFileSync(file.filePath, 'utf8'));
    data.permalink && fs.appendFileSync(urlsRoot, `\r\n${DOMAIN}${data.permalink}/`);
  })
}
