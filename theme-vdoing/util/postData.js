// 处理文章数据

/**
 * 思路：过滤非文章页，按时间排序（置顶靠前）， 按分类、标签对数据分组，解析出所有分类（数量取分组post的长度）、标签。 
 */

import { type, compareDate } from './index'

const log = console.log

// 过滤非文章页
export function filterPosts (posts) {
  posts = posts.filter(item => {
    const { frontmatter: { pageComponent, article, home }} = item
    return !(pageComponent || article === false || home === true) // 存在页面组件、article字段为false，以及首页
  })
  return posts
}

// 按时间排序（并且置顶靠前）
export function sortPosts (posts, isSticky = true) {
  posts = filterPosts(posts) // 过滤非文章页
  posts.sort((prev, next) => {
    if (isSticky) { // 是否需要置顶靠前
      const prevSticky = prev.frontmatter.sticky
      const nextSticky = next.frontmatter.sticky
      if (prevSticky && nextSticky) {
        return prevSticky == nextSticky ? compareDate(prev, next) : (prevSticky - nextSticky)
      } else if (prevSticky && !nextSticky) {
        return -1
      } else if (!prevSticky && nextSticky) {
        return 1
      }
    }

    return compareDate(prev, next)
  })
  return posts
}

// 按分类和标签分组
export function groupByCategoriesAndTags(posts) {
  const categoriesArr = []
  const tagsArr = []

  posts = sortPosts(posts, false)

  for (let i = 0, postsL = posts.length; i < postsL; i++) {
    
  }

  return {
    categories: categoriesArr,
    tags: tagsArr
  }
}

// 获取所有分类和标签
export function getAllCategoriesAndTags(posts) {
  const categoriesArr = []
  const tagsArr = []

  // posts = sortPosts(posts, false)

  // for (let i = 0, postsL = posts.length; i < postsL; i++) {
  //   const { frontmatter: { categories, tags }} = posts[i]
  //   if (type(categories) === 'array') {
  //     categories.forEach(item => {
  //       item && categoriesArr.indexOf(item) === -1 && categoriesArr.push(item)
  //     })
  //   }
  //   if (type(tags) === 'array') {
  //     tags.forEach(item => {
  //       item && tagsArr.indexOf(item) === -1 && tagsArr.push(item)
  //     })
  //   }
  // }

  return {
    categories: categoriesArr,
    tags: tagsArr
  }
}




