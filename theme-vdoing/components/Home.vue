<template>
  <div class="i-body" :style="footerBgImg && `background-image: url(${footerBgImg})`">

    <!-- banner块 s -->
    <div class="banner" :style="homeData.bgImg && `background: url(${$withBase(homeData.bgImg)}) center center / cover no-repeat`">
      <div class="banner-conent" :style="!homeData.features && `padding-top: 7rem`">
        <header class="hero">
          <img v-if="homeData.heroImage" :src="$withBase(homeData.heroImage)" :alt="homeData.heroAlt || 'hero'" />
          <h1 v-if="homeData.heroText !== null" id="main-title">{{ homeData.heroText || $title || 'Hello' }}</h1>
          <p class="description">{{ homeData.tagline || $description || 'Welcome to your VuePress site' }}</p>
          <p class="action" v-if="homeData.actionText && homeData.actionLink">
            <NavLink class="action-button" :item="actionLink" />
          </p>
        </header>

        <!-- PC端features块 s -->
        <div class="features" v-if="homeData.features && homeData.features.length && !isMQMobile">
          <div class="feature" v-for="(feature, index) in homeData.features" :key="index">
            <router-link :to="feature.link">
              <img class="image_title" :src="$withBase(feature.imgUrl)" :alt="feature.title" />
              <h2>{{ feature.title }}</h2>
              <p>{{ feature.details }}</p>
            </router-link>
          </div>
        </div>
        <!-- PC端features块 e -->
      </div>

      <!-- 移动端features块 s -->
      <div class="slide-banner" v-if="homeData.features && homeData.features.length" v-show="isMQMobile">
        <div class="banner-wrapper">
          <div class="slide-banner-scroll" ref="slide">
            <div class="slide-banner-wrapper">
              <div class="slide-item" v-for="(feature, index) in homeData.features" :key="index">
                <router-link :to="feature.link">
                  <img class="image_title" :src="$withBase(feature.imgUrl)" :alt="feature.title" />
                  <h2>{{ feature.title }}</h2>
                  <p>{{ feature.details }}</p>
                </router-link>
              </div>
            </div>
          </div>
          <div class="docs-wrapper">
            <span
              class="doc"
              v-for="(item, index) in homeData.features.length"
              :key="index"
              :class="{'active': currentPageIndex === index}"></span>
          </div>
        </div>
      </div>
      <!-- 移动端features块 e -->
    </div>
    <!-- banner块 e -->

    <div class="main-wrapper">

      <div class="main-left">
        <PostList/>
        <Content class="theme-vdoing-content custom card-box" />
        <!-- <main class="home home-content" aria-labelledby="main-title">
          <UpdateArticle
            pageMark="home"
            :length="updateBarConfig && updateBarConfig.onHome && updateBarConfig.onHome.length || 5"
            :moreArticle="updateBarConfig && updateBarConfig.moreArticle"
            v-if="isShowUpdateBar"
          />
          
        </main> -->
      </div>

      <div class="main-right">
        <aside class="blogger-wrapper card-box" v-if="blogger">
          <div class="avatar">
            <img :src="blogger.avatar" alt="头像" title="我好看吗">
          </div>
          <div class="icons" v-if="social">
            <a
            :href="item.link"
            :title="item.title"
            :class="['iconfont', item.iconClass]"
            v-for="(item, index) in social.icons"
            :key="index"
            :style="{width: 100/social.icons.length + '%'}"
            target="_blank"
            >
            </a>
          </div>
          <div class="blogger">
            <span class="name">{{blogger.name}}</span>
            <span class="slogan">
              {{blogger.slogan}}
            </span>
          </div>
        </aside>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script>
import NavLink from "@theme/components/NavLink";
import BScroll from "@better-scroll/core"
import Slide from "@better-scroll/slide"
import UpdateArticle from '@theme/components/UpdateArticle'
import PostList from '@theme/components/PostList'
import Footer from '@theme/components/Footer'
import { filterPosts, sortPosts, getAllCategoriesAndTags } from '../util/postData'


const MOBILE_DESKTOP_BREAKPOINT = 720 // refer to config.styl

BScroll.use(Slide)

