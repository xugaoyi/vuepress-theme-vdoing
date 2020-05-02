<template>
  <div class="post-list" ref="postList">

    <div class="post card-box" :class="item.frontmatter.sticky && 'iconfont icon-zhiding'" v-for="item in sortPosts" :key="item.key">
      <div class="title-wrapper">
        <h2>
          <router-link :to="item.path">{{item.title}}</router-link>
        </h2>
        <div class="article-info">
          <a title="作者" class="iconfont icon-touxiang" target="_blank"
           v-if="item.author && item.author.href"
           :href="item.author.href"
          >
            {{ item.author.name ? item.author.name : item.author }}
          </a>
          <span title="作者" class="iconfont icon-touxiang"
            v-else-if="item.author"
          >
            {{ item.author.name ? item.author.name : item.author }}
          </span>

          <span title="创建时间" class="iconfont icon-riqi" v-if="item.frontmatter.date">
            {{ item.frontmatter.date.split(' ')[0]}}
          </span>
          <span title="分类" class="iconfont icon-wenjian" v-if="item.frontmatter.categories">
            <a href="javascript:;" v-for="(c, index) in item.frontmatter.categories" :key="index">
              {{c}}
            </a>
          </span>
          <span title="标签" class="iconfont icon-biaoqian tags" v-if="item.frontmatter.tags && item.frontmatter.tags[0]">
            <a href="javascript:;" v-for="(t, index) in item.frontmatter.tags" :key="index">
              {{t}}
            </a>
          </span>
        </div>
      </div>
      <div class="excerpt-wrapper" v-if="item.excerpt">
        <div class="excerpt" v-html="item.excerpt">
        </div>
        <router-link :to="item.path" class="readmore iconfont icon-jiantou-you">
          阅读全文
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    perPage: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      sortPosts: [],
      postListOffsetTop: 0
    }
  },
  created() {
    this.setPosts()
  },
  mounted() {
    this.postListOffsetTop = this.getElementToPageTop(this.$refs.postList) - 90
  },
  watch: {
    currentPage() {
      window.scrollTo({ top: this.postListOffsetTop }) // behavior: 'smooth'
      this.setPosts()
    }
  },
  methods: {
    setPosts() {
      const currentPage = this.currentPage
      const perPage = this.perPage
      this.sortPosts = this.$sortPosts.slice((currentPage-1)*perPage, currentPage*perPage)
    },
    getElementToPageTop(el) {
      if(el.parentElement) {
        return this.getElementToPageTop(el.parentElement) + el.offsetTop
      }
      return el.offsetTop
    }
  }
}
</script>

<style lang='stylus'>
.post-list
  margin-bottom 4rem
  .post
    position relative
    padding 1rem 1.5rem
    margin-bottom 0.9rem
    &::before
      position absolute
      top -1px
      right 0
      font-size 2.5rem
      color $accentColor
      opacity .85
    .title-wrapper
      a
        color var(--textColor)
        &:hover
          color $accentColor
      h2
        margin .5rem 0
        border none
      .article-info
        > a, > span
          opacity .7
          font-size .8rem
          margin-right 1rem
          cursor pointer
          &::before
            margin-right .3rem
          a
            margin 0
            &:not(:first-child)
              &::before
                content '/'
        .tags a:not(:first-child)::before
          content ','

    .excerpt-wrapper
      border-top 1px solid var(--borderColor)
      margin .5rem 0
      overflow hidden
      .excerpt
        h1,h2,h3
          display none
        img
          max-height 280px
          margin 0 auto
      .readmore
        float right 
        margin-right 1rem
        line-height 1rem
        &::before
          float right 
          font-size .8rem
          margin .1rem 0 0 .2rem
</style>
