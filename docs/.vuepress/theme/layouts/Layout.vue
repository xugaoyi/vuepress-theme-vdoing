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
      @toggle-read-mode="toggleReadMode"
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

const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl

export default {
  components: { Home, Page, Sidebar, Navbar, Buttons },

  data () {
    return {
      isSidebarOpen: true,
      showSidebar: false,
      readMode: false
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
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar,
          'have-rightmenu': this.showRightMenu,
          'read-mode': this.readMode
        },
        userPageClass
      ]
    }
  },
  beforeMount() {
    this.isSidebarOpenOfclientWidth()
    if(storage.get('mode')) {
      this.readMode = true
    } 
  },
  mounted () {
    this.showSidebar = true // 解决移动端初始化页面时侧边栏闪现的问题
    this.$router.afterEach(() => {
      this.isSidebarOpenOfclientWidth()
    })
  },

  methods: {
    isSidebarOpenOfclientWidth() {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.isSidebarOpen = false
      }
    },
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
      this.$emit('toggle-sidebar', this.isSidebarOpen)
    },
    toggleReadMode (){
      this.readMode = !this.readMode
      storage.set('mode', this.readMode)
      if (document.documentElement.clientWidth > MOBILE_DESKTOP_BREAKPOINT) {
        this.isSidebarOpen = !this.readMode
      }
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

<style lang="stylus">
  // 阅读模式样式
  .read-mode
    background $readModeColor
    .i-body // 首页
      background-color $readModeColor
      .main-wrapper >*
        background-color lighten($readModeColor, 50%)!important
    .sidebar // 侧边栏
      @media (max-width: $MQNarrow)
        background-color lighten($readModeColor, 30%)!important
    .navbar // 导航栏
      background $readModeColor
      .dropdown-wrapper .nav-dropdown
        background lighten($readModeColor, 50%)
    .suggestions // 搜索结果
      background lighten($readModeColor, 50%)
    .read-mode // 阅读模式按钮
      background lighten($accentColor, 35%)
      color #fff
      &:hover
        color #fff
    tr // 表格
      &:nth-child(2n)
        background-color lighten($readModeColor, 50%)
    // 时间轴页面
    .timeline-wrapper .timeline ul .desc:before, .timeline-wrapper .timeline ul .year:before,.timeline-wrapper .timeline ul .year-wrapper a .date:before
      background-color $readModeColor!important
</style>
