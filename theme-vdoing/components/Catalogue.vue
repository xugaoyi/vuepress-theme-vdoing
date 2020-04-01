<template>
  <div class="theme-vdoing-content">
    <div class="column-wrapper">
      <img :src="getPageData().imgUrl" />
      <dl class="column-info">
        <dt class="title">{{getPageData().title}}</dt>
        <dd class="description" v-html="getPageData().description"></dd>
      </dl>
    </div>
    <div class="catalogue-wrapper">
      <div class="catalogue-title">目录</div>
      <div class="catalogue-content">
        <template v-for="(item, index) in getCatalogueList()">
          <dl v-if="type(item) === 'array'" :key="index" class="inline">
            <dt>
              <router-link :to="item[2]">{{`${index+1}. ${item[1]}`}}</router-link>
            </dt>
          </dl>
          <dl v-else-if="type(item) === 'object'" :key="index">
            <dt>{{`${index+1}. ${item.title}`}}</dt>
            <dd>
              <router-link :to="s[2]" v-for="(s, i) in item.children" :key="i">
                {{`${index+1}-${i+1}. ${s[1]}`}}
              </router-link>
            </dd>
          </dl>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getPageData() {
      const pageData = this.$frontmatter.pageComponent.data
      pageData.title = this.$frontmatter.title
      return pageData
    },
    getCatalogueList() {
      const { sidebar } = this.$site.themeConfig
      const key = this.$frontmatter.pageComponent.data.key
      const catalogueList = sidebar[`/${key}/`]

      if(!catalogueList) {
        console.error('未获取到目录数据，请查看front matter中设置的key是否正确。')
      }

      return catalogueList
    },
    type(o) { // 数据类型检查
      return Object.prototype.toString.call(o).match(/\[object (.*?)\]/)[1].toLowerCase()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
dl,dd
  margin 0
.column-wrapper
  display flex
  margin-top 4.6rem!important
  padding-bottom 2rem
  border-bottom 1px solid var(--borderColor)
  img
    width 80px
    height 80px
    border-radius 2px
    margin-right 1rem
  .column-info
    .title
      font-size 1.6rem
    .description
      color var(--textColor)
      opacity .8
      margin .5rem 0
.catalogue-wrapper
  .catalogue-title
    font-size 1.45rem
    margin 2rem 0
  .catalogue-content
    dl
      margin-bottom 1.8rem
      &.inline
        display inline-block
        width 50%
        margin-bottom 1rem
        @media (max-width: $MQMobileNarrow)
          width 100%
        a
          width 100%
      dt
        font-size 1.1rem
      dd
        margin-top .7rem
      a
        margin-bottom .5rem
        display inline-block
        width 50%
        @media (max-width: $MQMobileNarrow)
          width 100%
</style>
