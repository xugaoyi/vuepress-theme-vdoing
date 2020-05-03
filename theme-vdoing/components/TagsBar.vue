<template>
  <div class="tags-wrapper card-box">
    <router-link to="/tags/" class="title iconfont icon-biaoqian1" title="全部标签">
      {{ length === 'all' ? '全部标签' : '热门标签' }}
    </router-link>
    <div class="tags">
      <template v-for="(item, index) in tags" >
        <router-link
          :to="`/tags/?tag=${item.key}`"
          :key="index"
          :style="getTagStyle()"
          :class="{active: item.key === tag}"
        >
          {{item.key}}
        </router-link>
        <span :key="index+tags.length"/>
      </template>
      <router-link to="/tags/" v-if="length !== 'all' && tagsData.length > length">
        更多...
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: ''
    },
    tagsData: {
      type: Array,
      default: []
    },
    length: {
      type: [String, Number],
      default: 'all'
    }
  },
  computed: {
    tags() {
      if (this.length === 'all') {
        return this.tagsData
      } else {
        return this.tagsData.slice(0, this.length)
      }
    }
  },
  methods: {
    getTagStyle() {
      const r = Math.random()
      return r > 0.7 ? 'font-size:1.2rem;opacity: 0.8;' : r < 0.2 ? 'font-size:1rem;opacity: 0.7;' : ''
    }
  }
}
</script>

<style lang='stylus'>
.tags-wrapper 
  .title
    color var(--textColor)
    opacity .8
    font-size 1.2rem
    &:hover
      color $accentColor
  .tags
    padding-top .6rem
    text-align justify
    a
      color var(--textColor)
      opacity .6
      font-size .95rem
      display inline-block
      padding .2rem .2rem .2rem .1rem
      transition all .6s
      &:hover
        color $accentColor
        opacity 1
        transform scale(1.2)
      &.active
        background $accentColor
        color var(--bg)
        padding .2rem .5rem
        border-radius 3px
        opacity 1
        &:hover
          text-decoration none
</style>
