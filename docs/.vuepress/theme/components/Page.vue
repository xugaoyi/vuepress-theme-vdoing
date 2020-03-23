<template>
  <div>
    <main class="page">
      <slot name="top" />
      
      <div class="theme-vdoing-wrapper">
        <RightMenu />
        <ArticleInfo class="theme-default-content" v-if="isArticle()" />
        <component class="theme-default-content" v-if="pageComponent" :is="pageComponent" />
        <Content class="theme-default-content" />

        <PageEdit />
        <PageNav v-bind="{ sidebarItems }" />
      </div>

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
  mounted(){
    console.log(this.$page)
  },
  computed: {
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

.theme-vdoing-wrapper
  // max-width ($contentWidth + 300px)
  max-width $contentWidth
  margin 0 auto
  padding 2rem 2.5rem
  @media (max-width: $MQNarrow)
    padding 2rem
  @media (max-width: $MQMobileNarrow)
    padding 1.5rem
.theme-vdoing-wrapper
  .theme-default-content
    padding 0
  &>.theme-default-content
    margin 0


.page
  padding-bottom 2rem
  display block

</style>
