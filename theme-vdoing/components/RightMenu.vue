<template>
  <div class="right-menu-wrapper">
    <div class="right-menu-margin">
      <div class="right-menu-content">
        <div
          :class="[
            'right-menu-item',
            'level' + item.level,
            { active: item.slug === hashText }
          ]"
          v-for="(item, i) in headers"
          :key="i"
        >
          <a :href="'#' + item.slug">{{ item.title }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [],
      hashText: ''
    }
  },
  mounted() {
    this.getHeadersData()
    this.getHashText()
  },
  watch: {
    $route() {
      this.headers = this.$page.headers
      this.getHashText()
    }
  },
  methods: {
    getHeadersData() {
      this.headers = this.$page.headers
    },
    getHashText() {
      this.hashText = decodeURIComponent(window.location.hash.slice(1))
    }
  }
}
</script>

<style lang='stylus'>
.right-menu-wrapper
  width $rightMenuWidth
  float right
  margin-right -($rightMenuWidth + 60px)
  position sticky
  top 0
  font-size 0.9rem
  .right-menu-margin
    margin-top: ($navbarHeight + 1rem)
  .right-menu-content
    max-height 80vh
    position relative
    overflow hidden
    &::-webkit-scrollbar-track-piece
      background none
    &::-webkit-scrollbar-thumb:vertical
      background-color hsla(0, 0%, 49%, 0.3)
    &:hover
      overflow-y auto
    .right-menu-item
      padding 4px 15px
      border-left 1px solid var(--borderColor)
      &.level3
        padding-left 28px
      &.active
        border-color $accentColor
        a
          color $accentColor
          opacity 1
      a
        color var(--textColor)
        opacity 0.75
        display block
        width: ($rightMenuWidth - 30px)
        &:hover
          color $accentColor
.have-body-img
  .right-menu-wrapper
    .right-menu-margin
      padding 0.3rem 0
      background var(--sidebarBg)
      border-radius 5px
      .right-menu-item
        border-color transparent
        &.active
          border-left 0.2rem solid $accentColor
        &:hover
          border-left 0.2rem solid $accentColor
</style>
