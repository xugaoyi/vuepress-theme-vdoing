export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {

  // console.log(siteData)
  
  // 修复ISO8601时间格式为普通时间格式
  siteData.pages.map(item => {
    const { frontmatter: { date } } = item
    if (typeof date === 'string' && date.charAt(date.length-1) === 'Z') {
      item.frontmatter.date = repairUTCDate(date)
    }
  })
}


 // 修复ISO8601时间格式为普通时间格式
function repairUTCDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  return `${date.getUTCFullYear()}-${zero(date.getUTCMonth()+1)}-${zero(date.getUTCDate())} ${zero(date.getUTCHours())}:${zero(date.getUTCMinutes())}:${zero(date.getUTCSeconds())}`;
}
// 小于10补0
function zero(d){
  return d.toString().padStart(2,'0')
}