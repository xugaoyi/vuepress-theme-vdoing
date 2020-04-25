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
      </div>

      <UpdateArticle
        :length="updateBarConfig && updateBarConfig.onArticle && updateBarConfig.onArticle.length || 3"
        :moreArticle="updateBarConfig && updateBarConfig.moreArticle"
        v-if="isShowUpdateBar"
        />

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
  data() {
    return {
      updateBarConfig: null
    }
  },
  props: ['sidebarItems'],
  components: { PageEdit, PageNav, ArticleInfo, Catalogue, UpdateArticle, Timeline, Footer, RightMenu},
  created() {
    console.log(this.$themeConfig)
    this.updateBarConfig = this.$themeConfig.updateBar
  },
  computed: {
    isShowUpdateBar() {
      return this.updateBarConfig && this.updateBarConfig.onArticle && this.updateBarConfig.onArticle.isShow === false ? false : true
    },
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
  padding-top ($navbarHeight)
  @media (min-width $cardLayout)
    padding-top ($navbarHeight + 2rem)
    background var(--pageBg)
  >*
    @extend $vdoing-wrapper

.theme-vdoing-wrapper
  .content-wrapper
    position relative

/**
 * 右侧菜单的自适应
 */
@media (min-width: 720px) and (max-width: 1519px)
  .have-rightmenu
    .page 
      padding-right 0!important

@media (max-width: 1519px)
  .right-menu-wrapper
    display none
@media (min-width: 1520px)
  .sidebar .sidebar-sub-headers
    display none

</style>
