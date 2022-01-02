const fs = require('fs'); // 文件模块
const path = require('path'); // 路径模块
const chalk = require('chalk') // 命令行打印美化
const matter = require('gray-matter'); // front matter解析器
const log = console.log

let catalogueData = {}; // 目录页数据

/**
 * 生成侧边栏数据
 * @param {String} sourceDir .md文件所在源目录(一般是docs目录)
 * @param {Boolean} collapsable  是否可折叠
 */
function createSidebarData(sourceDir, collapsable) {
  const sidebarData = {};
  const tocs = readTocs(sourceDir);
  tocs.forEach(toc => { // toc是每个目录的绝对路径

    if (toc.substr(-6) === '_posts') { // 碎片化文章

      // 注释说明：碎片化文章不需要生成结构化侧边栏 2020.05.01
      // const sidebarArr = mapTocToPostSidebar(toc);
      // sidebarData[`/${path.basename(toc)}/`] = sidebarArr

    } else {
      const sidebarObj = mapTocToSidebar(toc, collapsable);
      if (!sidebarObj.sidebar.length) {
        log(chalk.yellow(`warning: 该目录 "${toc}" 内部没有任何文件或文件序号出错，将忽略生成对应侧边栏`))
        return;
      }
      sidebarData[`/${path.basename(toc)}/`] = sidebarObj.sidebar
      sidebarData.catalogue = sidebarObj.catalogueData
    }
  })

  return sidebarData
}

module.exports = createSidebarData;


/**
 * 读取指定目录下的文件绝对路径
 * @param {String} root 指定的目录
*/
function readTocs(root) {
  const result = [];
  const files = fs.readdirSync(root); // 读取目录,返回数组，成员是root底下所有的目录名 (包含文件夹和文件)
  files.forEach(name => {
    const file = path.resolve(root, name); // 将路径或路径片段的序列解析为绝对路径
    if (fs.statSync(file).isDirectory() && name !== '.vuepress' && name !== '@pages') { // 是否为文件夹目录，并排除.vuepress文件夹
      result.push(file);
    }
  })
  return result;
}


/**
 * 将碎片化文章目录(_posts)映射为对应的侧边栏配置数据
 * @param {String} root
 */
function mapTocToPostSidebar(root) {
  let postSidebar = [] // 碎片化文章数据
  const files = fs.readdirSync(root); // 读取目录（文件和文件夹）,返回数组

  files.forEach(filename => {
    const file = path.resolve(root, filename); // 方法：将路径或路径片段的序列解析为绝对路径
    const stat = fs.statSync(file); // 文件信息

    const fileNameArr = filename.split('.');
    if (fileNameArr.length > 2) {
      log(chalk.yellow(`warning: 该文件 "${file}" 在_posts文件夹中，不应有序号，且文件名中间不应有'.'`))
      return
    }
    if (stat.isDirectory()) { // 是文件夹目录
      // log(chalk.yellow(`warning: 该目录 "${file}" 内文件无法生成侧边栏，_posts文件夹里面不能有二级目录。`))
      return
    }

    let [title, type] = filename.split('.');
    if (type !== 'md') {
      log(chalk.yellow(`warning: 该文件 "${file}" 非.md格式文件，不支持该文件类型`))
      return;
    }

    const contentStr = fs.readFileSync(file, 'utf8') // 读取md文件内容，返回字符串
    const { data } = matter(contentStr, {}) // 解析出front matter数据
    const permalink = data.permalink || ''
    if (data.title) {
      title = data.title
    }
    postSidebar.push([filename, title, permalink]);  // [<路径>, <标题>, <永久链接>]
  })

  return postSidebar
}


/**
 * 将目录映射为对应的侧边栏配置数据
 * @param {String} root
 * @param {Boolean} collapsable
 * @param {String} prefix
 */

function mapTocToSidebar(root, collapsable, prefix = '') {
  let sidebar = []; // 结构化文章侧边栏数据
  const files = fs.readdirSync(root); // 读取目录（文件和文件夹）,返回数组

  files.forEach(filename => {
    const file = path.resolve(root, filename); // 方法：将路径或路径片段的序列解析为绝对路径
    const stat = fs.statSync(file); // 文件信息
    if (filename === '.DS_Store') { // 过滤.DS_Store文件
      return
    }
    let [order, title, type] = filename.split('.');
    order = parseInt(order, 10);
    if (isNaN(order) || order < 0) {
      log(chalk.yellow(`warning: 该文件 "${file}" 序号出错，请填写正确的序号`))
      return;
    }
    if (sidebar[order]) { // 判断序号是否已经存在
      log(chalk.yellow(`warning: 该文件 "${file}" 的序号在同一级别中重复出现，将会被覆盖`))
    }
    if (stat.isDirectory()) { // 是文件夹目录
      sidebar[order] = {
        title,
        collapsable, // 是否可折叠，默认true
        children: mapTocToSidebar(file, collapsable, prefix + filename + '/').sidebar // 子栏路径添加前缀
      }
    } else { // 是文件
      if (type !== 'md') {
        log(chalk.yellow(`warning: 该文件 "${file}" 非.md格式文件，不支持该文件类型`))
        return;
      }
      const contentStr = fs.readFileSync(file, 'utf8') // 读取md文件内容，返回字符串
      const { data } = matter(contentStr, {}) // 解析出front matter数据
      const permalink = data.permalink || ''

      // 目录页对应的永久链接，用于给面包屑提供链接
      const { pageComponent } = data
      if (pageComponent && pageComponent.name === "Catalogue") {
        catalogueData[title] = permalink
      }

      if (data.title) {
        title = data.title
      }
      sidebar[order] = [prefix + filename, title, permalink];  // [<路径>, <标题>, <永久链接>]

    }
  })

  sidebar = sidebar.filter(item => item !== null && item !== undefined);
  return {
    sidebar,
    catalogueData
  };
}
