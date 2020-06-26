<template>
  <div>
    <main class="page">
      <slot name="top" />
      
      <div class="theme-vdoing-wrapper">
        
        <ArticleInfo v-if="isArticle()" />
        <component class="theme-vdoing-content" v-if="pageComponent" :is="pageComponent" />

        <div class="content-wrapper">
          <RightMenu v-if="showRightMenu"/>
          <h1 v-if="showTitle">
            <img :src="currentBadge" v-if="$themeConfig.titleBadge === false ? false : true">
            {{this.$page.title}}
          </h1>
          <Content class="theme-vdoing-content" />
        </div>
        

        <PageEdit />
        <PageNav v-bind="{ sidebarItems }" />
      </div>

      <UpdateArticle
        :length="3"
        :moreArticle="updateBarConfig && updateBarConfig.moreArticle"
        v-if="isShowUpdateBar"
      />

      <slot name="bottom" />
    </main>
  
  </div>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'
import ArticleInfo from './ArticleInfo.vue'
import Catalogue from './Catalogue.vue'
import UpdateArticle from './UpdateArticle.vue'
import RightMenu from './RightMenu.vue'

import TitleBadgeMixin from '../mixins/titleBadge'

export default {
  mixins: [TitleBadgeMixin],
  data() {
    return {
      updateBarConfig: null
    }
  },
  props: ['sidebarItems'],
  components: { PageEdit, PageNav, ArticleInfo, Catalogue, UpdateArticle, RightMenu},
  created() {
    this.updateBarConfig = this.$themeConfig.updateBar
  },
  computed: {
    isShowUpdateBar() {
      return this.updateBarConfig && this.updateBarConfig.showToArticle === false ? false : true 
    },
    showTitle() {
      return !this.$frontmatter.pageComponent
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

.page
  padding-bottom 2rem
  display block
  @media (max-width  $MQMobile)
    padding-top ($navbarHeight)
  @media (min-width  $MQMobile)
    padding-top ($navbarHeight + 1.5rem)
  >*
    @extend $vdoing-wrapper

.theme-vdoing-wrapper
  .content-wrapper
    position relative
  h1 img
    margin-bottom -0.2rem
    max-width 2.2rem
    max-height 2.2rem
  

/**
 * 右侧菜单的自适应
 */
@media (min-width: 720px) and (max-width: 1279px)
  .have-rightmenu
    .page 
      padding-right .8rem!important

@media (max-width: 1279px)
  .right-menu-wrapper
    display none
@media (min-width: 1280px)
  .sidebar .sidebar-sub-headers
    display none

</style>
