<template>
  <div class="custom-page archives-page">
    <div class="theme-vdoing-wrapper">
      <h1>
        <img
          :src="currentBadge"
          v-if="$themeConfig.titleBadge === false ? false : true"
        />
        {{this.$page.title}}
      </h1>
      <ul>
        <template v-for="(item, index) in postsList">
          <li
              v-if="(year = getYear(index)) !== getYear(index-1)"
            class="year"
            :key="index+$sortPostsByDate.length"
          >
            <h2>{{year}}</h2>
          </li>
          <li :key="index">
            <router-link :to="item.path">
              <i>{{ getDate(item) }}</i>
              {{item.title}}
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import { type } from '../util'
import TitleBadgeMixin from '../mixins/titleBadge'

export default {
  mixins: [TitleBadgeMixin],
  data () {
    return {
      postsList: [],

      perPage: 80, // 每页长
      currentPage: 1// 当前页
    }
  },
  created () {
    this.getPageData()
  },
  mounted () {

    window.addEventListener('scroll', debounce(() => {
      if (this.postsList.length < this.$sortPostsByDate.length) {
        const docEl = document.documentElement
        const docBody = document.body
        const scrollTop = docEl.scrollTop || docBody.scrollTop;
        const clientHeight = docEl.clientHeight || docBody.clientHeight;
        const scrollHeight = docEl.scrollHeight || docBody.scrollHeight;

        if (scrollHeight > clientHeight && scrollTop + clientHeight >= scrollHeight - 250) {
          this.loadmore()
        }
      }

    }, 200))
  },
  methods: {
    getPageData () {
      const currentPage = this.currentPage
      const perPage = this.perPage
      this.postsList = this.postsList.concat(this.$sortPostsByDate.slice((currentPage - 1) * perPage, currentPage * perPage))
    },
    loadmore () {
      this.currentPage = this.currentPage + 1
      this.getPageData()
    },
    getYear (index) {
      const item = this.postsList[index]
      if (!item) {
        return
      }
      const { frontmatter: { date } } = item
      if (date && type(date) === 'string') {
        return date.split(" ")[0].slice(0, 4)
      }
    },
    getDate (item) {
      const { frontmatter: { date } } = item
      if (date && type(date) === 'string') {
        return date.split(" ")[0].slice(5, 10)
      }
    }
  }
}
</script>

<style lang='stylus'>
@require '../styles/wrapper.styl'

.archives-page
  .theme-vdoing-wrapper
    @extend $vdoing-wrapper
    position relative
    @media (min-width $contentWidth + 80)
      margin-top 1.5rem !important
    ul, li
      margin 0
      padding 0
    li
      list-style none
      &.year
        position sticky
        top $navbarHeight
        z-index 1
        width: 80px
        &+ li
          position relative
          &::before
            content ''
            display block
            width .5rem
            height .5rem
            border-radius 50%
            border 1px solid $accentColor
            position absolute
            left 4.25rem
            top -2.1rem
          a
            position relative
            &::after
              content ''
              display block
              width 1px
              height 1.5rem
              background $accentColor
              position absolute
              left -1px
              top -1.5rem
      &.year:not(:first-child)
        margin-top 3.5rem
      h2
        margin-top 0
        margin-bottom 0.5rem
        font-weight 400
        padding 0.5rem 0
        border none
        display inline-block
        background var(--mainBg)
        color $accentColor
      a
        display block
        color var(--textColor)
        transition padding 0.3s
        padding 0.4rem 1.2rem
        margin-left 4.5rem
        border-left 1px solid $accentColor
        line-height 1.2rem
        position: relative
        &:hover
          padding-left 1.5rem
          color $activeColor
          background #f9f9f9
          &::before
            transform scale(2)
            background $activeColor
        &::before
          content ''
          display block
          width .3rem
          height .3rem
          border-radius 50%
          background $accentColor
          position: absolute;
          top .9rem
          left -0.18rem
          transition all .5s
        @media (max-width $contentWidth + 80)
          padding 0.5rem 1rem
          font-weight normal
          &:hover
            padding-left 1.5rem
        i
          opacity 0.6
          font-size 0.9rem
          font-weight 400
          margin-right 0.3rem
    .loadmore
      text-align center
      margin-top 1rem
      opacity 0.5
.theme-mode-dark .archives-page .theme-vdoing-wrapper li a:hover, .theme-mode-read .archives-page .theme-vdoing-wrapper li a:hover
  background var(--customBlockBg)
.hide-navbar
  .archives-page
    .theme-vdoing-wrapper
      li.year
        top 0
</style>
