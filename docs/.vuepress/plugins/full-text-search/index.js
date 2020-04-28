const { path } = require('@vuepress/shared-utils')
const htmlToText = require('html-to-text')

module.exports = options => ({
  extendPageData($page) {
    try {
      const { html } = $page._context.markdown.render($page._strippedContent)

      const plaintext = htmlToText.fromString(html, {
        wordwrap: null,
        hideLinkHrefIfSameAsText: true,
        ignoreImage: true,
        uppercaseHeadings: false,
      })

      for (const h of $page.headers || []) {
        const titlePlaintext = $page._context.markdown.renderInline(h.title)
        h.charIndex = plaintext.indexOf(titlePlaintext)
        if (h.charIndex === -1) h.charIndex = null
      }
      $page.headersStr = $page.headers ? $page.headers.map(h => h.title).join(' ') : null
      $page.content = plaintext
      $page.contentLowercase = plaintext.toLowerCase()
    } catch (e) {
      // incorrect markdown
      console.error('Error when applying fulltext-search plugin:', e)
    }
  },
  alias: {
    '@SearchBox': path.resolve(__dirname, 'components/SearchBox.vue'),
  },
})
