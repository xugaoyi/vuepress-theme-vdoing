<template>
  <div class="timeline-wrapper theme-vdoing-content">
    <div class="tags">
      <a href="#全部" :class="{active: currentTag === '全部'}" :style="randomBgcolor()" @click="toggleTag('全部')">全部</a>
      <a
        :class="{active: currentTag === key}"
        v-for="(item, key) of getPages.tagGroup"
        :style="randomBgcolor()"
        @click="toggleTag(key)"
        :key="key"
        :href="'#'+key"
      >
        {{key}}
      </a>
    </div>

    <div class="timeline">
      <transition-group tag="ul">
        <li class="desc" key="0">{{pageData.slogan}}</li>
        <template v-for="yearItem in tagPages()">
          <li :key="yearItem.year">
            <h3 class="year">{{yearItem.year}}</h3>
            <div class="year-wrapper">
                <transition-group tag="span">
                  <router-link :to="item.path" v-for="item in yearItem.pageList" :key="item.path.slice(-6)">
                    <span class="date">{{item.formatDay}}</span>
                    <span class="title">{{item.title}}</span>
                  </router-link>
              </transition-group>
            </div>
          </li>
        </template>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { getPagesList } from '../util/getArticleDate'

export default {
  data() {
    return {
      pageData: {
        tagBgColor: ['#11a8cd', '#F8B26A', '#67CC86', '#E15B64', '#F47E60', '#849B87'],
        slogan: '只争朝夕，不负韶华！( •̀ ω •́ )✧'
      },
      currentTag: "",
      posts: [],
    }
  },
  created() {
    
  },
  mounted() {
    const fmData = this.$frontmatter.pageComponent.data
    if(fmData && fmData.slogan) {
      this.pageData.slogan = fmData.slogan
    }

    this.posts = this.$site.pages
    document.body.style="overflow-y: scroll;" // 解决切换tag页面高度不满屏出现跳动的问题

    this.handleHashTag()

    window.onhashchange = () => {
      this.handleHashTag()
    }
  },

  computed: {
    getPages() {
      return getPagesList(this.posts)
    }
  },

  watch: {
    currentTag(tag) {
      document.body.setAttribute('id', tag); // 用于解决vue-router在处理描点元素定位时的报错
    }
  },

  methods: {
    handleHashTag() {
      const hashTag = decodeURIComponent(window.location.hash.slice(1))
      this.currentTag = hashTag ? hashTag : '全部'
    },
    // 根据标签获取数据
    tagPages() {
      if (this.currentTag === "全部") {
        return this.getPages.allPage
      } else {
        return this.getPages.tagGroup[this.currentTag]
      }
    },
    // 切换标签
    toggleTag(tag) {
      this.currentTag = tag
    },

    // 随机背景色
    randomBgcolor() {
      const tagBgColor = this.pageData.tagBgColor
      return { background: `${tagBgColor[Math.floor(Math.random() * tagBgColor.length)]}`}
    },

  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.timeline-wrapper
  padding-top 1rem
  .tags
    margin-bottom 30px
    a
      vertical-align: middle;
      margin: 4px 4px 10px;
      padding: 5px 8px;
      display: inline-block;
      cursor: pointer;
      border-radius: .25rem;
      background: #E15B64;
      color: #fff;
      line-height: 13px;
      font-size: 13px;
      transition: all .5s; 
      opacity: 0.9;
      box-shadow: 0px 0px 8px rgba(80,80,80,.3);
      &.active
        transform: scale(1.2);
        opacity: 1;
      &:hover
        text-decoration: none!important;
      &:not(.active):hover
        transform: scale(1.05); 


  .v-enter{
    opacity: 0;
    transform: translateY(-30px);
  }
  .v-leave-active{
    display:none;
  }
  .v-leave{
    opacity: 0;
  }


  ul
    list-style: none;
  .timeline ul
    box-sizing: border-box;
    margin: 4rem auto;
    position: relative;
    &:after
      content: " ";
      position: absolute;
      top: 14px;
      left: 0;
      // z-index: -1;
      margin-left: -2px;
      width: 4px;
      height: 100%;
      background: var(--borderColor); 
    >li
      transition: all .25s ease-in-out;
      margin-bottom: 55px;
    .year
      margin: 0;
      font-weight: 700;
      font-size: 26px;
    .desc,.year
      position: relative;
    .desc:before,.year:before
      content: " ";
      position: absolute;
      z-index: 2;
      left: -20px;
      top: 50%;
      margin-left: -4px;
      margin-top: -4px;
      width: 8px;
      height: 8px;
      background: #fff;
      border: 1px solid var(--borderColor);
      border-radius: 50%;
    .year-wrapper
      padding-left: 0!important;
      a
        display: flex;
        padding: 30px 0 10px;
        list-style: none;
        border-bottom: 1px dashed var(--borderColor);
        position: relative;
        color: var(--textColor)
        transition: all 0.25s ease-in-out;
        .title
          opacity .9
        .date
          min-width: 40px;
          line-height: 30px;
          font-size: 13px;
          margin-right: 5px;
          color: #999;
          &:before
            content: " ";
            position: absolute;
            left: -19px;
            top: 41px;
            width: 6px;
            height: 6px;
            margin-left: -4px;
            background: #fff;
            border-radius: 50%;
            border: 1px solid var(--borderColor);
            z-index: 2;
        &:hover
          text-decoration:none
          color: $accentColor
          .date
            color: $accentColor
          .date:before
            background: $accentColor
</style>
