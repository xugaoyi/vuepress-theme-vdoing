<template>
  <div class="page-edit">
    <div class="edit-link" v-if="editLink">
      <a :href="editLink" target="_blank" rel="noopener noreferrer">{{
        editLinkText
      }}</a>
      <OutboundLink />
    </div>

    <div class="tags" v-if="$themeConfig.tag !== false && tags && tags[0]">
      <router-link
        :to="`/tags/?tag=${encodeURIComponent(item)}`"
        v-for="(item, index) in tags"
        :key="index"
        title="标签"
        >#{{ item }}</router-link
      >
    </div>

    <div class="last-updated" v-if="lastUpdated">
      <span class="prefix">{{ lastUpdatedText }}:</span>
      <span class="time">{{ lastUpdated }}</span>
    </div>
  </div>
</template>
<script>
import isNil from 'lodash/isNil'
import { endingSlashRE, outboundRE } from '../util'

export default {
  name: 'PageEdit',
  computed: {
    tags () {
      return this.$frontmatter.tags
    },

    lastUpdated () {
      return this.$page.lastUpdated
    },

    lastUpdatedText () {
      if (typeof this.$themeLocaleConfig.lastUpdated === 'string') {
        return this.$themeLocaleConfig.lastUpdated
      }
      if (typeof this.$site.themeConfig.lastUpdated === 'string') {
        return this.$site.themeConfig.lastUpdated
      }
      return 'Last Updated'
    },

    editLink () {
      const showEditLink = isNil(this.$page.frontmatter.editLink)
        ? this.$site.themeConfig.editLinks
        : this.$page.frontmatter.editLink

      const {
        repo,
        docsDir = '',
        docsBranch = 'master',
        docsRepo = repo
      } = this.$site.themeConfig

      if (showEditLink && docsRepo && this.$page.relativePath) {
        return this.createEditLink(
          repo,
          docsRepo,
          docsDir,
          docsBranch,
          this.$page.relativePath
        )
      }
      return null
    },

    editLinkText () {
      return (
        this.$themeLocaleConfig.editLinkText
        || this.$site.themeConfig.editLinkText
        || `Edit this page`
      )
    }
  },

  methods: {
    createEditLink (repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/
      if (bitbucket.test(docsRepo)) {
        const base = docsRepo
        return (
          base.replace(endingSlashRE, '')
          + `/src`
          + `/${docsBranch}/`
          + (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '')
          + path
          + `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        )
      }

      const gitlab = /gitlab.com/
      if (gitlab.test(docsRepo)) {
        const base = docsRepo
        return (
          base.replace(endingSlashRE, '')
          + `/-/edit`
          + `/${docsBranch}/`
          + (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '')
          + path
        )
      }
      
      // https://gitee.com/-/ide/project/xxx/xxx/edit/master/-/xxxx
      const gitee = /gitee.com/
      if (gitee.test(docsRepo)) {
        const base = docsRepo
        return (
            base.replace(gitee, 'gitee.com/-/ide/project')
            + `/edit`
            + `/${docsBranch}/-/`
            + (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '')
            + path
        )
      }

      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`
      return (
        base.replace(endingSlashRE, '')
        + `/edit`
        + `/${docsBranch}/`
        + (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '')
        + path
      )
    }
  }
}
</script>
<style lang="stylus">
@require '../styles/wrapper.styl'

.page-edit
  @extend $wrapper
  padding-top 1rem
  padding-bottom 1rem
  overflow auto
  .edit-link
    display inline-block
    float left
    margin 0 2rem 0.5rem 0
    a
      margin-right 0.25rem
  .tags
    float left
    a
      margin 0 0.8rem 0.5rem 0
      display inline-block
      color var(--textLightenColor)
      padding 0.2rem 0.7rem
      font-size 0.9em
      background-color rgba(128, 128, 128, 0.08)
      border-radius 3px
      opacity 0.8
  .last-updated
    float right
    font-size 0.9em
    .prefix
      font-weight 500
      color var(--textColor)
      opacity 0.8
    .time
      font-weight 400
      color #aaa
@media (max-width $MQMobile)
  .page-edit
    .edit-link, .tags
      margin-bottom 0.5rem
    .last-updated
      width 100%
      font-size 0.8em
      text-align left
</style>
