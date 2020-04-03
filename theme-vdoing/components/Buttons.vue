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
    <div
      title="去评论"
      class="button go-to-comment iconfont icon-pinglun"
      v-show="showCommentBut"
      @click="scrollToComment"
    />
    <div
      title="主题模式"
      class="button theme-mode-but iconfont"
      :class="themeIconClass"
      @click="$emit('toggle-theme-mode')"
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
      themeIconClass: 'icon-rijianmoshi',
      _scrollTimer: null,
      _textareaEl: null,
      _recordScrollTop: null,
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
    toggleIconClass(mode) {
      this.themeIconClass = mode == 1 ? 'icon-rijianmoshi' : mode == 2 ? 'icon-yejianmoshi' : 'icon-yuedu' 
    },

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
      window.scrollTo({ top: this.commentTop, behavior: 'smooth' })
      this._textareaEl = document.querySelector(this.COMMENT_SELECTOR + ' textarea')
      if( this._textareaEl && this.getScrollTop() !== this._recordScrollTop) {
        document.addEventListener("scroll", this._handleListener)
      } else if (this._textareaEl && this.getScrollTop() === this._recordScrollTop) {
        this._handleFocus()
      }
    },

    _handleListener() {
      clearTimeout(this._scrollTimer)
      this._scrollTimer = setTimeout(() => {
        document.removeEventListener('scroll', this._handleListener)
        this._recordScrollTop = this.getScrollTop()
        this._handleFocus()
      }, 30)
    },

    _handleFocus() {
      this._textareaEl.focus()
      this._textareaEl.classList.add('yellowBorder')
      setTimeout(() => {
        this._textareaEl.classList.remove('yellowBorder')
      }, 500)
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
    bottom 2.5rem
    @media (max-width: $MQNarrow)
      right 1rem
      bottom 1.5rem
    z-index 1
    .button
      width 40px
      height 40px
      line-height 40px
      border-radius 50%
      box-shadow 0 2px 6px rgba(0,0,0,.25)
      margin-top .9rem
      text-align center
      cursor pointer
      // color var(--textLightenColor)
      background rgba(255,255,255,.1)
      &:hover
        color $accentColor

  .fade-enter-active, .fade-leave-active
    transition opacity .2s
  .fade-enter, .fade-leave-to
    opacity 0
</style>
