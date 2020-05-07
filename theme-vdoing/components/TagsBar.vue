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
      return r > 0.7 ? 'font-size:1.2rem;opacity: 0.8;' : r < 0.2 ? 'font-size:1rem;opacity: 0.7;' : ''
    }
  }
}
</script>

<style lang='stylus'>
.tags-wrapper 
  .title
    color $accentColor
    font-size 1.2rem
  .tags
    text-align justify
    padding .6rem .3rem .3rem .3rem
    margin 0 -0.3rem -0.3rem -0.3rem
    a
      color var(--textColor)
      opacity .6
      font-size .95rem
      display inline-block
      padding .2rem .4rem
      transition all .4s
      @media (max-width: $MQMobile) 
        font-weight 400
      &:hover
        color $accentColor
        opacity 1
        transform scale(1.2)
      &.active
        background $accentColor
        color var(--mainBg)
        // padding .2rem .5rem
        border-radius 3px
        opacity 1
        &:hover
          text-decoration none
</style>
