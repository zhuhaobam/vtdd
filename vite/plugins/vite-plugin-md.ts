import Markdown from 'vite-plugin-md'
import code from '@yankeeinlondon/code-builder'
import link from '@yankeeinlondon/link-builder'
import meta from '@yankeeinlondon/meta-builder'
import anchor from 'markdown-it-anchor'
import toc from 'markdown-it-toc-done-right'
const attribution = require('markdown-it-attribution')
const linkAttributes = require('markdown-it-link-attributes')
import prism from 'markdown-it-prism'
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
      typographer: true
    },
    markdownItSetup(md) {
      // 将锚链接添加到H[x]标记
      md.use(anchor, { slugify })
      md.use(prism, {
        highlightInlineCode: true,
        defaultLanguage: 'java'
      })
      // 生成TOC目录，由于自定义锚点目录，将生成的目录隐藏，并将目录数据读取处理拼接成自己需要的方式
      md.use(toc, {
        includeLevel: [1, 2, 3],
        slugify
      })
      md.use(attribution, {
        classNameContainer: 'bg-grey',
        classNameAttribution: 'c-quote__attribution',
        marker: '--',
        removeMarker: false
      })
      // 链接处理
      md.use(linkAttributes, {
        matcher: (link: string) => /^https?:\/\//.test(link),
        attrs: {
          target: '_blank',
          rel: 'noopener'
        }
      })
    }
  })
}
