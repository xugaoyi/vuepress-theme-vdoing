const re = /.*\/(.*?)\.(html|md)/

export function getPagesList(posts) {
  console.log('------')
  let pagesList = {}

  // 过滤非文章页
  posts = filterNotArticle(posts)

  // 对页面数据二次处理和排序
  const pages = posts.map(post => {
    const execs = re.exec(post.relativePath)
    const date = new Date(post.frontmatter.date || post.lastUpdated)
    const pathArr = post.relativePath.split('/')

    return {
      ...post,
      updateTimestamp: date.getTime(), // 更新日期的时间戳
      filename: execs ? execs['1'] : '',
      formatDay: formatDate(date),
      year: date.getFullYear(),
      tag: /\./g.test(pathArr[0]) ? pathArr[1].split('.')[1] : pathArr[0] // 区分是单独合集的笔记还是文章
    }
  }).sort((a, b) => b.updateTimestamp - a.updateTimestamp)


  // 根据年份对数据分组
  let pageYearArr = []
  let pageYearObj = {}
  pages.forEach( page => {

    // 全部
    if (!pageYearObj[page.year]){
      pageYearArr.push({
        year: page.year,
        pageList: [page]
      })
      pageYearObj[page.year] = page
    } else {
      pageYearArr.forEach(ele => {
        if (ele.year == page.year){
          ele.pageList.push(page)
        }
      })
    }

    // 按标签分组
    //console.log(page.tag)
    if (!pagesList[page.tag]) {
      pagesList[page.tag] = []
    } else {

    }
    




  })

  // 根据标签分组
  pagesList['全部'] = pageYearArr
  

  console.log(pagesList)
}

// 按年份分组
function pageGrouping(){

}






export function getTopKPosts(posts, len) {
  return handlePageData(
    filterNotArticle(posts)
    ).slice(0,len)
}

 // 过滤没有frontmatter数据的 和 非文章页面的
function filterNotArticle(posts){
  return posts.filter(post => {
    const { frontmatter } = post;
    return frontmatter && frontmatter.permalink && frontmatter.title && frontmatter.article !== false;
  })
}

// 页面数据的处理和排序
function handlePageData(posts){
  return posts.map(post => {
    const execs = re.exec(post.relativePath)
    return {
      ...post,
      updateTimestamp: (new Date(post.frontmatter.date || post.lastUpdated)).getTime(), // 更新日期的时间戳
      filename: execs ? execs['1'] : '',
      formatDay: formatDate(new Date(post.frontmatter.date || post.lastUpdated))
    }
  }).sort((a, b) => b.updateTimestamp - a.updateTimestamp)
}

// 日期格式化
function formatDate(date) {
  if (!(date instanceof Date)) {
    return 
  }
  return `${date.getFullYear()}/${zero(date.getMonth() + 1)}/${zero(date.getDate())}`
}

// 补0
function zero(d) { 
  return d.toString().padStart(2,'0')
}