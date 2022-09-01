<template>
  <n-layout style="height: 100vh" has-sider>
    <div style="position: relative">
      <n-layout-sider
        v-if="logoTheme.visible"
        :inverted="inverted"
        :collapsed="collapsed"
        collapse-mode="width"
        :native-scrollbar="false"
        :collapsed-width="menuTheme.collapsedWidth"
        :width="menuTheme.width"
        :style="
          'height:' +
          logoTheme.height +
          'px;border-bottom:1px solid  var(--n-border-color);border-right:1px solid  var(--n-border-color);'
        "
      >
        <HeadLogo :style="'height:' + (logoTheme.height - 1) + 'px;'" :collapsed="collapsed" />
      </n-layout-sider>
      <n-layout-sider
        :inverted="inverted"
        :collapsed="collapsed"
        collapse-mode="width"
        :collapsed-width="menuTheme.collapsedWidth"
        :width="menuTheme.width"
        :native-scrollbar="false"
        bordered
        :style="'height: calc(100vh - ' + (logoTheme.visible ? menuTheme.top : 0) + 'px);'"
      >
        <SideBar
          :collapsed-width="menuTheme.collapsedWidth"
          :collapsed-icon-size="menuTheme.collapsedIconSize"
          :icon-size="menuTheme.iconSize"
          :indent="menuTheme.indent"
          :root-indent="menuTheme.rootIndent"
          :style="'width:' + (collapsed ? menuTheme.collapsedWidth : menuTheme.width) + 'px;'"
        />
      </n-layout-sider>
    </div>
    <n-layout>
      <n-layout-header bordered :style="'height:' + headerTheme.height + 'px'">
        <AppHeader v-model:collapsed="collapsed" :inverted="inverted" />
      </n-layout-header>
      <n-layout-header bordered :style="'height:' + tagTheme.height + 'px'">
        <Tags @full-screen-do="fullScreenDo" />
      </n-layout-header>
      <n-layout
        ref="amRef"
        position="absolute"
        content-style="padding: 0px;"
        :style="'top: ' + mainTheme.top + 'px'"
        :native-scrollbar="false"
      >
        <AppMain />
      </n-layout>
    </n-layout>
    <!-- <n-layout-footer :inverted="inverted" position="absolute" style="height: 64px; padding: 24px" bordered text-center >
      {{ $t('all.footer') }}
    </n-layout-footer> -->
  </n-layout>
</template>

<script lang="ts" setup name="layoutDefault">
import AppHeader from './components/header/index.vue'
import HeadLogo from './components/header/components/HeadLogo.vue'
import SideBar from './components/sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import Tags from './components/tags/index.vue'
import { useFullStore } from '@store/full'
import { useThemeStore } from '@store/theme'
import { useAppStore } from '@store/app'
import { storeToRefs } from 'pinia'
import { useFullscreen } from '@vueuse/core'
const amRef = ref<HTMLElement | null>(null)
const { toggle, enter, isFullscreen } = useFullscreen(amRef)
const fullStore = useFullStore()
const themeStore = useThemeStore()
const { theme, headerTheme, tagTheme, mainTheme, menuTheme, logoTheme } = storeToRefs(themeStore)
const appStore = useAppStore()
const { collapsed } = storeToRefs(appStore)

const fullScreenDo = () => {
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
watch(
  collapsed,
  (newVal, oldVal) => {
    appStore.setToggleCollapsed(newVal)
  },
  { immediate: true, deep: true }
)
// 使用反转样式
const inverted = ref(theme !== null)
watch(
  theme,
  (newVal, oldVal) => {
    inverted.value = newVal !== null
  },
  { immediate: true, deep: true }
)
</script>

<style lang="scss" scoped>
// .n-layout-header {
//   height: 60px;
//   border-bottom: 1px solid #eee;
// }
</style>
