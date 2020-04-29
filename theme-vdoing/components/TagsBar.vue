<template>
  <div class="tags-wrapper card-box">
    <router-link to="/" class="title iconfont icon-biaoqian1" title="全部标签">
      热门标签
    </router-link>
    <div class="tags">
      <router-link to="/" v-for="(item, index) in tags" :key="index">
        {{item.key}}
      </router-link>
      <router-link to="/" v-if="showMore()">
        更多...
      </router-link>
    </div>
  </div>
</template>

<script>
const MAXLEN = 50

export default {
  computed: {
    tags() {
      const test = [
        {key: "test", length: 1},
        {key: "博客博客博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "testtest", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "githubgithub", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1},
        {key: "test", length: 1},
        {key: "博客", length: 2},
        {key: "css", length: 1},
        {key: "github", length: 1}
      ];

      this.$categoriesAndTags.tags = test

      return this.$categoriesAndTags.tags.slice(0, MAXLEN)
    }
  },
  methods: {
    showMore() {
      console.log(this.$categoriesAndTags.tags.length > MAXLEN)
      return this.$categoriesAndTags.tags.length > MAXLEN
    }
  }
}
</script>

<style lang='stylus'>
.tags-wrapper 
  .title
    color var(--textColor)
    opacity .8
    font-size 1.2rem
    &:hover
      color $accentColor
  .tags
    padding-top .5rem
    text-align justify
    a
      color var(--textColor)
      opacity .6
      font-size .95rem
      display inline-block
      padding 0 .2rem 0 .1rem
      &:hover
        color $accentColor
        opacity 1
        text-decoration underline
</style>
