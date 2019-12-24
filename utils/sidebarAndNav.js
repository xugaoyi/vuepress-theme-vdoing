/**
 * nodejs自动生成侧边栏与导航栏
 */

const fs = require('fs'); // 文件模块
const path = require('path'); // 路径模块
const ejs = require('ejs'); // ejs模板引擎
const logger = require('tracer').colorConsole(); // 控制台工具(用于控制台打印信息包含时间、打印类型、文件及代码行号、对象、颜色)

const docsRoot = path.join(__dirname, '..', 'docs'); // docs文件路径
const sidebarPath = path.join(__dirname, '..', 'docs', '.vuepress', 'config', 'sidebar-auto.js'); // 侧边栏js文件要保存的路径
const navPath = path.join(__dirname, '..', 'docs', '.vuepress', 'config', 'nav-auto.js'); // 导航栏js文件要保存的路径

// sidebar-auto.js代码模板
const sidebarTemplate = `
// 侧边栏自动生成
module.exports = {
  <% for (let item of sidebarData) { %>
    "<%- item.path %>": <%- JSON.stringify(item.sidebarArr) %>,
  <% } %>
}`;
// nav-auto.js代码模板
const navTemplate = `
// 导航栏自动生成
module.exports = {
  {text: '首页', link: '/'},
  <% for (let item of navData) { %>
    {
      text: '<%- item.name %>',
      <% if (item.navArr) {%>
        items: [
          <% for (let i of item.xx) { %>
            {text: '<%- i.name %>', link: <%- i.link %>},
          <% } %>
        ]
      <% } else { %>
        link: <%- item.link %>
      <% } %>
    },
  <% } %>
}`;

main();

/**
 * 主体函数
 */
function main() {
  const sidebarData = [];
  const navData = [];

  const tocs = readTocs(docsRoot); // 得到一个对路路径目录数组
  tocs.forEach(toc => { // toc为每个目录的绝对路径
    const sidebarArr = mapTocToSidebar(toc);

    //const navArr = mapTocToNav(toc);
    //console.log(navArr)

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

  const sidebarDataTem = ejs.render(sidebarTemplate, { sidebarData });
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
      logger.error(`该文件 "${file}" 序号出错，请填写正确的序号，序号约定请查看：https://github.com/xugaoyi/blog`);
      return;
    }
    if (sidebar[order]) { // sidebar数组的order位置的数据的布尔值
      logger.warn(`该文件 "${file}" 的序号在同一级别中有重复出现，将会被覆盖`);
    }
    if(stat.isDirectory()){ // 是否为文件夹目录
      sidebar[order] = {
        title,
        collapsable: false,
        children: mapTocToSidebar(file, prefix + filename + '/') // 子栏路径添加前缀
      }
    } else { // 是文件
      if (type !== 'md') {
         // 控制台错误信息
         logger.error(`该文件 "${file}" 非md文件，不支持非md文件类型`);
         return;
      }
      sidebar[order] = [prefix + filename, title];  // [<前缀加完整文件名>, <文件标题>]
    }
  })

  sidebar = sidebar.filter(item => item !== null && item !== undefined);
  return sidebar;
}


/**
 * 将对应目录映射导航
 * @param {String} root
 */
function mapTocToNav(root){
  let nav = [];
  
  const prefix = path.basename(root); // basename返回绝对路径的文件名

  let [order , text] = prefix.split('.');

  order = parseInt(order, 10);
  
  if (nav[order]) {
    logger.warn(
      `该序号 "${order}" 在同一级别中有重复出现，将会被覆盖`
    );
  }
  
  const files = fs.readdirSync(root); // 方法：读取目录,返回数组
  if (files.length === 1) { // 只有一级导航
    let link = ''

    const file = path.resolve(root, files[0]); // 方法：将路径或路径片段的序列解析为绝对路径
    const stat = fs.statSync(file); // 文件信息

    if (stat.isDirectory()) { // 文件夹
      
      const files2 = fs.readdirSync(file);
      if (!files2.length) {
        logger.warn(`该目录 "${file}" 内部没有任何文件，将忽略生成对应导航`);
        return;
      }
      link = `/${prefix}/${files}/${files2[0]}`

    } else { // 文件

     const type = files[0].split('.')[2];
     if( type === 'md'){
      link = `/${prefix}/${files}`
     } else if (type === 'txt') { // 外部链接
       
     } else { // 非md、txt文件
       logger.error(`该文件 "${file}" 非md或txt文件，不支持该文件类型`);
     }

    }

    nav[order] = {
      text,
      link
    }
  } else if (files.length > 1) { // 二级导航
    nav[order] = {
      text,
      items: twoNav(files,)
    }
  } else {
    logger.warn(`该目录 "${root}" 内部没有任何文件，将忽略生成对应导航`);
  }
  
  return nav;
}

// 获取二级导航数据
function twoNav(files){
  var items = [];
  files.forEach(file => {
    console.log(file)
    let [order, text, type] = file.split('.');

    order = parseInt(order, 10);
  
    if (items[order]) {
      logger.warn(
        `该序号 "${order}" 在同一级别中有重复出现，将会被覆盖`
      );
    }

    if (type === 'md') {
      items[order] = {
        text,
        link: '/04.其他/01.学习/01.学习网站'
      }
    } else if (type === 'txt') { // 外部链接文件

    } else if (type === undefined) { // 文件夹
      items[order] = {
        text,
        link: '/04.其他/01.学习/01.学习网站'
      }
    } else { // 其他文件
      logger.error(`该文件 "${file}" 非md或txt文件，不支持该文件类型`);
    }

    
  })
    // files.forEach(file => {
    //   const file2 = path.resolve(root, file); // 方法：将路径或路径片段的序列解析为绝对路径
    //   const stat = fs.statSync(file2); // 文件信息
    //   if (stat.isDirectory()) { // 文件夹
    //     console.log(mapTocToNav(path.resolve(root, file)))
    //   } else {
        
    //   }
    // })
    
    // items: [
    //   {text: '学习', link: '/04.其他/01.学习/01.学习网站'},
    //   {text: '学习笔记', link: '/04.其他/02.学习笔记/01.小程序笔记'},
    //   {text: '面试', link: '/04.其他/03.面试/01.面试问题集锦'},
    //   {text: '在线工具', link: '/04.其他/04.在线工具'},
    //   {text: '友情链接', link: '/04.其他/05.友情链接'},
    // ]

    return items;
}