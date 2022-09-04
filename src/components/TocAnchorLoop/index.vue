<template>
  <n-anchor-link v-for="(anchor, idx) in tocs" :key="idx" :title="anchor.text" :href="slugify(anchor.href)">
    <template v-if="anchor.child.length > 0">
      <toc-anchor-loop-item :path="path" :tocs="anchor.child" />
    </template>
  </n-anchor-link>
</template>

<script setup lang="ts">
import TocAnchorLoopItem from './index.vue'
import { remove } from 'diacritics'
type TocAnchorType = {
  i: number
  href: string
  text: string
  child: TocAnchorType[]
}
const props = withDefaults(
  defineProps<{
    path: string
    tocs: TocAnchorType[]
  }>(),
  {
    path: '',
    tocs: () => {
      return []
    }
  }
)
const { path, tocs } = toRefs(props)

// eslint-disable-next-line no-control-regex
const rControl = /[\u0000-\u001F]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g
const slugify = (str: string): string => {
  return (
    path.value +
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
</script>
