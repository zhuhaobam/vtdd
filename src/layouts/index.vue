<template>
  <n-layout style="height: 100vh" has-sider>
    <n-layout-sider
      :inverted="inverted"
      :collapsed="collapsed"
      collapse-mode="width"
      :collapsed-width="80"
      :width="240"
      :native-scrollbar="false"
      bordered
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <HeadLogo :collapsed="collapsed" />
    </n-layout-sider>
    <n-layout position="absolute" style="top: 64px; width: 240px" :native-scrollbar="false" has-sider>
      <n-layout-sider
        :inverted="inverted"
        :collapsed="collapsed"
        collapse-mode="width"
        :collapsed-width="80"
        :width="240"
        :native-scrollbar="false"
        bordered
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <SideBar />
      </n-layout-sider>
    </n-layout>
    <n-layout>
      <n-layout-header bordered h64>
        <AppHeader v-model:collapsed="collapsed" :inverted="inverted" />
      </n-layout-header>
      <n-layout-header bordered h40>
        <Tags />
      </n-layout-header>
      <n-layout position="absolute" content-style="padding: 24px;" style="top: 104px" :native-scrollbar="false">
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
import { useThemeStore } from '@store/theme'
import { useAppStore } from '@store/app'
import { storeToRefs } from 'pinia'
import AppMain from './components/AppMain.vue'
import Tags from './components/tags/index.vue'
const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
const appStore = useAppStore()
const { collapsed } = storeToRefs(appStore)
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
