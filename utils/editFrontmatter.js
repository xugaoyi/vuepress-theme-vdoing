/**
 * 批量添加和修改front matter ，需要 ./config.yml 配置文件的配合。
 */
const fs = require('fs'); // 文件模块
const path = require('path'); // 路径模块
const matter = require('gray-matter'); // FrontMatter解析器 https://github.com/jonschlinkert/gray-matter
const jsonToYaml = require('json2yaml')
const yamlToJs = require('yamljs')
const inquirer = require('inquirer') // 命令行操作

const readFileList = require('./modules/readFileList');
const { type, repairDate} = require('./modules/fn');

const configPath = path.join(__dirname, 'config.yml') // 配置文件的路径

main();

/**
 * 主体函数
 */
async function main() {

  const promptList = [{
    type: "confirm",
    message: "批量操作frontmatter有修改数据的风险，确定要继续吗？",
    name: "edit",
  }];
  let edit = true;

  await inquirer.prompt(promptList).then(answers => {
    edit = answers.edit
  })

  if(!edit) { // 退出操作
    return
  }
  
  const config = yamlToJs.load(configPath) // 解析配置文件的数据转为js对象
  const filePath = path.join(__dirname, '..', 'docs', ...config.path); // 要批量修改的文件路径
  const files = readFileList(filePath); // 读取所有md文件数据

  files.forEach(file => {
    let dataStr = fs.readFileSync(file.filePath, 'utf8');// 读取每个md文件的内容
    const fileMatterObj = matter(dataStr) // 解析md文件的front Matter。 fileMatterObj => {content:'剔除frontmatter后的文件内容字符串', data:{<frontmatter对象>}, ...}
    let matterData = fileMatterObj.data; // 得到md文件的front Matter

    if (config.delete == true) { // 删除操作
      for(let key in config.data) {
        delete matterData[key]
      }
    } else { // 添加、修改操作
      Object.assign(matterData, config.data) // 将配置数据合并到front Matter对象
    }
    
    if(matterData.date && type(matterData.date) === 'date') {
      matterData.date = repairDate(matterData.date) // 修复时间格式
    }
    const newData = jsonToYaml.stringify(matterData).replace(/\n\s{2}/g,"\n").replace(/"/g,"")  + '---\r\n' + fileMatterObj.content;
    fs.writeFileSync(file.filePath, newData); // 写入
    console.log(`update frontmatter：${file.filePath} `)
  })
}
