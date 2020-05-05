<template>
  <div class="custom-page archives-page">
    <div class="theme-vdoing-wrapper">
      <ul>

        <template
         v-for="(item, index) in $sortPostsByDate"
        >
          <li
            class="year"
            v-if="year !== getYear(item)"
            :key="index+$sortPostsByDate.length"
          >
            <h2>{{year}}</h2>
          </li>
          <li
            :key="index"
          >
            <router-link :to="item.path">
              <span>
                {{ getDate(item) }}
              </span>
              {{item.title}}
            </router-link>
          </li>
        </template>
        
      </ul>
    </div>
  </div>
</template>

<script>
import { type } from '../util'

export default {
  data() {
    return {
      year: ''
    }
  },
  methods: {
    getYear(item) {
      let {frontmatter: { date }} = item
      if (date && type(date) === 'string') {
        date  = date.split(" ")[0].slice(0, 4)

        if (this.year !== date) {
          this.year = date
        }

        return date
      }
    },
    getDate(item) {
      const {frontmatter: { date }} = item
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
    margin-top 2rem
    padding-top 2rem
    ul,li
      margin 0
      padding 0
    li
      list-style none
      &.year:not(:first-child)
        margin-top 3.5rem
      h2
        margin-bottom .8rem
        font-weight 400
      a
        padding .3rem 2rem
        display block
        color var(--textColor)
        transition padding .3s
        &:hover
          padding-left 2.5rem
          color $accentColor
          background lighten($accentColor, 90%)
        span 
          opacity .6
          font-weight 400
          margin-right .3rem
</style>
