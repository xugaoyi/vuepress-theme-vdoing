<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar
      v-if="shouldShowNavbar"
      @toggle-sidebar="toggleSidebar"
    />

    <div
      class="sidebar-mask"
      @click="toggleSidebar(false)"
    ></div>

    <Sidebar
      :items="sidebarItems"
      @toggle-sidebar="toggleSidebar"
      v-show="showSidebar"
    >
      <slot
        name="sidebar-top"
        #top
      />
      <slot
        name="sidebar-bottom"
        #bottom
      />
    </Sidebar>

    <Home v-if="$page.frontmatter.home"/>

    <Page
      v-else
      :sidebar-items="sidebarItems"
    >
      <slot
        name="page-top"
        #top
      />
      <slot
        name="page-bottom"
        #bottom
      />
    </Page>

    <Buttons 
      ref="buttons"
      @toggle-theme-mode="toggleThemeMode"
    />
  </div>
</template>

<script>
import Home from '@theme/components/Home.vue'
import Navbar from '@theme/components/Navbar.vue'
import Page from '@theme/components/Page.vue'
import Sidebar from '@theme/components/Sidebar.vue'
import Buttons from '@theme/components/Buttons.vue'
import { resolveSidebarItems } from '../util'
import storage from 'good-storage' // 本地存储
import _ from 'lodash'

const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl

export default {
  components: { Home, Page, Sidebar, Navbar, Buttons },

  data () {
    return {
      hideNavbar: false,
      isSidebarOpen: true,
      showSidebar: false,
      themeMode: 'light'
    }
  },
  beforeMount(){
    // 引入图标库
    const social = this.$themeConfig.social
    if(social && social.iconfontCssFile ) {
      let linkElm = document.createElement("link")
      linkElm.setAttribute('rel', 'stylesheet');
      linkElm.setAttribute("type", "text/css")
      linkElm.setAttribute("href", social.iconfontCssFile)
      document.head.appendChild(linkElm)
    }
  },
  computed: {
    showRightMenu() {
      const { headers } = this.$page
      return (
        !this.$frontmatter.home
        && headers
        && headers.length
        && this.$frontmatter.sidebar !== false
      )
    },
    shouldShowNavbar () {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (
        frontmatter.navbar === false
        || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title
        || themeConfig.logo
        || themeConfig.repo
        || themeConfig.nav
        || this.$themeLocaleConfig.nav
      )
    },

    shouldShowSidebar () {
      const { frontmatter } = this.$page
      return (
        !frontmatter.home
        && frontmatter.sidebar !== false
        && this.sidebarItems.length
      )
    },

    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },

    pageClasses () {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'hide-navbar': this.hideNavbar, // 向下滚动隐藏导航栏
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar,
          'have-rightmenu': this.showRightMenu,
        },
        'theme-mode-' + this.themeMode,
        userPageClass
      ]
    }
  },
  created() {
    const sidebarOpen = this.$themeConfig.sidebarOpen
    if (sidebarOpen === false) {
      this.isSidebarOpen = sidebarOpen 
    }
  },
  beforeMount() {
    this.isSidebarOpenOfclientWidth()
    const mode = storage.get('mode') // 不放在created是因为vuepress不能在created访问浏览器api，如window
    if(!mode || mode === 'auto') { // 当未切换过模式，或模式处于'跟随系统'时
      this._autoMode()
    } else {
      this.themeMode = mode
    }
  },
  mounted () {
    this.showSidebar = true // 解决移动端初始化页面时侧边栏闪现的问题
    this.$router.afterEach(() => {
      this.isSidebarOpenOfclientWidth()
    })

    // 向下滚动收起导航栏
    let p = 0, t = 0;
    window.addEventListener('scroll', _.throttle(() => {
      if(!this.isSidebarOpen) { // 侧边栏关闭时
        p = this.getScrollTop()
        if(t < p) { // 向下滚动
          this.hideNavbar = true
        } else { // 向上
          this.hideNavbar = false
        }
        setTimeout(() => {t = p},0)
      }
    }, 300))

  },
  watch: {
    isSidebarOpen() {
      if(this.isSidebarOpen) {  // 侧边栏打开时，恢复导航栏显示
        this.hideNavbar = false
      }
    }
  },
  methods: {
    getScrollTop () {
      return window.pageYOffset
        || document.documentElement.scrollTop
        || document.body.scrollTop || 0
    },
    isSidebarOpenOfclientWidth() {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.isSidebarOpen = false
      }
    },
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
      this.$emit('toggle-sidebar', this.isSidebarOpen)
    },
    _autoMode () {
      if(window.matchMedia('(prefers-color-scheme: dark)').matches){ // 系统处于深色模式
        this.themeMode = 'dark'
      } else {
        this.themeMode = 'light'
      }
    },
    toggleThemeMode (key) {
      if(key === 'auto') {
        this._autoMode()
      } else {
        this.themeMode = key
      }
      storage.set('mode', key)
    },
    
    // side swipe
    onTouchStart (e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },

    onTouchEnd (e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    }
  }
}
</script>
