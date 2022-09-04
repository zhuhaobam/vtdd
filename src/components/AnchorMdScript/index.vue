<template>
  <n-layout position="absolute" has-sider style="min-height: calc(100vh - 162px)">
    <n-layout content-style="padding: 0 24px;" :native-scrollbar="false">
      <slot />
      <n-back-top :right="220" :visibility-height="300" />
    </n-layout>
    <n-layout-sider
      width="180px"
      :content-style="'margin-top:' + (fullPage === 'inner:true' ? 8 : 18) + 'px;padding-right:20px;'"
      :native-scrollbar="false"
    >
      <n-anchor
        ref="anchorRef"
        listen-to=".markdown-body"
        :trigger-top="24"
        :bound="fullPage === 'inner:true' ? 30 : 147"
        style="z-index: 1"
        :ignore-gap="true"
        :show-rail="false"
        :show-background="true"
        :type="'block'"
      >
        <template v-if="tocAndAnchors.length > 0">
          <toc-anchor-loop :path="path" :tocs="tocAndAnchors" />
        </template>
      </n-anchor>
    </n-layout-sider>
  </n-layout>
</template>
<script setup lang="ts" name="anchorMdScript">
import { AnchorInst } from 'naive-ui'
import { useFullStore } from '@store/full'
const fullStore = useFullStore()
// 通过fullscreenchange-》EventListener以及两个全屏图标事件串联获得fullPage页面最终全屏状态
const fullPage = computed(() => fullStore.getPage)
type TocAnchorType = {
  i: number
  href: string
  text: string
  child: TocAnchorType[]
}
const anchorRef = ref<AnchorInst | null>(null)
const tocAndAnchors = ref<TocAnchorType[]>([])
const currentRoute = useRoute()
//  hash模式锚点特殊处理
const path = ref<string>(import.meta.env.VTDD_APP_ROUTER_HASH === 'true' ? '#' + currentRoute.path + '#' : '#')

onMounted(() => {
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
