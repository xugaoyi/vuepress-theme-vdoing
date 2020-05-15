<template>
  <div class="body-bg" :style="`background: url(${bgImg}) center center / cover no-repeat`"></div>
</template>

<script>
import { type } from '../util'
export default {
  data() {
    return {
      bgImg: ''
    }
  },
  created() {
    let { bodyBgImg } = this.$themeConfig

    if (type(bodyBgImg) === 'string') {
      this.bgImg = bodyBgImg
    } else if (type(bodyBgImg) === 'array') {
      let count = 0
      let timer = null

      this.bgImg = bodyBgImg[count]
      clearInterval(timer)
      timer = setInterval(() => {
        if (++count >= bodyBgImg.length ) {
          count = 0
        }
        this.bgImg = bodyBgImg[count]
      }, 15000);
    }
  }
}
</script>

<style lang='stylus'>
.body-bg
  position fixed
  left 0
  top 0
  z-index -999999
  height 100vh
  width 100vw
  transition  background .5s
</style>
