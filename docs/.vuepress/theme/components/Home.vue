<template>
  <div class="i-body" :style="'background-image: url('+ data.footer.bgImg +')'">


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
            <router-link :to="$withBase(feature.url)">
              <img class="image_title" :src="$withBase(feature.imgname)" :alt="feature.title" />
              <h2>{{ feature.title }}</h2>
              <p>{{ feature.details }}</p>
            </router-link>
          </div>
        </div>
        <!-- PC端features块 s -->
      </main>

      <!-- 移动端slide s -->
        <div class="slide-banner" v-if="data.features && data.features.length" v-show="isMQMobile">
          <div class="banner-wrapper">
            <div class="slide-banner-scroll" ref="slide">
              <div class="slide-banner-wrapper">
                <div class="slide-item" v-for="(feature, index) in data.features" :key="index">
                  <router-link :to="$withBase(feature.url)">
                    <img class="image_title" :src="$withBase(feature.imgname)" :alt="feature.title" />
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


    <main class="home home-content" aria-labelledby="main-title">
      <!-- <header class="hero">
        <img v-if="data.heroImage" :src="$withBase(data.heroImage)" :alt="data.heroAlt || 'hero'" />

        <h1 v-if="data.heroText !== null" id="main-title">{{ data.heroText || $title || 'Hello' }}</h1>

        <p class="description">{{ data.tagline || $description || 'Welcome to your VuePress site' }}</p>

        <p class="action" v-if="data.actionText && data.actionLink">
          <NavLink class="action-button" :item="actionLink" />
        </p>
      </header>

      <div class="features" v-if="data.features && data.features.length">
        <div class="feature" v-for="(feature, index) in data.features" :key="index">
          <a :href="$withBase(feature.url)">
            <img class="image_title" :src="$withBase(feature.imgname)" :alt="feature.title" />
            <h2>{{ feature.title }}</h2>
            <p>{{ feature.details }}</p>
          </a>
        </div>
      </div> -->
      <Article pageMark="home" />
      <Content class="theme-default-content custom" />
    </main>
    <div class="footer" v-if="data.footer">Copyright © {{ data.footer.year }}-{{ new Date().getFullYear() }} {{ data.footer.content }}</div>
  </div>
</template>

<script>
import NavLink from "@theme/components/NavLink.vue";
import BScroll from "@better-scroll/core"
import Slide from "@better-scroll/slide"
import Article from './Article.vue'

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
  created() {
    //vupress在打包时不能在beforeCreate(),created()内访问浏览器api（如window）
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

  },
  mounted() {
    this.isMQMobile && this.init()
  },
  beforeDestroy() {
    clearTimeout(this.playTimer)
    this.slide.destroy()
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

  components: { NavLink, Article },

  computed: {
    data() {
      return this.$page.frontmatter;
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

.i-body{
  background #f3f7fa bottom no-repeat
  overflow hidden
}
.banner{
  width 100%
  background #1F2837
  color #fff
  .home{
    background none
    .hero{
      h1{
        font-size 3.5rem
        margin: 3.5rem auto 1.8rem auto;
      }
      .description{
        font-size 1.2rem
        color #fff
      }
    }
    .features{
      border-top none
    }
    .feature {
      h2{
        font-size 1.3rem
        color #fff
      }
      p{
        color #B0B6BE
      }
    }
  }
}
body .home-content{
  background #fff;
  padding 1rem 2rem 0;
  margin 2rem auto;
  border-radius 10px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.1), 0 2px 4px 0 rgba(0,0,0,.1);
}


.home {
  padding: $navbarHeight 2rem 0;
  max-width: 960px;
  margin: 0px auto;
  display: block;

  .hero {
    text-align: center;
    img {
      max-width: 100%;
      max-height: 192px;
      display: block;
      margin: 2rem auto 1.5rem;
    }

    h1 {
      font-size: 3rem;
    }

    h1, .description, .action {
      margin: 1.8rem auto;
    }

    .description {
      max-width: 40rem;
      font-size: 1.4rem;
      line-height: 1.3;
      // color: lighten($textColor, 40%);
      color: lighten($textColor, 20%);
    }

    .action-button {
      display: inline-block;
      font-size: 1.2rem;
      color: #fff;
      background-color: $accentColor;
      padding: 0.8rem 1.6rem;
      border-radius: 4px;
      transition: background-color 0.1s ease;
      box-sizing: border-box;
      border-bottom: 1px solid darken($accentColor, 10%);

      &:hover {
        background-color: lighten($accentColor, 10%);
      }
    }
  }

  .features {
    border-top: 1px solid $borderColor;
    padding: 2rem 0;
    margin-top: 2.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: stretch;
    justify-content: space-between;
  }

  .feature {
    flex-grow: 1;
    flex-basis: 30%;
    max-width: 30%;
    text-align: center;

    .image_title {
      width: 12rem;
      height: 12rem;
      transition: all .3s;
    }

    h2 {
      font-size: 1.4rem;
      font-weight: 500;
      border-bottom: none;
      padding-bottom: 0;
      color: lighten($textColor, 10%);
    }

    p {
      color: lighten($textColor, 25%);
    }
  }

  .feature:hover {
    .image_title {
      transform:scale(1.1,1.1)
    }
  }
}

.footer {
  padding: 2.5rem;
  margin-bottom 2rem;
  text-align: center;
  color: lighten($textColor, 25%);
}


@media (max-width: 1025px){
  //959px
  .i-body{
    background-color: #fff;
  }
  body .home-content{
    margin: 0;
    border-radius: 0;
  }
  .banner .home{
    .hero h1{
      font-size: 2.5rem;
    }
    .feature h2{
      font-size: 1.1rem;
    }
    .hero .description{
      font-size: 1rem;
    }
  }
  .home .feature .image_title{
    width: 10rem;
    height: 10rem;
  }
}

@media (max-width: $MQMobile) {
  // 719px
  .banner{
    min-height 517px
    .home .hero h1{
      margin: 1.8rem auto;
    }
  }
  .home {
    .features {
      display none
      flex-direction: column;
      margin-top: 0;
    }

    .feature {
      max-width: 100%;
      padding: 0 2.5rem;
      margin: 0 auto;
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  // 419px
  .home {
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    .hero {
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        font-size: 2rem;
      }

      h1, .description, .action {
        margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .feature {
      h2 {
        font-size: 1.25rem;
      }
    }
  }
}
</style>
