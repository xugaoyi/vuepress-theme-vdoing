<template>
  <aside class="sidebar">
    <div class="blogger" v-if="blogger">
      <img :src="blogger.avatar" />
      <div class="blogger-info">
        <h3>{{ blogger.name }}</h3>

        <div class="icons" v-if="blogger.social">
          <a
            :href="item.link"
            :title="item.title"
            :class="['iconfont', item.iconClass]"
            v-for="(item, index) in blogger.social.icons"
            :key="index"
            target="_blank"
          ></a>
        </div>
        <span v-else>{{ blogger.slogan }}</span>
      </div>
    </div>

    <!-- 移动端Nav -->
    <NavLinks />

    <slot name="top" />

    <SidebarLinks :depth="0" :items="items" />
    <slot name="bottom" />
  </aside>
</template>

<script>
import SidebarLinks from '@theme/components/SidebarLinks.vue'
import NavLinks from '@theme/components/NavLinks.vue'

export default {
  name: 'Sidebar',

  components: { SidebarLinks, NavLinks },

  props: ['items'],

  computed: {
    blogger() {
      return this.$themeConfig.blogger
    }
  }
}
</script>

<style lang="stylus">
.sidebar
  ul
    padding 0
    margin 0
    list-style-type none
  a
    display inline-block
  .nav-links
    display none
    border-bottom 1px solid var(--borderColor)
    padding 0.5rem 0 0.75rem 0
    a
      font-weight 600
    .nav-item, .repo-link
      display block
      line-height 1.25rem
      font-size 1.1em
      padding 0.5rem 0 0.5rem 1.5rem
  & > .sidebar-links
    padding 1.5rem 0
    & > li > a.sidebar-link
      font-size 1.1em
      line-height 1.7
      font-weight bold
    & > li:not(:first-child)
      margin-top 0.75rem
  .blogger
    display none
    border-bottom 1px solid var(--borderColor)
    img
      width 60px
      height 60px
      border-radius 5px
      margin 0.75rem 1rem
    .blogger-info
      flex 1
      padding 0 0.3rem 0.3rem 0
      h3
        margin 0.95rem 0 0.6rem
        font-size 1.1rem
      .icons .iconfont
        font-size 1.2rem
        padding-right 0.6rem
        color #777
  .sidebar-slot
    margin-bottom -0.5rem
    font-size 0.85rem
    &.sidebar-slot-top
      padding 1.5rem 1.5rem 0
    &.sidebar-slot-bottom
      padding 0 1.5rem 1.5rem
@media (max-width $MQMobile)
  .sidebar
    .blogger
      display flex
    .nav-links
      display block
      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after
        top calc(1rem - 2px)
    & > .sidebar-links
      padding 1rem 0
</style>
