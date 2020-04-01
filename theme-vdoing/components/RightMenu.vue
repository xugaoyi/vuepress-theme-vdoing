<template>
  <div class="right-menu-wrapper">
    <div class="right-menu-padding">
      <div class="right-menu-content">
        <div
            :class="['right-menu-item', 'level'+item.level, { active: item.slug === hashText }]"
            v-for="(item, i) in headers"
            :key="i"
          >
            <a :href="'#'+item.slug">{{item.title}}</a>
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
  height 0
  margin 0 0 0 ($contentWidth + 20px)
  position sticky
  top 0
  font-size .9rem
  .right-menu-padding
    padding-top ($navbarHeight + 3rem)
  .right-menu-content
    max-height 80vh
    position relative
    overflow hidden
    &::-webkit-scrollbar-track-piece
      background none
    &::-webkit-scrollbar-thumb:vertical
      background-color hsla(0,0%,49%,.3)
    &:hover
      overflow-y auto
    .right-menu-item
      padding 4px 15px
      border-left .2rem solid var(--borderColor)
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
        width ($rightMenuWidth - 30px)
        &:hover
          color $accentColor
</style>
