<template>
  <div class="custom-page archives-page">
    <div class="theme-vdoing-wrapper">
      <h1>
        <img
          :src="currentBadge"
          v-if="$themeConfig.titleBadge === false ? false : true"
        />
        {{ $page.title }}
      </h1>
      <div class="count">
        总共 <i>{{ $sortPostsByDate.length }}</i> 篇文章
      </div>
      <ul>
        <template v-for="(item, index) in postsList">
          <li
            class="year"
            v-if="(year = getYear(index)) !== getYear(index - 1)"
            :key="index + $sortPostsByDate.length"
          >
            <h2>
              {{ year }}
              <span>
                <i>{{ countByYear[year] }}</i> 篇
              </span>
            </h2>
          </li>
          <li :key="index">
            <router-link :to="item.path">
              <span class="date">{{ getDate(item) }}</span>
              {{ item.title }}
              <span class="title-tag" v-if="item.frontmatter.titleTag">
                {{ item.frontmatter.titleTag }}
              </span>
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
  data() {
    return {
      postsList: [],
      countByYear: {}, // 根据年份统计的文章数

      perPage: 80, // 每页长
      currentPage: 1// 当前页

    }
  },
  created() {
    this.getPageData()

    // 根据年份计算出文章数
    const { $sortPostsByDate, countByYear } = this
    for (let i = 0; i < $sortPostsByDate.length; i++) {
      const { frontmatter: { date } } = $sortPostsByDate[i];
      if (date && type(date) === 'string') {
        const year = date.slice(0, 4)
        if (!countByYear[year]) {
          countByYear[year] = 0
        }
        countByYear[year] = countByYear[year] + 1
      }
    }
    this.countByYear = countByYear
  },
  mounted() {
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
    getPageData() {
      const currentPage = this.currentPage
      const perPage = this.perPage
      this.postsList = this.postsList.concat(this.$sortPostsByDate.slice((currentPage - 1) * perPage, currentPage * perPage))
    },
    loadmore() {
      this.currentPage = this.currentPage + 1
      this.getPageData()
    },
    getYear(index) {
      const item = this.postsList[index]
      if (!item) {
        return
      }
      const { frontmatter: { date } } = item
      if (date && type(date) === 'string') {
        return date.slice(0, 4)
      }
    },
    getDate(item) {
      const { frontmatter: { date } } = item
      if (date && type(date) === 'string') {
        return date.slice(5, 10)
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
    .count
      text-align right
      margin-top -2.5rem
      font-size 0.85rem
      opacity 0.8
    ul, li
      margin 0
      padding 0
    ul
      margin-top 2rem
    li
      list-style none
      &.year
        position sticky
        top $navbarHeight
        background var(--mainBg)
        z-index 1
      &.year:not(:first-child)
        margin-top 3.5rem
      h2
        margin-bottom 0.8rem
        font-weight 400
        padding 0.5rem 0
        span
          font-size 0.85rem
          font-weight 300
          float right
          margin-top 1rem
      a
        display block
        color var(--textColor)
        transition padding 0.3s
        padding 0.5rem 2rem
        line-height 1.2rem
        &:hover
          padding-left 2.5rem
          color $accentColor
          background #f9f9f9
        @media (max-width $contentWidth + 80)
          padding 0.5rem 1rem
          font-weight normal
          &:hover
            padding-left 1.5rem
        span.date
          opacity 0.6
          font-size 0.85rem
          font-weight 400
          margin-right 0.3rem
        .title-tag
          // height 1.1rem
          // line-height 1.1rem
          border 1px solid $activeColor
          color $activeColor
          font-size 0.8rem
          padding 0 0.35rem
          border-radius 0.2rem
          margin-left 0rem
          transform translate(0, -0.05rem)
          display inline-block
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
