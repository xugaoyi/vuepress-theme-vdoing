<template>
  <div class="categories-wrapper card-box">
    <router-link to="/categories/" class="title iconfont icon-wenjianjia" title="全部分类">
      {{ length === 'all' ? '全部分类' : '文章分类' }}
    </router-link>

    <div class="categories">
      <router-link :to="`/categories/?key=${item.key}`" v-for="(item, index) in categories" :key="index">
        {{item.key}}
        <span>({{item.length}})</span>
      </router-link>
      <router-link to="/categories/" v-if="length !== 'all'">
        更多...
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
    color var(--textColor)
    opacity .8
    font-size 1.2rem
    &:hover
      color $accentColor
  .categories
    margin-top .6rem
    a
      display block
      padding .25rem 0
      color var(--textColor)
      opacity .8
      font-size .95rem
      position relative
      &:hover
        color $accentColor
      span 
        float right 
</style>
