const re = /.*\/(.*?)\.(html|md)/

export function getPagesList(posts) {
  let pagesList = {}
  let tagGroup = {}

  // 过滤非文章页
  posts = filterNotArticle(posts)

  // 对页面数据二次处理和排序
  const pages = posts.map(post => {
    // const execs = re.exec(post.relativePath)
    const date = new Date(post.frontmatter.date || post.lastUpdated)
    const pathArr = post.relativePath.split('/')

    return {
      // ...post,
      title: post.title,
      path: post.path,
      // lastUpdated: post.lastUpdated,
      updateTimestamp: date.getTime(), // 更新日期的时间戳
      // filename: execs ? execs['1'] : '',
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

    // 加入标签属性
    if (!tagGroup[page.tag]) {
      tagGroup[page.tag] = []
    }
  })

  // 根据标签分组
  for (let item in tagGroup) { // 循环标签
    
    for(let i in pageYearArr) { // 循环全部
      const filterTag = pageYearArr[i].pageList.filter(page => { // 按标签过滤
        return page.tag === item
      })
      if (filterTag.length) { // 该年份中有数据才加入
        tagGroup[item].push({
          year: pageYearArr[i].year,
          pageList: filterTag
        })
      }
    }
  }
  pagesList.tagGroup = tagGroup
  pagesList.allPage = pageYearArr // 加入全部

  return pagesList
}



export function getTopKPosts(posts, len, currentPath) {
  return filterNotArticle(posts, currentPath)
    .map(post => {
      const execs = re.exec(post.relativePath)
      return {
        ...post,
        updateTimestamp: (new Date(post.frontmatter.date || post.lastUpdated)).getTime(), // 更新日期的时间戳
        filename: execs ? execs['1'] : '',
        formatDay: formatDate(new Date(post.frontmatter.date || post.lastUpdated))
      }
    })
    .sort((a, b) => b.updateTimestamp - a.updateTimestamp)
    .slice(0,len)
}

 // 过滤没有frontmatter数据的 和 非文章页面的,
function filterNotArticle(posts, currentPath){
  return posts.filter(post => {
    const { frontmatter, path } = post;
    if (currentPath) { // 过滤是当前页面的
      return frontmatter && frontmatter.permalink && frontmatter.title && frontmatter.article !== false && path !== currentPath;
    } else {
      return frontmatter && frontmatter.permalink && frontmatter.title && frontmatter.article !== false;
    }
    
  })
}

// 日期格式化
function formatDate(date) {
  if (!(date instanceof Date)) {
    return 
  }
  // return `${date.getFullYear()}/${zero(date.getMonth() + 1)}/${zero(date.getDate())}`
  return `${zero(date.getMonth() + 1)}-${zero(date.getDate())}`
}

// 补0
function zero(d) { 
  return d.toString().padStart(2,'0')
}