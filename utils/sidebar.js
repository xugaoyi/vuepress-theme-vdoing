/**
 * 生成侧边栏数据
 */

const fs = require('fs'); // 文件模块
const path = require('path'); // 路径模块
const ejs = require('ejs'); // ejs模板引擎
const logger = require('tracer').colorConsole(); // 控制台工具(用于控制台打印信息包含时间、打印类型、文件及代码行号、对象、颜色)
const matter = require('gray-matter'); // FrontMatter解析器

const docsRoot = path.join(__dirname, '..', 'docs'); // docs文件路径
const sidebarPath = path.join(__dirname, '..', 'docs', '.vuepress', 'config', 'sidebar-auto.js'); // 侧边栏js文件要保存的路径
const catalogueData = {}; // 目录页数据

// sidebar-auto.js代码模板
const sidebarTemplate = `
/**
 * 自动生成的侧边栏
 * 说明：
 * 1. 最里边的数组，格式：[<path>, <title>, <permalink>]，其中permalink并非侧边栏所需，而是提供给其他页面（目录页）使用
 * 2. catalogue属性是提供给面包屑所需的目录页数据
 */
module.exports = {
  <% for (let item of sidebarData) { %>
  "<%- item.path %>": <%- JSON.stringify(item.sidebarArr) %>,
  <% } %>
  "catalogue": <%- JSON.stringify(catalogueData) %>
}`;

main();

/**
 * 主体函数
 */
function main() {
  const sidebarData = [];

  const tocs = readTocs(docsRoot); // 得到一个对路路径目录数组
  tocs.forEach(toc => { // toc为每个目录的绝对路径
    const sidebarArr = mapTocToSidebar(toc);
    if (!sidebarArr.length) {
      logger.warn(`该目录 "${toc}" 内部没有任何文件，将忽略生成对应侧边栏`);
      return;
    }
    sidebarData.push({
      path: `/${path.basename(toc)}/`, // basename返回绝对路径的文件名
      // name: path.basename(toc).replace(/ /g, '_'), // 替换空格
      sidebarArr 
    })
  })

  const sidebarDataTem = ejs.render(sidebarTemplate, { sidebarData, catalogueData });
  fs.writeFileSync(sidebarPath, sidebarDataTem); // 同步写入文件, 参数一：写入到的文件, 参数二：写入的数据
  logger.info('侧边栏生成成功！')
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



/**
 * 将对应目录映射为对应的侧边栏配置
 * @param {String} root 
 * @param {String} prefix
 */
function mapTocToSidebar(root, prefix){
  prefix = prefix || '';
  let sidebar = [];
  const files = fs.readdirSync(root); // 读取目录（文件和文件夹）,返回数组
  files.forEach(filename => {
    const file = path.resolve(root, filename); // 方法：将路径或路径片段的序列解析为绝对路径
    const stat = fs.statSync(file); // 文件信息
    let [order, title, type] = filename.split('.');
    order = parseInt(order, 10);
    if (isNaN(order) || order < 0) {
      logger.error(`该文件 "${file}" 序号出错，请填写正确的序号，序号约定请查看：https://github.com/xugaoyi/vuepress-theme-vdoing-blog/issues/113`);
      return;
    }
    if (sidebar[order]) { // sidebar数组的order位置的数据的布尔值
      logger.warn(`该文件 "${file}" 的序号在同一级别中有重复出现，将会被覆盖`);
    }
    if(stat.isDirectory()){ // 是否为文件夹目录
      sidebar[order] = {
        title,
        collapsable: false, // 是否可折叠，默认true
        children: mapTocToSidebar(file, prefix + filename + '/') // 子栏路径添加前缀
      }
    } else { // 是文件
      if (type !== 'md') {
         // 控制台错误信息
         logger.error(`该文件 "${file}" 非md文件，不支持非md文件类型`);
         return;
      }
      const contentStr = fs.readFileSync(file, 'utf8') // 读取md文件内容，返回字符串
      const { data } = matter(contentStr) // 解析出front matter数据
      const permalink = data.permalink || ''
      sidebar[order] = [prefix + filename, title, permalink ];  // [<路径>, <文件标题>, <永久链接>]

      // 目录页和永久链接，用于给面包屑提供数据
      const pageComponent = data.pageComponent
      if (pageComponent && pageComponent.name && pageComponent.name === "Catalogue") {
        catalogueData[title] = permalink
      }
    }
  })

  sidebar = sidebar.filter(item => item !== null && item !== undefined);
  return sidebar;
}