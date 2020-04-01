<template>
  <div>
    <main class="page">
      <slot name="top" />
      
      <div class="theme-vdoing-wrapper">
        <RightMenu v-if="showRightMenu !== false"/>
        <ArticleInfo v-if="isArticle()" />
        <component class="theme-vdoing-content" v-if="pageComponent" :is="pageComponent" />
        <Content class="theme-vdoing-content" />
        
      </div>

      <PageEdit />
      <PageNav v-bind="{ sidebarItems }" />

      <UpdateArticle />

      <slot name="bottom" />
    </main>

    <Footer />
  </div>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'
import ArticleInfo from './ArticleInfo.vue'
import Catalogue from './Catalogue.vue'
import UpdateArticle from './UpdateArticle.vue'
import Timeline from './Timeline.vue'
import Footer from './Footer.vue'
import RightMenu from './RightMenu.vue'

export default {
  components: { PageEdit, PageNav, ArticleInfo, Catalogue, UpdateArticle, Timeline, Footer, RightMenu},
  props: ['sidebarItems'],
  computed: {
    showRightMenu(){
      return this.$frontmatter && this.$frontmatter.sidebar && this.$frontmatter.sidebar !== false
    },
    pageComponent () {
      return this.$frontmatter.pageComponent ? this.$frontmatter.pageComponent.name : false
    }
  },
  methods: {
    isArticle() {
      return this.$frontmatter.article !== false
    }
  }
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl'
.page
  padding-bottom 2rem
  display block

.theme-vdoing-wrapper
  max-width $contentWidth
  margin 0 auto
  padding 2rem 2.5rem
  position relative
  @media (max-width: $MQNarrow)
    padding 2rem
  @media (max-width: $MQMobileNarrow)
    padding 1.5rem
  .theme-vdoing-content
    padding 0!important
  &>.theme-vdoing-content
    margin 0

// 右侧菜单的自适应
@media (min-width: 1680px) // 在大屏时
  .theme-vdoing-wrapper,.page-edit,.page-nav,#vuepress-plugin-comment,.article:not(.article-home)
    transition: all .2s!important
  .have-rightmenu // 有右侧菜单时
    .theme-vdoing-wrapper,.page-edit,.page-nav,#vuepress-plugin-comment,.article:not(.article-home)
      transform translateX(-($rightMenuWidth / 2.5))

@media (min-width: 1360px) and (max-width: 1679px)
  .have-rightmenu
    .page
      transition: all 0s!important
    &.sidebar-open
      .theme-vdoing-wrapper,.page-edit,.page-nav,#vuepress-plugin-comment
        margin 0 0 0 2rem
      .article:not(.article-home)
        margin 0 0 0 4rem
@media (min-width: 1360px) and (max-width: 1519px)
  .have-rightmenu
    .theme-vdoing-wrapper,.page-edit,.page-nav,#vuepress-plugin-comment,.article:not(.article-home)
      max-width ($contentWidth - 200px)
    .right-menu-wrapper
      margin-left ($contentWidth - 180px)

@media (max-width: 1359px) // 小于等于1359时隐藏右侧锚点菜单
  .right-menu-wrapper
    display none
@media (min-width: 1360px) // 大于等于1360时隐藏左侧锚点菜单
  .sidebar .sidebar-sub-headers
    display none
</style>
