<template>
  <div class="categories-page">
    <div class="theme-vdoing-wrapper">
      分类页
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang='stylus'>
@require '../styles/wrapper.styl'

.categories-page
  min-height 100vh
  padding-top ($navbarHeight)
  @media (min-width $cardLayout)
    padding-top ($navbarHeight + 2rem)
    background var(--pageBg)
  >*
    @extend $vdoing-wrapper
</style>
