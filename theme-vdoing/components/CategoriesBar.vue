<template>
  <div class="categories-wrapper card-box">
    <router-link to="/categories/" class="title iconfont icon-wenjianjia" title="全部分类">
      {{ length === 'all' ? '全部分类' : '文章分类' }}
    </router-link>

    <div class="categories">
      <router-link
        :to="`/categories/?category=${item.key}`"
        v-for="(item, index) in categories"
        :key="index"
        :class="{active: item.key === category}"
      >
        {{item.key}}
        <span>({{item.length}})</span>
      </router-link>
      <router-link to="/categories/" v-if="length !== 'all' && length < categoriesData.length">
        更多...
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: String,
      default: ''
    },
    categoriesData: {
      type: Array,
      default: []
    },
    length: {
      type: [String, Number],
      default: 'all'
    }
  },
  computed: {
    categories() {
      if (this.length === 'all') {
        return this.categoriesData
      } else {
        return this.categoriesData.slice(0, this.length)
      }
    }
  }
}
</script>

<style lang='stylus'>
.categories-wrapper 
  .title
    color $accentColor
    font-size 1.2rem
  .categories
    margin-top .6rem
    a
      display block
      padding .28rem .25rem .25rem 0
      color var(--textColor)
      opacity .8
      font-size .95rem
      position relative
      transition all .3s
      @media (max-width: $MQMobile) 
        font-weight 400
      &:hover
        color $accentColor
        padding-left .4rem
      span 
        float right 
      &.active
        background $accentColor
        color var(--mainBg)
        padding-left .8rem
        border-radius 3px
</style>
