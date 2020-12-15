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
  margin 1.5rem auto 0 auto
  max-width $homePageWidth
  padding 0 0.9rem
  box-sizing border-box
  position relative
  display flex
  .main-left
    flex 1
    // width 72%
    .theme-vdoing-content.card-box
      padding 1rem 1.5rem
      margin-bottom 0.9rem
    .home-content
      padding 1rem 1.5rem 0
  .main-right
    >*
      width 245px
      box-sizing border-box
      @media (max-width 900px)
        width 235px
    .card-box
      margin 0 0 0.9rem 0.9rem
      padding-top 0.95rem
      padding-bottom 0.95rem
// 719px以下
@media (max-width $MQMobile)
  .main-wrapper
    margin 0.9rem 0
    padding 0
    display block
    .main-left
      width 100%
      .post-list
        margin-bottom 3rem
        .post
          border-radius 0
      .pagination
        margin-bottom 3rem
    .main-right
      .blogger-wrapper
        display none
      .card-box
        margin 0 0 0.9rem 0
        border-radius 0
        width 100%
</style>
