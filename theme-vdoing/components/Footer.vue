<template>
  <div class="footer">
    <div class="icons" v-if="social && social.icons">
      <a
        :href="item.link"
        :title="item.title"
        :class="['iconfont', item.iconClass]"
        v-for="(item, index) in social.icons"
        :key="index"
        target="_blank"
      >
      </a>
    </div>
    <template v-if="footer">
      <a href="https://github.com/xugaoyi/vuepress-theme-vdoing-blog" target="_blank" title="本站主题">♔♕Vdoing | </a>
      Copyright © {{ footer.createYear }}-{{ new Date().getFullYear() }}
      <span v-html="footer.copyrightInfo"></span>
    </template>
  </div>
</template>

<script>
export default {
  computed: {
    social() {
      return this.$themeConfig.blogger && this.$themeConfig.blogger.social
    },
    footer() {
      return this.$themeConfig.footer
    }
  }
}
</script>

<style lang='stylus' scoped>
$mobileSidebarWidth = $sidebarWidth * 0.82

.icons
  margin-bottom 12px
  .iconfont
    padding 0 10px
    font-size 19px
.footer
  padding 2.5rem 2.5rem 3rem 
  text-align center
  color var(--textColor)
  opacity .6
  box-sizing border-box
  font-size .85rem
  transition all .2s ease
  a
    color var(--textColor)
@media (min-width: ($MQMobile + 1px))
  .sidebar-open .footer
    width auto
    margin-left $sidebarWidth

.no-sidebar .footer
  width auto
  margin-left 0

</style>