export default {
  data(){
    return {
      isMQMobile: false,
      slide: null,
      currentPageIndex: 0,
      playTimer: 0,
      mark: 0,
      updateBarConfig: null,
      social: null
    }
  },
  created() {
    this.updateBarConfig = this.$themeConfig.updateBar
    this.social = this.$themeConfig.social
    // console.log(filterPosts(this.$site.pages))
    getAllCategoriesAndTags(this.$site.pages)
  },
  beforeMount(){
    this.isMQMobile = window.innerWidth < MOBILE_DESKTOP_BREAKPOINT ? true : false; // vupress在打包时不能在beforeCreate(),created()访问浏览器api（如window）
    
    window.addEventListener('resize', () => {
      this.isMQMobile = window.innerWidth < MOBILE_DESKTOP_BREAKPOINT ? true : false;
      if(this.isMQMobile && !this.slide && !this.mark){
        this.mark++
        setTimeout(() => {
          this.init()
        },60)
      }
    })

    // 引入图标库
    if(this.social && this.social.iconfontCssFile ) {
      let linkElm = document.createElement("link")
      linkElm.setAttribute('rel', 'stylesheet');
      linkElm.setAttribute("type", "text/css")
      linkElm.setAttribute("href", this.social.iconfontCssFile)
      document.head.appendChild(linkElm)
    }
    
  },
  mounted() {
    this.isMQMobile && this.init()
  },
  beforeDestroy() {
    clearTimeout(this.playTimer)
    this.slide && this.slide.destroy()
  },
  methods: {
    init() {
      clearTimeout(this.playTimer)
      this.slide = new BScroll(this.$refs.slide, {
        scrollX: true, // x轴滚动
        scrollY: false, // y轴滚动
        slide: {
          loop: true,
          threshold: 100
        },
        useTransition: true, // 使用css3 transition动画
        momentum: false,
        bounce: false, // 回弹
        stopPropagation: false, // 是否阻止事件冒泡
        probeType: 2,
        preventDefault: false
      })

      // user touches the slide area
      this.slide.on('beforeScrollStart', () => {
        clearTimeout(this.playTimer)
      })
      // user touched the slide done
      this.slide.on('scrollEnd', () => {
        this.autoGoNext()
      })
      this.slide.on('slideWillChange', (page) => {
        this.currentPageIndex = page.pageX
      })
      this.autoGoNext()
    },
    autoGoNext() {
      clearTimeout(this.playTimer)
      this.playTimer = setTimeout(() => {
        this.slide.next()
      }, 4000)
    }
  },

  components: { NavLink, UpdateArticle, PostList, Footer },

  computed: {
    homeData() {
      return {
        ...this.$page.frontmatter,
        base: this.$site.base
      }
    },
    isShowUpdateBar() {
      return this.updateBarConfig && this.updateBarConfig.onHome && this.updateBarConfig.onHome.isShow === false ? false : true
    },
    blogger() {
      return this.$themeConfig.blogger
    },
    footerBgImg() {
      return this.$themeConfig.footer && this.$themeConfig.footer.footerBgImg
    },
    actionLink() {
      return {
        link: this.homeData.actionLink,
        text: this.homeData.actionText
      };
    }
  }
};
</script>

