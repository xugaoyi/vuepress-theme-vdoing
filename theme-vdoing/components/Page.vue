<template>
  <div>
    <main class="page">

      <div :class="`theme-vdoing-wrapper ${bgStyle}`">
        <ArticleInfo v-if="isArticle()" />
        <component
          class="theme-vdoing-content"
          v-if="pageComponent"
          :is="pageComponent"
        />

        <div class="content-wrapper">
          <RightMenu v-if="showRightMenu" />
          <h1 v-if="showTitle">
            <img
              :src="currentBadge"
              v-if="$themeConfig.titleBadge === false ? false : true"
            />
            {{this.$page.title}}
          </h1>
          <slot name="top" v-if="isShowSlotT" />

          <Content class="theme-vdoing-content" />
        </div>
  <slot name="bottom"  v-if="isShowSlotB" />
        <PageEdit />


        <PageNav v-bind="{ sidebarItems }" />
      </div>



      <UpdateArticle
        :length="3"
        :moreArticle="updateBarConfig && updateBarConfig.moreArticle"
        v-if="isShowUpdateBar"
      />
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
  data () {
    return {
      updateBarConfig: null
    }
  },
  props: ['sidebarItems'],
  components: { PageEdit, PageNav, ArticleInfo, Catalogue, UpdateArticle, RightMenu },
  created () {
    this.updateBarConfig = this.$themeConfig.updateBar
  },
  computed: {
    bgStyle () {
      const { contentBgStyle } = this.$themeConfig
      return contentBgStyle ? 'bg-style-' + contentBgStyle : ''
    },
    isShowUpdateBar () {
      return this.updateBarConfig && this.updateBarConfig.showToArticle === false ? false : true
    },
    showTitle () {
      return !this.$frontmatter.pageComponent
    },
    showRightMenu () {
      const { $frontmatter, $themeConfig, $page } = this
      const { sidebar } = $frontmatter
      return (
        $themeConfig.rightMenuBar !== false &&
        $page.headers &&
        ($frontmatter && sidebar && sidebar !== false) !== false
      )
    },
    pageComponent () {
      return this.$frontmatter.pageComponent ? this.$frontmatter.pageComponent.name : false
    },
    isShowSlotT() {
      return this.getShowStatus('pageTshowMode')
    },
    isShowSlotB() {
      return this.getShowStatus('pageBshowMode')
    }
  },
  methods: {
    getShowStatus(prop) {
      const { htmlModules } = this.$themeConfig
      if(!htmlModules) return false
      if (htmlModules[prop] === 'article') { // 仅文章页显示
        return this.isArticle()
      } else if (htmlModules[prop] === 'custom'){ // 仅自定义页显示
        return !(this.isArticle())
      } else { // 全部显示
        return true
      }
    },
    isArticle () {
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
  @media (max-width $MQMobile)
    padding-top $navbarHeight
  @media (min-width $MQMobile)
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
.theme-vdoing-wrapper
  --linesColor rgba(50, 0, 0, 0.05)
  &.bg-style-1 // 方格
    background-image linear-gradient(90deg, var(--linesColor) 3%, transparent 3%), linear-gradient(0deg, var(--linesColor) 3%, transparent 3%)
    background-position center center
    background-size 20px 20px
  &.bg-style-2 // 横线
    background-image repeating-linear-gradient(0, var(--linesColor) 0, var(--linesColor) 1px, transparent 0, transparent 50%)
    background-size 30px 30px
  &.bg-style-3 // 竖线
    background-image repeating-linear-gradient(90deg, var(--linesColor) 0, var(--linesColor) 1px, transparent 0, transparent 50%)
    background-size 30px 30px
  &.bg-style-4 // 左斜线
    background-image repeating-linear-gradient(-45deg, var(--linesColor) 0, var(--linesColor) 1px, transparent 0, transparent 50%)
    background-size 20px 20px
  &.bg-style-5 // 右斜线
    background-image repeating-linear-gradient(45deg, var(--linesColor) 0, var(--linesColor) 1px, transparent 0, transparent 50%)
    background-size 20px 20px
  &.bg-style-6 // 点状
    background-image radial-gradient(var(--linesColor) 1px, transparent 1px)
    background-size 10px 10px
// 背景纹适应深色模式
.theme-mode-dark
  .theme-vdoing-wrapper
    --linesColor rgba(125, 125, 125, 0.05)
/**
 * 右侧菜单的自适应
 */
@media (min-width 720px) and (max-width 1279px)
  .have-rightmenu
    .page
      padding-right 0.8rem !important
@media (max-width 1279px)
  .have-rightmenu
    .right-menu-wrapper
      display none
@media (min-width 1280px)
  .have-rightmenu
    .sidebar .sidebar-sub-headers
      display none
</style>
