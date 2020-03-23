<template>
  <div class="buttons">
    <transition name="fade">
      <div
        title="返回顶部"
        class="button go-to-top iconfont icon-fanhuidingbu"
        v-show="showToTop"
        @click="scrollToTop"
      />
    </transition>
    <!-- <div
      title="护眼模式"
      class="button go-to-comment iconfont icon-huyan"
    /> -->
    <div
      title="去评论"
      class="button go-to-comment iconfont icon-pinglun"
      v-show="showCommentBut"
      @click="scrollToComment"
    />
  </div>
</template>

<script>
import debounce from 'lodash.debounce'


export default {
  data() {
    return {
      threshold: 300,
      scrollTop: null,
      showCommentBut: false,
      commentTop: null,
      COMMENT_SELECTOR: '#vuepress-plugin-comment' // 评论区元素的选择器
    }
  },
  mounted () {
    this.scrollTop = this.getScrollTop()
    window.addEventListener('scroll', debounce(() => {
      this.scrollTop = this.getScrollTop()
    }, 100))

    this.handleShowCommentBut()
    window.addEventListener('load', () => {
      this.getCommentTop()
    })
  },
  computed: {
    showToTop () {
      return this.scrollTop > this.threshold
    }
  },
  methods: {
    getScrollTop () {
      return window.pageYOffset
        || document.documentElement.scrollTop
        || document.body.scrollTop || 0
    },

    scrollToTop () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.scrollTop = 0
    },

    getCommentTop () {
      setTimeout(() => {
        const commentEl = document.querySelector(this.COMMENT_SELECTOR)
        if (commentEl) {
          this.commentTop = commentEl.offsetTop
        } else {
          this.showCommentBut = false
        }
      },500)
    },

    handleShowCommentBut() {
      this.showCommentBut = this.$frontmatter.comment !== false && this.$frontmatter.home !== true
    },

    scrollToComment() {
      window.scrollTo({ top: this.commentTop, behavior: 'instant' })
      const textareaEl = document.querySelector(this.COMMENT_SELECTOR + ' textarea')
      if (textareaEl) {
        textareaEl.focus()
        textareaEl.classList.add('yellowBorder')
        setTimeout(() => {
          textareaEl.classList.remove('yellowBorder')
        }, 500)
      }
      
    }
    
  },
  watch: {
    $route() {
      this.handleShowCommentBut()
      this.getCommentTop()
    }
  }
}
</script>

<style lang='stylus'>
  .yellowBorder
    border: #FFE089 1px solid!important
    box-shadow 0 0 10px #FFE089!important
  .buttons
    position fixed
    right 2rem
    bottom 3rem
    z-index 1
    .button
      width 40px
      height 40px
      line-height 40px
      border-radius 50%
      box-shadow 0 2px 6px rgba(0,0,0,.15)
      margin-top .9rem
      text-align center
      cursor pointer
      &:hover
        color $accentColor

  .fade-enter-active, .fade-leave-active
    transition opacity .2s
  .fade-enter, .fade-leave-to
    opacity 0
</style>
