<template>
  <main class="page">
    <slot name="top" />

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
import Article from './Article.vue'

export default {
  components: { PageEdit, PageNav, Article},
  props: ['sidebarItems']
}
</script>

<style lang="stylus">
// @require '../styles/wrapper.styl'

$wrapper
  max-width $contentWidth
  margin 0 auto
  padding 2rem 2.5rem
  @media (max-width: $MQNarrow)
    padding 2rem
  @media (max-width: $MQMobileNarrow)
    padding 1.5rem

.page
  padding-bottom 2rem
  display block

</style>
