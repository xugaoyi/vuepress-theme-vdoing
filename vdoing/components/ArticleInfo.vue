<template>
  <div class="articleInfo-wrap">
    <div class="articleInfo">
      <!-- 面包屑 -->
      <ul class="breadcrumbs" v-if="classify1 && classify1 !== '_posts'">
        <li>
          <router-link to="/" class="iconfont icon-home" title="首页" />
        </li>

        <li v-for="item in classifyList" :key="item">
          <!-- 跳目录页 -->
          <router-link v-if="cataloguePermalink" :to="getLink(item)">{{
            item
          }}</router-link>
          <!-- 跳分类页 -->
          <router-link
            v-else-if="$themeConfig.category !== false"
            :to="`/categories/?category=${encodeURIComponent(item)}`"
            title="分类"
            >{{ item }}</router-link
          >
          <!-- 没有跳转 -->
          <span v-else>{{ item }}</span>
        </li>
      </ul>

      <!-- 作者&日期 -->
      <div class="info">
        <div class="author iconfont icon-touxiang" title="作者" v-if="author">
          <a
            :href="author.href || author.link"
            v-if="
              author.href || (author.link && typeof author.link === 'string')
            "
            target="_blank"
            class="beLink"
            title="作者"
            >{{ author.name }}</a
          >
          <a v-else href="javascript:;">{{ author.name || author }}</a>
        </div>
        <div class="date iconfont icon-riqi" title="创建时间" v-if="date">
          <a href="javascript:;">{{ date }}</a>
        </div>
        <div
          class="date iconfont icon-wenjian"
          title="分类"
          v-if="
            $themeConfig.category !== false &&
            !(classify1 && classify1 !== '_posts') &&
            categories
          "
        >
          <router-link
            :to="`/categories/?category=${encodeURIComponent(item)}`"
            v-for="(item, index) in categories"
            :key="index"
            >{{ item + ' ' }}</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: '',
      classify1: '',
      classifyList: [],
      cataloguePermalink: '',
      author: null,
      categories: []
    }
  },
  created() {
    this.getPageInfo()
  },
  watch: {
    '$route.path'() {
      this.classifyList = []
      this.getPageInfo()
    }
  },
  methods: {
    getPageInfo() {
      const pageInfo = this.$page
      const { relativePath } = pageInfo
      const { sidebar } = this.$themeConfig

      // 分类采用解析文件夹地址名称的方式 (即使关闭分类功能也可以正确跳转目录页)
      const relativePathArr = relativePath.split('/')

      // const classifyArr = relativePathArr[0].split('.')

      relativePathArr.forEach((item, index) => {
        const nameArr = item.split('.')

        if (index !== relativePathArr.length - 1) {
          if (nameArr === 1) {
            this.classifyList.push(nameArr[0])
          } else {
            const firstDotIndex = item.indexOf('.');
            this.classifyList.push(item.substring(firstDotIndex + 1) || '')
          }
        }
      })

      this.classify1 = this.classifyList[0]

      const cataloguePermalink = sidebar && sidebar.catalogue ? sidebar.catalogue[this.classify1] : ''// 目录页永久链接
      const author = this.$frontmatter.author || this.$themeConfig.author // 作者
      let date = (pageInfo.frontmatter.date || '').split(' ')[0] // 文章创建时间

      // 获取页面frontmatter的分类（碎片化文章使用）
      const { categories } = this.$frontmatter

      this.date = date
      this.cataloguePermalink = cataloguePermalink
      this.author = author
      this.categories = categories
    },

    getLink(item) {
      const { cataloguePermalink } = this
      if (item === cataloguePermalink) {
        return cataloguePermalink
      }
      return `${cataloguePermalink}${cataloguePermalink.charAt(cataloguePermalink.length - 1) === '/'
        ? ''
        : '/'
        }#${item}`
    }
  }
}
</script>

<style lang='stylus' scoped>
@require '../styles/wrapper.styl'

.theme-style-line
  .articleInfo-wrap
    .articleInfo
      padding-top 0.5rem
.articleInfo-wrap
  @extend $wrapper
  position relative
  z-index 1
  color #888
  .articleInfo
    overflow hidden
    font-size 0.92rem
    .breadcrumbs
      margin 0
      padding 0
      overflow hidden
      display inline-block
      line-height 2rem
      @media (max-width 960px)
        width 100%
      li
        list-style-type none
        float left
        padding-right 5px
        &:after
          content '/'
          margin-left 5px
          color #999
        &:last-child
          &:after
            content ''
        a
          color #888
          &:before
            font-size 0.92rem
          &:hover
            color $accentColor
        .icon-home
          text-decoration none
    .info
      float right
      line-height 32px
      @media (max-width 960px)
        float left
      div
        float left
        margin-left 20px
        font-size 0.8rem
        @media (max-width 960px)
          margin 0 20px 0 0
        &:before
          margin-right 3px
        a
          color #888
          &:hover
            text-decoration none
        a.beLink
          &:hover
            color $accentColor
            text-decoration underline
</style>
