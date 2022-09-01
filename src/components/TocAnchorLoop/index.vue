<template>
  <n-anchor-link v-for="(anchor, idx) in tocs" :key="idx" :title="anchor.text" :href="'#' + slugify(anchor.href)">
    <template v-if="anchor.child.length > 0">
      <n-anchor-link
        v-for="(anchor2, idx2) in anchor.child"
        :key="idx2"
        :title="anchor2.text"
        :href="'#' + slugify(anchor2.href)"
      >
        <template v-if="anchor2.child.length > 0">
          <n-anchor-link
            v-for="(anchor3, idx3) in anchor2.child"
            :key="idx3"
            :title="anchor3.text"
            :href="'#' + slugify(anchor3.href)"
          >
            <template v-if="anchor3.child.length > 0">
              <n-anchor-link
                v-for="(anchor4, idx4) in anchor3.child"
                :key="idx4"
                :title="anchor4.text"
                :href="'#' + slugify(anchor4.href)"
              >
                <template v-if="anchor4.child.length > 0">
                  <n-anchor-link
                    v-for="(anchor5, idx5) in anchor4.child"
                    :key="idx5"
                    :title="anchor5.text"
                    :href="'#' + slugify(anchor5.href)"
                  >
                    <template v-if="anchor5.child.length > 0">
                      <n-anchor-link
                        v-for="(anchor6, idx6) in anchor5.child"
                        :key="idx6"
                        :title="anchor6.text"
                        :href="'#' + slugify(anchor6.href)"
                      />
                    </template>
                  </n-anchor-link>
                </template>
              </n-anchor-link>
            </template>
          </n-anchor-link>
        </template>
      </n-anchor-link>
    </template>
  </n-anchor-link>
</template>

<script setup lang="ts">
import { remove } from 'diacritics'
type TocAnchorType = {
  i: number
  href: string
  text: string
  child: TocAnchorType[]
}
const props = withDefaults(
  defineProps<{
    tocs: TocAnchorType[]
  }>(),
  {
    tocs: () => {
      return []
    }
  }
)
const { tocs } = toRefs(props)

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
</script>
