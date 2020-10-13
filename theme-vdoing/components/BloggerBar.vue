<template>
  <aside class="blogger-wrapper card-box">
    <div class="avatar">
      <img
        :src="blogger.avatar"
        alt="头像"
        title="我好看吗"
      />
    </div>
    <div
      class="icons"
      v-if="social && social.icons && social.icons.length"
    >
      <a
        v-for="(item, index) in social.icons"
        :key="index"
        :href="item.link"
        :title="item.title"
        :class="['iconfont', item.iconClass]"
        :style="{width: 100/social.icons.length + '%'}"
        target="_blank"
      />
    </div>
    <div class="blogger">
      <span class="name">{{blogger.name}}</span>
      <span class="slogan">{{blogger.slogan}}</span>
    </div>
  </aside>
</template>

<script>
export default {
  computed: {
    blogger () {
      return this.$themeConfig.blogger
    },
    social () {
      return this.$themeConfig.social
    }
  }
}
</script>

<style lang='stylus'>
.blogger-wrapper
  height auto
  display inline-table
  .avatar
    width 235px
    height 235px
    overflow hidden
    @media (max-width 900px)
      width 205px
      height 205px
    img
      width 100%
      height 100%
  .icons
    // border 1px solid var(--borderColor)
    border-top none
    height 40px
    line-height 40px
    a
      font-size 20px
      width 33%
      color var(--textColor)
      display block
      float left
      text-align center
      opacity 0.8
      &:hover
        color $accentColor
  .blogger
    margin 12px 0 2px 0
    .name
      font-size 1.4rem
      display block
      margin-bottom 6px
    .slogan
      color var(--textColor)
</style>
