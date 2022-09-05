<template>
  <n-layout h-screen max-h-screen>
    <Head v-model:collapsed="collapsed" :inverted="inverted" :screen="screen">
      <template #menu>
        <Menu :collapsed="false" :inverted="inverted" :screen="screen" style="width: 220px" />
      </template>
    </Head>
    <n-layout position="absolute" style="top: 64px" has-sider>
      <n-layout-sider
        v-if="screen !== 'xs' && screen !== 's'"
        collapse-mode="width"
        :collapsed-width="96"
        :width="272"
        :collapsed="collapsed"
        :inverted="inverted"
        :native-scrollbar="false"
        bordered
      >
        <Menu :collapsed="collapsed" :inverted="inverted" :screen="screen" />
      </n-layout-sider>
      <n-layout position="static">
        <n-layout :native-scrollbar="false">
          <Tags :screen="screen" @full-screen-do="fullScreenDo" />
        </n-layout>
        <n-layout
          ref="contentRef"
          embedded
          :content-style="'padding:  ' + (screen !== 'xs' && screen !== 's' ? 24 : 12) + 'px;'"
          style="height: calc(100vh - 114px)"
          :native-scrollbar="false"
        >
          <Content />
        </n-layout>
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup name="layoutDefault">
import { useFullscreen } from '@vueuse/core'
import Head from './component/Head/index.vue'
import Menu from './component/Menu/index.vue'
import Content from './component/Content/index.vue'
import Tags from './component/Tags/index.vue'
import { useNewSettingStore } from '@store/new-setting'
import { ComputedRef } from 'vue'
import { useFullStore } from '@store/full'
const newSettingStore = useNewSettingStore()
const fullStore = useFullStore()
// 屏幕大小
const screen = inject<ComputedRef<'s' | 'xs' | 'm' | 'l' | 'xl' | '2xl'>>('provide-screen')
// 使用反转样式
const inverted = computed(() => newSettingStore.headerSetting.mTheme !== null)
// 折叠展开
const collapsed = computed(() => newSettingStore.menuSetting.collapsed)
// 内容区全屏设计,tag通过emit传输全屏点击事件激活全屏
const contentRef = ref<HTMLElement | null>(null)
const { toggle, enter, isFullscreen, isSupported } = useFullscreen(contentRef)

const fullScreenDo = () => {
  if (isSupported) {
    if (isFullscreen.value === true) {
      enter().then(() => {
        fullStore.setPage(isFullscreen.value ? 'inner:true' : 'inner:false')
      })
    } else {
      toggle().then(() => {
        fullStore.setPage(isFullscreen.value ? 'inner:true' : 'inner:false')
      })
    }
  }
}
// 全屏监听特殊处理
onMounted(() => {
  document.addEventListener('fullscreenchange', fullscreenchangeCurrent)
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

onBeforeUnmount(() => {
  document.removeEventListener('fullscreenchange', fullscreenchangeCurrent)
})
</script>