<style lang="stylus">
.i-body
  background bottom no-repeat
  background-color var(--pageBg)
  overflow hidden
  .banner
    width 100%
    min-height 450px
    margin-top $navbarHeight
    background rgb(40,40,45)
    color #fff
    position relative
    overflow hidden
    background-image url(../images/bg-line.png)
    background-size 35px 35px
    .banner-conent
      max-width $homePageWidth
      margin 0px auto
      position relative
      z-index 1
      overflow hidden
      .hero 
        text-align center
        margin-top 3rem
        img
          max-width 100%
          max-height 192px
          display block
          margin 2rem auto 1.5rem
        h1 
          margin 0
          font-size 3.5rem
        .description, .action 
          margin 1.5rem auto

        .description 
          max-width 40rem
          font-size 1.2rem
          line-height 1.3
          color #fff
        .action-button 
          display inline-block
          font-size 1.2rem
          color #fff
          background-color $accentColor
          padding 0.8rem 1.6rem
          border-radius 4px
          transition background-color 0.1s ease
          box-sizing border-box
          border-bottom 1px solid darken($accentColor, 10%)
          &:hover 
            background-color lighten($accentColor, 10%)

      .features 
        padding 2rem 0
        margin-top 2.5rem
        display flex
        flex-wrap wrap
        align-items flex-start
        align-content stretch
        justify-content space-between
      .feature
        flex-grow 1
        flex-basis 30%
        max-width 30%
        text-align center
        .image_title
          width 11rem
          height 11rem
          animation heart 1.2s ease-in-out 0s infinite alternate
          animation-play-state paused
        h2 
          font-weight 500
          font-size 1.3rem
          color #fff
          border-bottom none
          padding-bottom 0
        p
          color #fff
          opacity 0.8
      .feature:hover 
        .image_title 
          animation-play-state: running
        h2,p
          opacity .7
          // color var(--textLightenColor)

    // 移动端滑动图标
    .slide-banner
      margin-top: 2rem;
      .banner-wrapper
        position relative
      .slide-banner-scroll
        min-height 1px
        overflow hidden
      .slide-banner-wrapper
        height 300px
        .slide-item
          display inline-block
          height 300px
          width 100%
          text-align center
          .image_title
            width: 10rem;
            height: 10rem;
          h2
            font-size: 1.1rem;
            color: #fff;
            font-weight: 500;
            border-bottom: none;
            padding-bottom: 0;
          p
            color: #b0b6be;
      .docs-wrapper
        position absolute
        bottom 25px
        left 50%
        transform translateX(-50%)
        .doc
          display inline-block
          margin 0 4px
          width 8px
          height 8px
          border-radius 50%
          background #2F455A
          &.active
            background #517EA9

  .main-wrapper
    margin 2rem auto
    max-width $homePageWidth
    position relative
    display flex
    .main-left
      .card-box
        padding 1rem 1.5rem
        margin-bottom .9rem
      .home-content
        padding 1rem 1.5rem 0
        flex 1
    .main-right
      .card-box
        margin-left .9rem
      .blogger-wrapper
        padding 15px
        height auto
        display inline-table
        .avatar
          width 245px
          height 245px
          overflow hidden
          img
            width 100%
            height 100%
            border-radius 3px
        .icons
          border 1px solid var(--borderColor)
          border-top none
          height 40px
          line-height 40px
          a
            font-size 20px
            width 33%
            color var(--textColor)
            display block
            float left
            text-align center
            opacity .8
            &:hover
              color $accentColor
        .blogger
          margin 15px 0 10px 0
          .name
            font-size 1.4rem
            display: block
            margin-bottom 6px
          .slogan
            color var(--textColor)
  .footer
    background none


@keyframes heart
  from{transform:translate(0,0)}
  to{transform:translate(0,8px)}


@media (max-width: 1025px)
  .i-body
    background-color var(--bg)
    .banner .banner-conent
      .hero
        h1
          font-size 2.5rem
        .description
          font-size 1rem
      .feature
        h2
          font-size 1.1rem
        .image_title
          width 10rem
          height 10rem

  .home-content
    margin 0
    border-radius 0
  
  .main-wrapper >*
    box-shadow none
  
  

@media (max-width: 765px)
 .main-wrapper .blogger-wrapper
    width 200px
    .avatar
      width: 200px
      height: 200px

@media (max-width: $MQMobile) 
  .main-wrapper
    margin 0
    display block
    .blogger-wrapper
      display none
    .home-content
      padding-top 1.5rem

  // 719px
  .banner
    .banner-conent
      .features
        display none
        flex-direction column
        margin-top 0
      .feature 
        max-width 100%
        padding 0 2.5rem
        margin 0 auto
@media (max-width: $MQMobileNarrow) 
  // 419px
  .banner-conent 
    padding-left 1.5rem
    padding-right 1.5rem

    .hero 
      img 
        max-height 210px
        margin 2rem auto 1.2rem
      h1 
        font-size: 2rem
      h1, .description, .action
        margin: 1.2rem auto

      .description 
        font-size: 1.2rem

      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem
    .feature
      h2
        font-size: 1.25rem
</style>
