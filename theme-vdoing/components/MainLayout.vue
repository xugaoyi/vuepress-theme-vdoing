<template>
  <div class="main-wrapper">
    <div class="main-left">
      <slot name="mainLeft" />
    </div>

    <div class="main-right">
      <slot name="mainRight" />
    </div>
  </div>
</template>
<style lang="stylus">
.main-wrapper
  margin 2rem auto 0 auto
  max-width $homePageWidth
  padding 0 .9rem
  box-sizing border-box
  position relative
  display flex
  .main-left
    flex 1
    .theme-vdoing-content.card-box
      padding 1rem 1.5rem
      margin-bottom .9rem
    .home-content
      padding 1rem 1.5rem 0
  .main-right
    >* 
      width 265px
      box-sizing border-box
      @media (max-width 900px)
        width 235px
    .card-box
      margin 0 0 .9rem .9rem
      padding .95rem
</style>
