<template>
  <div class="theme-container">
    <div class="theme-default-content">
      <h1>404</h1>
      <blockquote>{{ getMsg() }}</blockquote>
      <router-link to="/">返回首页 →</router-link>
    </div>
  </div>
</template>

<script>
const msgs = [
  `这里什么都没有。`,
  `我是谁？我在哪？`,
  `这是一个Four-Oh-Four.`,
  `看来我们的链接坏掉了~`
]

export default {
  methods: {
    getMsg () {
      return msgs[Math.floor(Math.random() * msgs.length)]
    }
  }
}
</script>
