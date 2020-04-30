<template>
  <div class="categories-wrapper card-box">
    <router-link to="/" class="title iconfont icon-wenjianjia" title="全部分类">
      文章分类
    </router-link>
    <div class="categories">
      <router-link to="/" v-for="(item, index) in categories" :key="index">
        {{item.key}}
        <span>({{item.length}})</span>
      </router-link>
      <router-link to="/" v-if="categoriesData.length > 10">
        更多...
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['categoriesData'],
  computed: {
    categories() {
      return this.categoriesData.slice(0, 10)
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
    padding-top .6rem
    a
      display block
      padding .25rem 0
      color var(--textColor)
      opacity .8
      font-size .95rem
      &:hover
        color $accentColor
      span 
        float right 
</style>
