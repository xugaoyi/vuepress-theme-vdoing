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
          :style="tagStyleList[index]"
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
  data() {
    return {
      tagStyleList: []
    }
  },
  created() {
    for (let i = 0, tagH = this.tags.length; i < tagH; i++) {
      this.tagStyleList.push(this.getTagStyle())
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
      return r > 0.7 ? 'opacity: 0.7;' : r < 0.2 ? 'opacity: 0.6;' : ''
    }
  }
}
</script>

<style lang='stylus'>
.tags-wrapper 
  .title
    color var(--textColor)
    opacity 0.9
    font-size 1.2rem
  .tags
    text-align justify
    padding .6rem .3rem .3rem .3rem
    margin 0 -0.3rem -0.3rem -0.3rem
    a
      opacity .5
      display inline-block
      padding .2rem .4rem
      transition all .4s
      background-color var(--textColor)
      color var(--mainBg)
      border-radius 3px
      margin 0 .3rem .5rem 0
      min-width 2rem
      height 1rem
      line-height 1rem
      font-size .8rem
      text-align center
      @media (max-width: $MQMobile) 
        font-weight 400
      &:hover
        opacity 1
      &.active
        background $accentColor
        color var(--mainBg)
        transform scale(1.1)
        opacity 1
        &:hover
          text-decoration none
</style>
