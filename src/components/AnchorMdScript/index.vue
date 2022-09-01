<template>
  <n-layout position="absolute" has-sider>
    <n-layout content-style="padding: 0 24px;" :native-scrollbar="false">
      <slot />
    </n-layout>
    <n-layout-sider width="180px" :content-style="'margin-top:' + top + 'px'" :native-scrollbar="false">
      <n-anchor
        ref="anchorRef"
        listen-to=".markdown-body"
        :trigger-top="24"
        :bound="bound"
        style="z-index: 1"
        :ignore-gap="true"
        :show-rail="false"
        :show-background="true"
        :type="'block'"
      >
        <template v-if="tocAndAnchors.length > 0">
          <toc-anchor-loop :tocs="tocAndAnchors" />
        </template>
      </n-anchor>
    </n-layout-sider>
  </n-layout>
</template>
<script setup lang="ts" name="anchorMdScript">
import { AnchorInst } from 'naive-ui'
import { useFullStore } from '@store/full'
import { useFullscreen } from '@vueuse/core'
const { isFullscreen } = useFullscreen()
const fullStore = useFullStore()
const bound = ref<number>(125)
const top = ref<number>(10)
type TocAnchorType = {
  i: number
  href: string
  text: string
  child: TocAnchorType[]
}
const anchorRef = ref<AnchorInst | null>(null)
const tocAndAnchors = ref<TocAnchorType[]>([])
const currentRoute = useRoute()

const anchorBoundAndTop = (boundV: number, topV: number) => {
  bound.value = boundV
  top.value = topV
}

onMounted(() => {
  document.addEventListener('fullscreenchange', fullscreenchangeCurrent)
  if (fullStore.innerTrue) {
    anchorBoundAndTop(24, 10)
  }
  const tocDiv: HTMLCollectionOf<Element> = document.getElementsByClassName('table-of-contents')
  // 1、将基于markdown-it的md-naiveui-anchor-toc【已经粘贴源码进行改造】排列成自己想要的Element
  // 2、不得已在md【vite-plugin-md支持vue】中嵌入自定义vue页面进行再次转换，换成数据渲染成自己想要的方式
  tocAndAnchors.value = ch(tocDiv[0].childNodes[0].childNodes, 0)
  setTimeout(() => {
    const tocs = tocAndAnchors.value ?? []
    if (tocs.length > 0) {
      if (currentRoute.fullPath.indexOf('#') === -1) {
        anchorRef.value?.scrollTo(tocs[0].href)
      } else {
        anchorRef.value?.scrollTo(currentRoute.hash)
      }
    }
  }, 50)
})

onBeforeUnmount(() => {
  document.removeEventListener('fullscreenchange', fullscreenchangeCurrent)
})

watch(
  () => isFullscreen.value,
  (newVal, oldVal) => {
    if (fullStore.inner && !fullStore.getPage.endsWith(newVal ? 'true' : 'false')) {
      fullStore.setPage(newVal ? 'inner:true' : 'inner:false')
    } else if (fullStore.all && !fullStore.getPage.endsWith(newVal ? 'true' : 'false')) {
      fullStore.setPage(newVal ? 'all:true' : 'all:false')
    }
  }
)

const fullscreenchangeCurrent = () => {
  if (fullStore.inner && !fullStore.getPage.endsWith(isFullscreen.value ? 'true' : 'false')) {
    fullStore.setPage(isFullscreen.value ? 'inner:true' : 'inner:false')
  } else if (fullStore.all && !fullStore.getPage.endsWith(isFullscreen.value ? 'true' : 'false')) {
    fullStore.setPage(isFullscreen.value ? 'all:true' : 'all:false')
  }
}

watch(
  () => fullStore.getPage,
  (newVal, oldVal) => {
    if (fullStore.innerTrue) {
      anchorBoundAndTop(24, 10)
    } else {
      anchorBoundAndTop(125, 10)
    }
  }
)

function ch(childrenLi: NodeListOf<ChildNode>, i: number): TocAnchorType[] {
  const tocAndAnchor: TocAnchorType[] = []
  if (childrenLi.length > 0) {
    for (let index = 0; index < childrenLi.length; index++) {
      const current = childrenLi[index]
      const aLi = current.firstChild
      const aOl = current.lastChild
      let child: TocAnchorType[] = []
      if (aOl) {
        child = ch(aOl.childNodes, i + 1)
      }
      if (aLi?.nodeName === 'A') {
        const temp = aLi as HTMLAnchorElement
        const hrefText = temp.href
        tocAndAnchor.push({
          i: i,
          href: decodeURI(hrefText.slice(hrefText.lastIndexOf('#'), hrefText.length)),
          text: aLi.textContent ?? '',
          child: child
        })
      }
    }
  }
  return tocAndAnchor
}
</script>
<style lang="scss" scoped></style>
