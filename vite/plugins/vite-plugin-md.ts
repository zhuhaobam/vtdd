import Markdown from 'vite-plugin-md'
import meta from '@yankeeinlondon/meta-builder'

export default function createMD() {
  return Markdown({
    exposeFrontmatter: true,
    builders: [meta({ routeProps: ['title', 'breadcrumb', 'icon', 'sort'] })]
  })
}
