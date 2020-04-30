<template>
  <div class="pagation">
    <span class="card-box prev iconfont icon-jiantou-zuo"
     :class="{disabled: currentPage === 1}"
     @click="goPrex()"
    >
      上一页
    </span>

    <div class="pagation-list">
      <!-- 一号位 -->
      <span class="card-box"
       :class="{active: currentPage === 1}"
      >
        1
      </span>

      <!-- 二号位 -->
      <span class="disabled" v-if="currentPage > 3">
        ...
      </span>
      <span class="card-box"
       v-else
       :class="{active: currentPage === 2}"
       >
        2
      </span>

      <!-- 三号位 -->
      <span class="card-box"
       :class="{active: currentPage >= 3 && currentPage <= (pages - 2)}"
      >
        {{ threeNum() }}
      </span>

      <!-- 四号位 -->
      <span class="disabled"
       v-if="currentPage < (pages - 2) "
      >
        ...
      </span>
      <span class="card-box"
       v-else
       :class="{active: currentPage === pages-1}"
      >
        {{pages-1}}
      </span>

      <!-- 五号位 -->
      <span class="card-box"
       v-if="pages >= 5"
       :class="{active: currentPage === pages}"
       @click="goPrex"
      >
        {{pages}}
      </span>
    </div>

    <span class="card-box next iconfont icon-jiantou-you"
     :class="{disabled: currentPage === pages}"
     @click="goNext()"
    >
      下一页
    </span>
  </div>
</template>

<script>
export default {
  props: {
    total: { // 总长度
      type: Number,
      default: 120
    },
    perPage: { // 每页长
      type: Number,
      default: 10
    },
    currentPage: { // 当前页
      type: Number,
      default: 1
    }
  },
  computed: {
    pages() { // 总页数
      return Math.ceil(this.total / this.perPage)
    }
  },
  watch: {
    currentPage() {
      console.log(this.currentPage) // 测试
    }
  },
  methods: {
    threeNum() { // 三号位数字计算
      let num = 3
      const currentPage = this.currentPage

      if (currentPage < 3) {
        num = 3
      } else if (currentPage > (this.pages - 3)) {
        num = this.pages - 2
      } else {
        num = currentPage
      }
       
      return num
    },
    goPrex() {
      
      let currentPage = this.currentPage
      if (currentPage > 1) {
        --this.currentPage // 测试
        this.emit(--currentPage)
      }
    },
    goNext() {
      let currentPage = this.currentPage
      if (currentPage < this.pages) {
        ++this.currentPage // 测试
        this.emit(++currentPage)
      }
    },
    emit (id) {
      this.$emit('getCurrentPage', id)
    }
  }
}
</script>

<style lang='stylus'>
.pagation
  position relative
  height 60px
  text-align center
  span 
    line-height 1rem
    opacity .9
    &:not(.disabled)
      cursor pointer
      &:hover
        color $accentColor
  > span
    position absolute
    top 0
    padding 1rem 1.2rem
    font-size .95rem
    &.disabled
      color rgba(125,125,125,.5)
    &.prev
      left 0
      border-top-right-radius 32px
      border-bottom-right-radius 32px
    &.next
      right 0
      border-top-left-radius 32px
      border-bottom-left-radius 32px
      &::before
        float right 
        margin-left .3rem
  .pagation-list
    span
      display inline-block
      width 2.5rem
      height 2.5rem
      line-height 2.5rem
      margin-top .3rem
      &.active
        background $accentColor
        color var(--bg)
</style>
