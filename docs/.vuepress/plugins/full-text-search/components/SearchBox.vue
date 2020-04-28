<template>
  <div class="search-box">
    <input
      ref="input"
      aria-label="Search"
      :value="query"
      :class="{ focused: focused }"
      :placeholder="placeholder"
      autocomplete="off"
      spellcheck="false"
      @input="query = $event.target.value"
      @focus="focused = true"
      @blur="focused = false"
      @keyup.enter="go(focusIndex)"
      @keyup.up="onUp"
      @keyup.down="onDown"
    />
    <ul v-if="showSuggestions" class="suggestions" :class="{ 'align-right': alignRight }" @mouseleave="unfocus">
      <li
        v-for="(s, i) in suggestions"
        :key="i"
        class="suggestion"
        :class="{ focused: i === focusIndex }"
        @mousedown="go(i)"
        @mouseenter="focus(i)"
      >
        <a :href="s.path + s.slug" @click.prevent>
          <div v-if="s.parentPageTitle" class="parent-page-title" v-html="highlight(s.parentPageTitle)" />
          <div class="suggestion-row">
            <div class="page-title">{{ s.title || s.path }}</div>
            <div class="suggestion-content">
              <div v-if="s.headingStr" class="header">{{ s.headingStr }}</div>
              <div v-if="s.contentStr">{{ s.contentStr }}</div>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import flexsearchSvc from '../services/flexsearchSvc'
/* global SEARCH_MAX_SUGGESTIONS, SEARCH_PATHS, SEARCH_HOTKEYS */
export default {
  name: 'SearchBox',
  data() {
    return {
      query: '',
      focused: false,
      focusIndex: 0,
      placeholder: undefined,
      suggestions: null,
    }
  },
  computed: {
    queryTerms() {
      if (!this.query) return []
      return this.query
        .trim()
        .toLowerCase()
        // .split(/[^\w]+/i)
        .split(' ')
        .filter(t => t)
    },
    showSuggestions() {
      return this.focused && this.suggestions && this.suggestions.length
    },

    // make suggestions align right when there are not enough items
    alignRight() {
      const navCount = (this.$site.themeConfig.nav || []).length
      const repo = this.$site.repo ? 1 : 0
      return navCount + repo <= 2
    },
  },
  watch: {
    query() {
      this.getSuggestions()
    },
  },
  mounted() {
    flexsearchSvc.buildIndex(this.$site.pages)
    this.placeholder = this.$site.themeConfig.searchPlaceholder || ''
    document.addEventListener('keydown', this.onHotkey)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onHotkey)
  },
  methods: {
    highlight(str) {
      if (!this.queryTerms.length) return str
      return str
    },
    async getSuggestions() {
      if (!this.query) return
      if (!this.queryTerms.length) {
        this.suggestions = []
        return
      }
      this.suggestions = await flexsearchSvc.match(
        this.query,
        this.queryTerms,
        this.$site.themeConfig.searchMaxSuggestions || SEARCH_MAX_SUGGESTIONS,
      )
    },
    getPageLocalePath(page) {
      for (const localePath in this.$site.locales || {}) {
        if (localePath !== '/' && page.path.indexOf(localePath) === 0) {
          return localePath
        }
      }
      return '/'
    },
    isSearchable(page) {
      let searchPaths = SEARCH_PATHS
      // all paths searchables
      if (searchPaths === null) {
        return true
      }
      searchPaths = Array.isArray(searchPaths) ? searchPaths : new Array(searchPaths)
      return (
        searchPaths.filter(path => {
          return page.path.match(path)
        }).length > 0
      )
    },
    onHotkey(event) {
      if (event.srcElement === document.body && SEARCH_HOTKEYS.includes(event.key)) {
        this.$refs.input.focus()
        event.preventDefault()
      }
    },
    onUp() {
      if (this.showSuggestions) {
        if (this.focusIndex > 0) {
          this.focusIndex--
        } else {
          this.focusIndex = this.suggestions.length - 1
        }
      }
    },
    onDown() {
      if (this.showSuggestions) {
        if (this.focusIndex < this.suggestions.length - 1) {
          this.focusIndex++
        } else {
          this.focusIndex = 0
        }
      }
    },
    go(i) {
      if (!this.showSuggestions) {
        return
      }
      this.$router.push(this.suggestions[i].path + this.suggestions[i].slug)
      // this.query = ''
      this.focusIndex = 0
    },
    focus(i) {
      this.focusIndex = i
    },
    unfocus() {
      this.focusIndex = -1
    },
  },
}
</script>

<style lang="stylus">
.search-box
  display inline-block
  position relative
  margin-right 1rem
  input
    cursor text
    width 10rem
    height: 2rem
    color lighten($textColor, 25%)
    display inline-block
    border 1px solid darken($borderColor, 10%)
    border-radius 2rem
    font-size 0.9rem
    line-height 2rem
    padding 0 0.5rem 0 2rem
    outline none
    transition all .2s ease
    background #fff url(../assets/search.svg) 0.6rem 0.5rem no-repeat
    background-size 1rem
    &:focus
      cursor auto
      border-color $accentColor
  .suggestions
    background #fff
    min-width 500px
    max-width 700px
    position absolute
    top 2 rem
    border 1px solid darken($borderColor, 10%)
    border-radius 6px
    padding 0.4rem
    list-style-type none
    &.align-right
      right 0
  .suggestion
    line-height 1.4
    // padding 0.4rem 0.6rem
    border-radius 4px
    cursor pointer
    width 100%
    a
      display block
      white-space normal
      color lighten($textColor, 15%)
      width 100%
      .parent-page-title
        color white
        font-weight 600
        background-color $accentColor
        padding 5px

      .suggestion-row
        border-collapse collapse
        width 100%
        display table
        .page-title
          width: 35%
          border 1px solid $borderColor
          background: #f5f5f5
          border-left none
          display table-cell
          text-align right
          padding 5px
          font-weight 600
        .suggestion-content
          border 1px solid $borderColor
          font-weight 400
          border-right none
          width: 65%
          display table-cell
          padding 5px
          .header
            font-weight 600

    &.focused
      background-color #f3f4f5
@media (max-width: $MQNarrow)
  .search-box
    input
      cursor pointer
      width 0
      border-color transparent
      position relative
      &:focus
        cursor text
        left 0
        width 10rem
// Match IE11
@media all and (-ms-high-contrast: none)
  .search-box input
    height 2rem
@media (max-width: $MQNarrow) and (min-width: $MQMobile)
  .search-box
    .suggestions
      left 0
@media (max-width: $MQMobile)
  .search-box
    margin-right 0
    input
      left 1rem
    .suggestions
      right 0
@media (max-width: $MQMobileNarrow)
  .search-box
    .suggestions
      width calc(100vw - 4rem)
    input:focus
      width 8rem
</style>
