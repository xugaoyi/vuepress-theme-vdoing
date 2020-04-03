<template>
  <div class="i-body" :style="'background-image: url('+ footerBgImg || '' +')'">
    <div class="banner">
      <main class="home">
        <header class="hero">
          <img v-if="data.heroImage" :src="$withBase(data.heroImage)" :alt="data.heroAlt || 'hero'" />
          <h1 v-if="data.heroText !== null" id="main-title">{{ data.heroText || $title || 'Hello' }}</h1>
          <p class="description">{{ data.tagline || $description || 'Welcome to your VuePress site' }}</p>
          <p class="action" v-if="data.actionText && data.actionLink">
            <NavLink class="action-button" :item="actionLink" />
          </p>
        </header>

        <!-- PC端features块 s -->
        <div class="features" v-if="data.features && data.features.length && !isMQMobile">
          <div class="feature" v-for="(feature, index) in data.features" :key="index">
            <router-link :to="$withBase(feature.link)">
              <img class="image_title" :src="$withBase(feature.imgUrl)" :alt="feature.title" />
              <h2>{{ feature.title }}</h2>
              <p>{{ feature.details }}</p>
            </router-link>
          </div>
        </div>
        <!-- PC端features块 e -->
      </main>

      <!-- 移动端slide s -->
      <div class="slide-banner" v-if="data.features && data.features.length" v-show="isMQMobile">
        <div class="banner-wrapper">
          <div class="slide-banner-scroll" ref="slide">
            <div class="slide-banner-wrapper">
              <div class="slide-item" v-for="(feature, index) in data.features" :key="index">
                <router-link :to="$withBase(feature.link)">
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
              v-for="(item, index) in data.features.length"
              :key="index"
              :class="{'active': currentPageIndex === index}"></span>
          </div>
        </div>
      </div>
      <!-- 移动端slide e -->

    </div>


    <div class="main-wrapper">
      <main class="home home-content" aria-labelledby="main-title">
        <UpdateArticle pageMark="home" />
        <Content class="theme-vdoing-content custom" />
      </main>

      <aside class="info-wrapper" v-if="blogger">
        <div class="avatar">
          <img :src="blogger.avatar" alt="头像">
        </div>
        <div class="icons" v-if="blogger.social">
          <a
           :href="item.link"
           :title="item.title"
           :class="['iconfont', item.iconClass]"
           v-for="(item, index) in blogger.social.icons"
           :key="index"
           :style="{width: 100/blogger.social.icons.length + '%'}"
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
    
    <Footer />
  </div>
</template>

<script>
import NavLink from "@theme/components/NavLink.vue";
import BScroll from "@better-scroll/core"
import Slide from "@better-scroll/slide"
import UpdateArticle from './UpdateArticle.vue'
import Footer from './Footer.vue'

BScroll.use(Slide)

export default {
  data(){
    return {
      isMQMobile: false,
      slide: null,
      currentPageIndex: 0,
      playTimer: 0,
      mark: 0
    }
  },
  beforeMount(){
    this.isMQMobile = window.innerWidth < 720 ? true : false; // vupress在打包时不能在beforeCreate(),created()访问浏览器api（如window）
    
    window.addEventListener('resize', () => {
      this.isMQMobile = window.innerWidth < 720 ? true : false;
      if(this.isMQMobile && !this.slide && !this.mark){
        this.mark++
        setTimeout(() => {
          this.init()
        },60)
      }
    })

    // 引入图标库
    if(this.blogger && this.blogger.social && this.blogger.social.iconfontCssFile ) {
      let linkElm = document.createElement("link")
      linkElm.setAttribute('rel', 'stylesheet');
      linkElm.setAttribute("type", "text/css")
      linkElm.setAttribute("href", this.blogger.social.iconfontCssFile)
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

  components: { NavLink, UpdateArticle, Footer },

  computed: {
    data() {
      return this.$page.frontmatter;
    },
    blogger() {
      return this.$themeConfig.blogger
    },
    footerBgImg() {
      return this.$themeConfig.footer && this.$themeConfig.footer.footerBgImg
    },
    actionLink() {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      };
    }
  }
};
</script>

<style lang="stylus">
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

.i-body
  background bottom no-repeat
  // background-color var(--homeBg)
  background-color rgba(220,220,220,0.1)
  overflow hidden
.banner
  width 100%
  // background #1F2837
  background rgb(40,40,45)
  color #fff
  position relative
  overflow hidden
  background-image url(../images/bg-line.png)
  background-size 35px 35px
  .home
    background none
    position relative
    z-index 1
    .hero
      h1
        font-size 3.5rem
        margin: 3.5rem auto 1.8rem auto
      .description
        font-size 1.2rem
        color #fff
    .features
      border-top none
    .feature 
      h2
        font-size 1.3rem
        color #fff
      p
        color #B0B6BE

body .main-wrapper
  margin 2rem auto
  max-width 1080px
  position relative
  display flex
  >*
    border-radius 5px
    background var(--bg)
    box-shadow 0 1px 2px 0 rgba(0,0,30,.1), 0 2px 4px 0 rgba(0,0,0,.1)
  
  .home-content
    padding 1rem 1.5rem 0
    flex 1
  .info-wrapper
    width 260px
    padding 15px
    height auto
    margin-left 10px
    display inline-table
    .avatar
      width 260px
      height 260px
      overflow hidden
      img
        width 100%
        height 100%
        border-radius 3px
    .icons
      border 1px solid var(--borderColor)
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
        font-size 24px
        display: block
        margin-bottom 10px
      .slogan
        color var(--textColor)


.home
  padding $navbarHeight 2rem 0
  max-width 1080px
  margin 0px auto
  display block

  .hero 
    text-align center
    img
      max-width 100%
      max-height 192px
      display block
      margin 2rem auto 1.5rem
    h1 
      font-size 3rem
    h1, .description, .action 
      margin 1.8rem auto

    .description 
      max-width 40rem
      font-size 1.4rem
      line-height 1.3
      color var(--textLightenColor)
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
    border-top 1px solid var(--borderColor)
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
      border-bottom none
      padding-bottom 0
  .feature:hover 
    .image_title 
      animation-play-state: running
    h2
      color var(--textColor)
    p
      color var(--textLightenColor)

@keyframes heart
  from{transform:translate(0,0)}
  to{transform:translate(0,8px)}


@media (max-width: 1025px)
  .i-body
    background-color var(--bg)
  
  body .home-content
    margin 0
    border-radius 0
  
  body .main-wrapper >*
    box-shadow none
  
  .banner .home
    .hero h1
      font-size 2.5rem
    .feature h2
      font-size 1.1rem
    .hero .description
      font-size 1rem
  .home .feature .image_title
    width 10rem
    height 10rem

@media (max-width: 765px)
  body .main-wrapper .info-wrapper
    width 200px
    .avatar
      width: 200px
      height: 200px

@media (max-width: $MQMobile) 
  body .main-wrapper
    margin 0
    display block
    .info-wrapper
      display none
    .home-content
      padding-top 1.5rem

  // 719px
  .banner
    min-height 517px
    .home .hero h1
      margin 1.8rem auto
  .home
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
  .home 
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
