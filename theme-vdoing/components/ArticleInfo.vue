<template>
  <div class="articleInfo-wrap">
    <div class="articleInfo">
      <ul class="breadcrumbs">
        <li>
          <router-link to="/" class="iconfont icon-home" title="首页" />
        </li>
        <li v-if="articleInfo.classify1">
          <router-link v-if="articleInfo.cataloguePermalink" :to="articleInfo.cataloguePermalink" :title="articleInfo.classify1+'-目录页'">{{articleInfo.classify1}}</router-link>
          <span v-else>{{articleInfo.classify1}}</span>
        </li>
        <li v-if="articleInfo.classify2">
          <span>{{articleInfo.classify2}}</span>
        </li>
      </ul>
      <div class="info">
        <div class="author iconfont icon-touxiang" v-if="articleInfo.author">
          <a :href="articleInfo.author.href" v-if="articleInfo.author.href" target="_blank" class="beLink" title="作者">{{articleInfo.author.name}}</a>
          <a v-else href="javascript:;"  title="作者">{{articleInfo.author.name}}</a>
        </div>
        <div class="date iconfont icon-riqi" v-if="articleInfo.date">
          <a href="javascript:;" title="创建时间">{{articleInfo.date}}</a>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      articleInfo: {}
    }
  },
  mounted() {
    this.articleInfo = this.getPageInfo()
  },
  watch: {
    $route: {
      handler:function(){
        this.articleInfo = this.getPageInfo()
      }
    }
  },
  methods: {
    getPageInfo() {
      const pageInfo = this.$page
      const { relativePath } = pageInfo
      const { catalogue } = this.$themeConfig.sidebar
      const relativePathArr = relativePath.split('/')
      const classifyArr = relativePathArr[0].split('.')
      const classify1 = classifyArr.length > 1 ? classifyArr[1] : classifyArr[0] // 文章一级分类名称
      const classify2 = relativePathArr.length > 2 ? relativePathArr[1].split('.')[1] : undefined// 文章二级分类名称
      const cataloguePermalink = catalogue ? catalogue[classify1] : undefined// 目录页永久链接
      const author = this.$frontmatter.author || this.$themeConfig.author // 作者
      let date = pageInfo.frontmatter.date || pageInfo.lastUpdated // 文章创建时间
      date = Date.parse(date) ? dateFormat(new Date(date)) : undefined
      return {
        date,
        classify1,
        classify2,
        cataloguePermalink,
        author
      }
    }
  }
}

// 日期格式化
function dateFormat(date) {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  return `${date.getFullYear()}-${zero(date.getMonth()+1)}-${zero(date.getDate())}`
}

// 小于10补0
function zero(d){
  return d.toString().padStart(2,'0')
}
</script>

<style lang='stylus' scoped>

.articleInfo-wrap
  // margin-bottom -3.6rem!important
  margin: 2.6rem 0 -3.1rem 0
  // padding-top 0!important
  color #888
  .articleInfo
    overflow hidden
    font-size .92rem
    .breadcrumbs
      margin 0
      padding 0
      overflow hidden
      display inline-block
      line-height 2rem
      @media (max-width: 960px)
        width 100%
      li
        list-style-type none
        float left
        padding-right 5px
        &:after
          content '-'
          margin-left 5px
          color #999
        &:last-child
          &:after
            content ''
        a
          color #888
          &:before
            font-size .92rem
          &:hover
            color $accentColor
        .icon-home
          text-decoration none
    .info
      float right
      line-height 32px
      @media (max-width: 960px)
        float left
      div
        float left
        margin-left 20px
        font-size .8rem
        @media (max-width: 960px)
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
