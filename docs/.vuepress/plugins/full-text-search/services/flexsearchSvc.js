import Flexsearch from 'flexsearch'
import _ from 'lodash'
import { Segment, useDefault } from 'segmentit';

let index = null
let pagesByPath = null

export default {
  buildIndex(pages) {
    const segmentit = useDefault(new Segment());

    let defaultOptions = {
      encode: false,
      async: true,
      tokenize: function(str){
        var result = segmentit.doSegment(str, {
          simple: true
        });

        return result;
      }
    }
    let options = defaultOptions;

    options = {
      ...options,
      doc: {
        id: "key",
        field: ['title', 'headersStr', 'content']
      }
    }

    index = new Flexsearch(options);
    index.add(pages)
    pagesByPath = _.keyBy(pages, 'path')
  },
  async match(queryString, queryTerms, limit = 7) {
    const searchResult = await index.search([
      {
        field: 'title',
        query: queryString,
        limit,
        boost: 10,
      },
      {
        field: 'headersStr',
        query: queryString,
        limit,
        boost: 7,
      },
      {
        field: 'content',
        query: queryString,
        limit,
      },
    ])

    const result = searchResult.map(page => ({
      ...page,
      parentPageTitle: getParentPageTitle(page),
      ...getAdditionalInfo(page, queryString, queryTerms),
    }))

    const resultByParent = _.groupBy(result, 'parentPageTitle')
    return _.values(resultByParent)
      .map(arr =>
        arr.map((x, i) => {
          if (i === 0) return x
          return { ...x, parentPageTitle: null }
        }),
      )
      .flat()
  },
}

function getParentPageTitle(page) {
  const pathParts = page.path.split('/')
  let parentPagePath = '/'
  if (pathParts[1]) parentPagePath = `/${pathParts[1]}/`

  const parentPage = pagesByPath[parentPagePath] || page
  return parentPage.title
}

function getAdditionalInfo(page, queryString, queryTerms) {
  const query = queryString.toLowerCase()
  const match = getMatch(page, query, queryTerms)
  if (!match)
    return {
      headingStr: getFullHeading(page),
      slug: '',
      contentStr: null,
    }

  if (match.headerIndex != null) {
    // header match
    return {
      headingStr: getFullHeading(page, match.headerIndex),
      slug: '#' + page.headers[match.headerIndex].slug,
      contentStr: null,
    }
  }

  // content match
  let headerIndex = _.findLastIndex(page.headers || [], h => h.charIndex != null && h.charIndex < match.charIndex)
  if (headerIndex === -1) headerIndex = null

  return {
    headingStr: getFullHeading(page, headerIndex),
    slug: headerIndex == null ? '' : '#' + page.headers[headerIndex].slug,
    contentStr: getContentStr(page, match),
  }
}

function getFullHeading(page, headerIndex) {
  if (headerIndex == null) return page.title
  const headersPath = []
  while (headerIndex != null) {
    const header = page.headers[headerIndex]
    headersPath.unshift(header)
    headerIndex = _.findLastIndex(page.headers, h => h.level === header.level - 1, headerIndex - 1)
    if (headerIndex === -1) headerIndex = null
  }
  return headersPath.map(h => h.title).join(' > ')
}

function getMatch(page, query, terms) {
  const matches = terms
    .map(t => {
      return getHeaderMatch(page, t) || getContentMatch(page, t)
    })
    .filter(m => m)
  if (matches.length === 0) return null

  if (matches.every(m => m.headerIndex != null)) {
    return getHeaderMatch(page, query) || matches[0]
  }

  return getContentMatch(page, query) || matches.find(m => m.headerIndex == null)
}

function getHeaderMatch(page, term) {
  if (!page.headers) return null
  for (let i = 0; i < page.headers.length; i++) {
    const h = page.headers[i]
    const charIndex = h.title.toLowerCase().indexOf(term)
    if (charIndex === -1) continue
    return {
      headerIndex: i,
      charIndex,
      termLength: term.length,
    }
  }
  return null
}

function getContentMatch(page, term) {
  if (!page.contentLowercase) return null
  const charIndex = page.contentLowercase.indexOf(term)
  if (charIndex === -1) return null

  return { headerIndex: null, charIndex, termLength: term.length }
}

function getContentStr(page, match) {
  const snippetLength = 120
  const { charIndex, termLength } = match

  let lineStartIndex = page.content.lastIndexOf('\n', charIndex)
  let lineEndIndex = page.content.indexOf('\n', charIndex)

  if (lineStartIndex === -1) lineStartIndex = 0
  if (lineEndIndex === -1) lineEndIndex = page.content.length

  const line = page.content.slice(lineStartIndex, lineEndIndex)

  if (snippetLength >= line.length) return line

  const lineCharIndex = charIndex - lineStartIndex

  const additionalCharactersFromStart = (snippetLength - termLength) / 2
  const snippetStart = Math.max(lineCharIndex - additionalCharactersFromStart, 0)
  const snippetEnd = Math.min(snippetStart + snippetLength, line.length)
  let result = line.slice(snippetStart, snippetEnd)
  if (snippetStart > 0) result = '...' + result
  if (snippetEnd < line.length) result = result + '...'
  return result
}
