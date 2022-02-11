<template>
  <div class="theme-container">
    <div class="theme-vdoing-content">
      <span>404</span>
      <blockquote>{{ getMsg() }}</blockquote>
      <router-link to="/">返回首页</router-link>
    </div>
  </div>
</template>


<script type="text/javascript" src="https://www.qq.com/404/search_children.js"
charset="utf-8" homePageUrl=""
homePageName="回到我的主页">
<style lang="stylus" scoped>
.theme-vdoing-content
  margin 3rem auto
  padding 1.5rem
  span
    font-size 6rem
    color $accentColor
</style>
