<template>
  <div class="theme-default-content">
    <div class="column-wrapper">
      <img :src="pageData.imgUrl" />
      <div class="column-info">
        <span class="title">{{pageData.title}}</span>
        <div class="description" v-html="pageData.description"></div>
      </div>
    </div>
    <div class="catalogue">
      正在开发中...
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageData: {}
    }
  },
  mounted() {
    // const { sidebar } = this.$site.themeConfig
    this.pageData = this.$frontmatter.pageComponent.data
    this.pageData.title = this.$frontmatter.title
    console.log(this.pageData)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.column-wrapper
  display flex
  margin-top 4.6rem
  padding-bottom 2rem
  border-bottom 1px solid #eaecef
  img
    width 90px
    height 90px
    margin-right 1rem
  .column-info
    .title
      font-size 1.6rem
    .description
      color #666
      margin .5rem 0
</style>
