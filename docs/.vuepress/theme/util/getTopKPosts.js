const re = /.*\/(.*?)\.(html|md)/

export function getTopKPosts(posts, len) {
  return posts
    .filter(post => {
      const { frontmatter } = post;
      return frontmatter && frontmatter.permalink && frontmatter.title && frontmatter.article !== false;
    })
    .map(post => {
      const execs = re.exec(post.relativePath)
      return {
        ...post,
        updateTimestamp: (new Date(post.lastUpdated || post.frontmatter.date)).getTime(),
        filename: execs ? execs['1'] : '',
        formatDay: formatDate(new Date(post.lastUpdated || post.frontmatter.date))
      }
    })
    .sort((a, b) => b.updateTimestamp - a.updateTimestamp)
    .slice(0,len)
}

function formatDate(date) { // 日期格式化
  if (!(date instanceof Date)) {
    return 
  }
  return `${date.getFullYear()}/${zero(date.getMonth() + 1)}/${zero(date.getDate())}`
}
function zero(d) { // 补0
  return d.toString().padStart(2,'0')
}