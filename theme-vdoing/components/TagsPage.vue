<template>
  <div class="tags-page">
    <div class="theme-vdoing-wrapper">
      标签页
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang='stylus'>
@require '../styles/wrapper.styl'

.tags-page
  min-height calc(100vh - 3.6rem)
  padding-top ($navbarHeight)
  @media (min-width $cardLayout)
    min-height calc(100vh - 5.6rem)
    padding-top ($navbarHeight + 2rem)
    background var(--pageBg)
  >*
    @extend $vdoing-wrapper
</style>
