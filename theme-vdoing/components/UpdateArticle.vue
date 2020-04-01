<template>
  <div :class="['article',{ 'article-home': pageMark === 'home', 'no-article': isShowArticle}]">
    <div class="article-title">
      <h1 v-if="pageMark === 'home'">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAABKFJREFUSA3tVl1oFVcQnrMbrak3QUgkya1akpJYcrUtIqW1JvFBE9LiQ5v6JmJpolbMg32rVrhgoYK0QiMY6i9Y6EMaW5D+xFJaTYItIuK2Kr3+BJNwkxBj05sQY3b3nM6cs2dv9t7NT/vQJw/sndk5M/PNzJkzewGerP+pAmy+ON8lLzUJgA8ZYxYIYZmGYRnctDaWvJJAmTtfP1pvXsBCCPP8QFcCaRkZYACgDZFO4stNIcBCajEOlmmC9XpJ9bAGCaPaPmzPl32dvLSVu3BWCTQs0XQQ6g0DYgwLIoAZbBCdW/i+781o1VVlm/410mw4h06Y7bIPHNyWDyL4FHkX03Q8SrzNhZTZriieckWt7cL6MM85YcLpsi/7O9/iXFT6MswI0DmmpkSaJ0qLxFIm3+i1THHB3zmBH3PYx9CcykcLOeQVVa7QtdxTgQgEleX2AjHYfwA+2ddV77ruGoJUbhGDI09YSNXyMpUt5ylOzxgbUmtOp7NmbNt8v3arjTBfYELmLUV+M+nSawNNAUqpT3ClJWg5I3BLT+cGW/DXNGCa6tx1aakCGEigArTn4TDIPdrXXYKCZNrHLMCOEPvHBlLQ99s9eHB7EB6NTki73CVPQ2F5MSx/uRQixfmq7rK0wYD8w8E905bnPDfwoWs/rfv93NWN/ZfvwsLIU7A09gxECyISeGJkHAau98L97tuw7NXnoPyNF8FcYGLGKsOs0mN3OEyec9esGW/ZEl945dTP34wlR2FZVQWU1q0Cw8Tr7p+hgLLNL0FPxx/Q35mA8aEUrH6nCgwEl0tn7wUiZYJnNRh6DK4UH/k0lfyrsBKdPVv/AriGIQcEDQZ65LBAGe2Rzui9Ybjz7XUppz1/uKBbyVPGkN3ZAeC6hr0x7Nr38N5+EqkoOm17xpoqR9ohQF55ERSvr4Dkr3chNfC3DMzGJlNBElW8w9nsGQvhNGIzDkXzCg8cLK951xHsFBlTJspJNi3ZFIMF2AeDV3q8DNOB+YHi6QTrChDIWDBRi5U5f+ZMfJLu3ccrqxtdxk4SKH336LFxSmkqefwU5T8fhdSdQf9IVKD6aNiwI/hnmcAZ91isYMJIaCUCx9W098+LgruikeTqzqqxKPUwqJyCPJiyemVVZBOijDGjD38Os0jOiSPL1z3SPjXNANbiNPXAdzTfukjjuknNBbyz3nwgTd3AVFqUJ5hpHlq9MveLnWwttUfoygBmvVjuikxND3znrhsELnZk7k+OjIGxeNEkomyLVta0xxn+HZhjBc4YZ/AFjHjz9u3xRZl2BN4aq9nFwWh16IrQ1aHHEd3j1+4/dB9OtH4e29A2H1DyHQRmOSfQZ1Fy7MHBTGB6J/Djq6p3OxyO2cB+4Car7v/o3GXgfAkj23+x9ID1Teoamo/SXcbvSf2PX7Vc8DdCmE1vN9di+32P9/5YR3vLnhCVGUWBjEkr3yh4H8v9CzmsbdhzOKzsJKM90iFdaTMjRPhGVsakRvOaRidljo6H6G7j+ctrJpsP+4COhDIl0La2+FS4+5mlocBaXY5QnGZysIBYoeSsl5qQzrSj/cgNrfuEzlWBfwA+EjrZyWUvpAAAAABJRU5ErkJggg==">
        最近更新
      </h1>
      <span v-else>最近更新</span>
    </div>
    <div class="article-wrapper">
      <dl v-for="(item, index) in topPublishPosts" :key="index">
        <dd>{{'0' + (index + 1)}}</dd>
        <dt>
          <router-link :to="item.path"><div>{{item.title}}</div></router-link>
          <span>{{item.formatDay}}</span>
        </dt>
      </dl>
     
      <dl>
        <dd></dd>
        <dt>
          <router-link to="/timeline/" class="more">更多文章></router-link>
        </dt>
      </dl>
    </div>
    
  </div>
</template>

<script>
import { getTopKPosts } from '../util/getArticleDate'

export default {
  props: ['pageMark'],
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
      const count = this.pageMark === 'home' ? 5 : 3
      return getTopKPosts(this.posts, count, this.currentPath)
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
  .article
    max-width $contentWidth
    margin 0 auto
    padding 2rem 2.5rem 0 2.5rem
    &:not(.article-home)
      margin 2rem auto 0 auto
      border 8px solid rgba(160,160,160,.1)
      box-sizing border-box
    @media (max-width: $MQNarrow)
      padding 2rem 2rem 0rem 2rem
      &:not(.article-home)
        border-width 10px
        border-left none
        border-right none
    @media (max-width: $MQMobileNarrow)
      padding 1.5rem 1.5rem 0rem 1.5rem
    &.article-home
      max-width: 100%
      padding 0 0 2rem 0
    &.no-article
      display none
    .article-title
      border-bottom 1px solid var(--borderColor)
      font-size 1.3rem
      font-weight bold
      padding 0 0 .5rem 1rem
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
        height 55px
        width 100%
        // width 50%
        // @media (max-width: $MQNarrow)
        //   width 100%
        &:last-child
          border-bottom none
        dd
          font-size 1.1rem
          color #F17229
          width 50px
          margin-left 22px
          font-weight bold
          line-height: 55px;
          @media (max-width: $MQNarrow)
            width 45px
        dt
          flex 1
          display flex
          a
            color var(--textColor)
            flex 1
            display: flex;
            height: 55px;
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
            width 100px
            margin-right 15px
            color #999
            text-align right 
            font-size .9rem
            line-height: 55px;
            @media (max-width: $MQNarrow)
              width 95px
</style>
