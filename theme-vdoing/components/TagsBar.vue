<template>
  <div class="tags-wrapper card-box">
    <router-link to="/" class="title iconfont icon-biaoqian1" title="全部标签">
      热门标签
    </router-link>
    <div class="tags">
      <template v-for="(item, index) in tags" >
        <router-link to="/" :key="index" :style="getTagStyle()">
          {{item.key}}
        </router-link>
        <span :key="index+tags.length"/>
      </template>
      <router-link to="/" v-if="showMore()">
        更多...
      </router-link>
    </div>
  </div>
</template>

<script>
const MAXLEN = 30

export default {
  props: ['tagsData'],
  computed: {
    tags() {
      return this.tagsData.slice(0, MAXLEN)
    }
  },
  methods: {
    showMore() {
      return this.tagsData.length > MAXLEN
    },
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
      &:hover
        color $accentColor
        opacity 1
        text-decoration underline
</style>
