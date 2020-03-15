<template>
  <main class="page">
    <slot name="top" />
    
    <ArticleInfo class="theme-default-content" v-if="isArticle()" />

    <component class="theme-default-content" v-if="pageComponent" :is="pageComponent" />

    <Content class="theme-default-content" />
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <Article />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'
import ArticleInfo from './ArticleInfo.vue'
import Catalogue from './Catalogue.vue'
import Article from './Article.vue'
import Timeline from './Timeline.vue'

export default {
  components: { PageEdit, PageNav, ArticleInfo, Catalogue, Article, Timeline},
  props: ['sidebarItems'],
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

.page
  padding-bottom 2rem
  display block

</style>
