<template>
  <div>
    <main class="page">
      <slot name="top" />
      
      <div class="theme-vdoing-wrapper">
        <RightMenu v-if="showRightMenu !== false"/>
        <ArticleInfo v-if="isArticle()" />
        <component class="theme-default-content" v-if="pageComponent" :is="pageComponent" />
        <Content class="theme-default-content" />
        
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
  // max-width ($contentWidth + 300px)
  max-width $contentWidth
  margin 0 auto
  padding 2rem 2.5rem
  position relative
  transition all .5s
  @media (max-width: $MQNarrow)
    padding 2rem
  @media (max-width: $MQMobileNarrow)
    padding 1.5rem
  .theme-default-content
    padding 0
  &>.theme-default-content
    margin 0

// 右侧菜单的自适应
@media (min-width: 1490px) and (max-width: 1680px)
  .have-rightmenu.sidebar-open
    .theme-vdoing-wrapper,.page-edit,.page-nav,#vuepress-plugin-comment
      margin 0 0 0 2rem
    .article:not(.article-home)
      margin 0 0 0 4rem
@media (max-width: 1489px) 
  .right-menu-wrapper
    display none
@media (min-width: 1490px) 
  .sidebar .sidebar-sub-headers
    display none
</style>
