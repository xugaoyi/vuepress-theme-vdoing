<template>
  <main class="page">
    <slot name="top" />

    <component v-if="pageComponent" :is="pageComponent" />

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
import Catalogue from './Catalogue.vue'
import Article from './Article.vue'
import Timeline from './Timeline.vue'

export default {
  components: { PageEdit, PageNav, Catalogue, Article, Timeline},
  props: ['sidebarItems'],
  computed: {
    pageComponent () {
      return this.$frontmatter.pageComponent ? this.$frontmatter.pageComponent.name : false
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
