<template>
  <div>
    <main class="page">
      <slot name="top" />
      
      <div class="theme-vdoing-wrapper">
        
        <ArticleInfo v-if="isArticle()" />
        <component class="theme-vdoing-content" v-if="pageComponent" :is="pageComponent" />

        <div class="content-wrapper">
          <RightMenu v-if="showRightMenu"/>
          <Content class="theme-vdoing-content" />
        </div>

        <PageEdit />
        <PageNav v-bind="{ sidebarItems }" />
        <UpdateArticle />
      </div>

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
      return this.$page.headers && (this.$frontmatter && this.$frontmatter.sidebar && this.$frontmatter.sidebar !== false) !== false
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
@require '../styles/variable.styl'

.page
  padding-bottom 2rem
  display block
  >*
    @extend $vdoing-wrapper

.theme-vdoing-wrapper
  .content-wrapper
    position relative

/**
 * 右侧菜单的自适应
 */
@media (min-width: 1680px) // 在大屏时
  .have-rightmenu // 有右侧菜单时
    .page
      .theme-vdoing-wrapper
        max-width ($contentWidth + $rightMenuWidth)
      >*:not(.theme-vdoing-wrapper)
        transform translateX(-($rightMenuWidth / 2))

@media (min-width: 1520px) and (max-width: 1679px)
  .have-rightmenu
    .page
      transition: all 0s!important
      .theme-vdoing-wrapper
        max-width ($contentWidth + $rightMenuWidth)
    &.sidebar-open
      .page >*
        margin 0 0 0 2rem
@media (max-width: 1519px)
  .right-menu-wrapper
    display none
@media (min-width: 1520px)
  .sidebar .sidebar-sub-headers
    display none


// @media (min-width: 1360px) and (max-width: 1519px)
//   .have-rightmenu
//     .page
//       .theme-vdoing-wrapper
//         max-width ($contentWidth + $rightMenuWidth - 200px)
//       .theme-vdoing-content,.page-edit,.page-nav,#vuepress-plugin-comment,.article:not(.article-home)
//         max-width ($contentWidth - 200px)
//       .right-menu-wrapper
//         // margin-left ($contentWidth - 180px)

// @media (max-width: 1359px) // 小于等于1359时隐藏右侧锚点菜单
//   .right-menu-wrapper
//     display none
// @media (min-width: 1360px) // 大于等于1360时隐藏左侧锚点菜单
//   .sidebar .sidebar-sub-headers
//     display none
</style>
