<template>
  <div :class="['article',{'no-article': isShowArticle}]">
    <div class="article-title">
      <span>最近更新</span>
    </div>
    <div class="article-wrapper">
      <dl v-for="(item, index) in topPublishPosts" :key="index">
        <dd>{{ index < 9 ? '0' + (index + 1) : index + 1 }}</dd>
        <dt>
          <router-link :to="item.path"><div>{{item.title}}</div></router-link>
          <span>{{item.formatDay}}</span>
        </dt>
      </dl>
     
      <dl>
        <dd></dd>
        <dt>
          <router-link :to="moreArticle || '/timeline/'" class="more">更多文章></router-link>
        </dt>
      </dl>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'UpdateArticle',
  props: {
    length: {
      type: [String, Number],
      default: 3
    },
    moreArticle: String
  },
  data() {
    return {
      posts: [],
      currentPath: ''
    }
  },
  created() {
    this.posts = this.$site.pages
    this.currentPath = this.$page.path
  },
  computed: {
    topPublishPosts() {
      return this.$sortPostsByDate ? this.$sortPostsByDate.filter( post => {
        const { path } = post
        return path !== this.currentPath
      }).slice(0, this.length) : []

    },
    isShowArticle () {
      const { frontmatter } = this.$page
      return !(frontmatter.article !== false)
    }
  },
  watch: {
    $route() {
      this.currentPath = this.$page.path
    }
  }
}
</script>

<style lang='stylus'>
  @require '../styles/wrapper.styl'
  .article
    @extend $wrapper
    padding 1.8rem 2rem 0 2rem
    @media (max-width $cardLayout)
      border 10px solid rgba(160,160,160,.1)
      border-left none
      border-right none
      box-sizing border-box
    @media (max-width: $MQNarrow)
      padding 1.5rem 1.5rem 0rem 1.5rem
    &.no-article
      display none
    .article-title
      border-bottom 1px solid var(--borderColor)
      font-size 1.3rem
      font-weight bold
      padding 1rem 0 .5rem 1rem
      h1
        font-size 1.6rem
        img
          width 1.6rem
          margin-bottom: -4px;
    .article-wrapper
      overflow hidden
      dl
        border-bottom 1px dotted var(--borderColor)
        float left
        display flex
        padding 8px 0
        margin 0
        height 50px
        width 100%
        dd
          font-size 1.1rem
          color #F17229
          width 45px
          margin-left 22px
          font-weight bold
          line-height: 45px;
        dt
          flex 1
          display flex
          a
            color var(--textColor)
            flex 1
            display: flex;
            height: 50px;
            align-items: center;
            div
              overflow: hidden;
              white-space: normal;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            &:hover
              text-decoration underline 
            &.more
              color $accentColor
          span
            width 50px
            margin-right 15px
            color #999
            text-align right 
            font-size .9rem
            line-height: 50px;
</style>
