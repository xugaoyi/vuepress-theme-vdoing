<template>
  <div class="pagination">
    <span
      class="card-box prev iconfont icon-jiantou-zuo"
      :class="{ disabled: currentPage === 1 }"
      @click="goPrex()"
    >
      <p>上一页</p>
    </span>

    <!-- 分页在5页及以下时 -->
    <div class="pagination-list" v-if="pages <= 5">
      <span
        class="card-box"
        v-for="item in pages"
        :key="item"
        :class="{ active: currentPage === item }"
        @click="goIndex(item)"
        >{{ item }}</span
      >
    </div>
    <!-- 分页在5页以上 -->
    <div class="pagination-list" v-else>
      <!-- 一号位 -->
      <span
        class="card-box"
        :class="{ active: currentPage === 1 }"
        @click="goIndex(1)"
        >1</span
      >

      <!-- 二号位 -->
      <span
        class="ellipsis ell-two"
        v-show="currentPage > 3"
        @click="goIndex(currentPage - 2)"
        title="上两页"
      />
      <!--这里没有使用v-if的原因是因为部署版本在当前页大于3时刷新页面出现了一些bug-->
      <span
        class="card-box"
        v-show="currentPage <= 3"
        :class="{ active: currentPage === 2 }"
        @click="goIndex(2)"
        >2</span
      >

      <!-- 三号位 -->
      <span
        class="card-box"
        :class="{ active: currentPage >= 3 && currentPage <= pages - 2 }"
        @click="goIndex(threeNum())"
        >{{ threeNum() }}</span
      >

      <!-- 四号位 -->
      <span
        class="ellipsis ell-four"
        v-show="currentPage < pages - 2"
        @click="goIndex(currentPage + 2)"
        title="下两页"
      />
      <span
        class="card-box"
        v-show="currentPage >= pages - 2"
        :class="{ active: currentPage === pages - 1 }"
        @click="goIndex(pages - 1)"
        >{{ pages - 1 }}</span
      >

      <!-- 五号位 -->
      <span
        class="card-box"
        :class="{ active: currentPage === pages }"
        @click="goIndex(pages)"
        >{{ pages }}</span
      >
    </div>

    <span
      class="card-box next iconfont icon-jiantou-you"
      :class="{ disabled: currentPage === pages }"
      @click="goNext()"
    >
      <p>下一页</p>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    total: { // 总长度
      type: Number,
      default: 10
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
  methods: {
    threeNum() { // 三号位页码计算
      let num = 3
      const currentPage = this.currentPage
      const pages = this.pages
      if (currentPage < 3) {
        num = 3
      } else if (currentPage > (pages - 3)) {
        num = pages - 2
      } else {
        num = currentPage
      }
      return num
    },
    goPrex() {
      let currentPage = this.currentPage
      if (currentPage > 1) {
        this.handleEmit(--currentPage)
      }
    },
    goNext() {
      let currentPage = this.currentPage
      if (currentPage < this.pages) {
        this.handleEmit(++currentPage)
      }
    },
    goIndex(i) {
      if (i !== this.currentPage) {
        this.handleEmit(i)
      }
    },
    handleEmit(i) {
      this.$emit('getCurrentPage', i)
    }
  }
}
</script>

<style lang='stylus'>
.pagination
  position relative
  height 60px
  text-align center
  @media (max-width 720px)
    margin-left 1px
    margin-right 1px
  span
    line-height 1rem
    opacity 0.9
    cursor pointer
    &:hover
      color $accentColor
    &.ellipsis
      opacity 0.5
      &::before
        content '...'
        font-size 1.2rem
      @media (any-hover hover)
        &.ell-two
          &:hover
            &::before
              content '«'
        &.ell-four
          &:hover
            &::before
              content '»'
  > span
    position absolute
    top 0
    padding 1rem 1.2rem
    font-size 0.95rem
    &::before
      font-size 0.4rem
    &.disabled
      color rgba(125, 125, 125, 0.5)
    &.prev
      left 0
      // border-top-right-radius 32px
      // border-bottom-right-radius 32px
      &::before
        margin-right 0.3rem
    &.next
      right 0
      // border-top-left-radius 32px
      // border-bottom-left-radius 32px
      &::before
        float right
        margin-left 0.3rem
    p
      display inline
      line-height 0.95rem
  .pagination-list
    span
      display inline-block
      width 2.5rem
      height 2.5rem
      line-height 2.5rem
      margin 0.3rem
      &.active
        background $accentColor
        color var(--mainBg)
@media (max-width 800px)
  .pagination
    > span
      padding 1rem 1.5rem
      p
        display none
// 719px
@media (max-width $MQMobile)
  .pagination
    > span // 左右按钮
      padding 0.9rem 1.5rem
    .pagination-list
      span
        width 2.3rem
        height 2.3rem
        line-height 2.3rem
        margin 0.25rem
@media (max-width 390px)
  .pagination
    > span // 左右按钮
      padding 0.8rem 1.3rem
    .pagination-list
      span
        width 2rem
        height 2rem
        line-height 2rem
        margin 0.1rem
        margin-top 0.3rem
</style>
