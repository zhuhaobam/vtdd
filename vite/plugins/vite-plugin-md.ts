import Markdown from 'vite-plugin-md'
import code from '@yankeeinlondon/code-builder'
import link from '@yankeeinlondon/link-builder'
import meta from '@yankeeinlondon/meta-builder'
import anchor from 'markdown-it-anchor'
import toc from 'markdown-it-toc-done-right'
const MarkdownIt = require('markdown-it')
const mdh = new MarkdownIt()
const hljs = require('highlight.js')
const linkAttributes = require('markdown-it-link-attributes')
import { remove } from 'diacritics'
// eslint-disable-next-line no-control-regex
const rControl = /[\u0000-\u001F]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g
const slugify = (str: string): string => {
  return (
    remove(str)
      // Remove control characters
      .replace(rControl, '')
      // Replace special characters
      .replace(rSpecial, '-')
      // Remove continuos separators
      .replace(/-{2,}/g, '-')
      // Remove prefixing and trailing separtors
      .replace(/^-+|-+$/g, '')
      // ensure it doesn't start with a number (#121)
      .replace(/^(\d)/, '_$1')
      // lowercase
      .toLowerCase()
  )
}
export default function createMD() {
  return Markdown({
    builders: [link(), code(), meta({ routeProps: ['title', 'breadcrumb', 'noi18n', 'icon', 'sort', 'padding'] })],
    markdownItOptions: {
      html: true,
      linkify: true,
      typographer: true,
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return (
              '<pre class="hljs"><code>' +
              hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
              '</code></pre>'
            )
          } catch (__) {
            // nothing
          }
        }
        return '<pre class="hljs"><code>' + mdh.utils.escapeHtml(str) + '</code></pre>'
      }
    },
    markdownItSetup(md) {
      // 将锚链接添加到H[x]标记
      md.use(anchor, { slugify })
      md.use(linkAttributes, {
        matcher: (link: string) => /^https?:\/\//.test(link),
        attrs: {
          target: '_blank',
          rel: 'noopener'
        }
      })
      md.use(toc, {
        includeLevel: [1, 2, 3],
        slugify
      })
    }
  })
}
