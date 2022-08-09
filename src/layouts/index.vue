<template>
  <n-layout style="height: 100vh" :position="'static'" has-sider>
    <n-layout-sider
      :position="'static'"
      :collapsed="collapsed"
      collapse-mode="width"
      :native-scrollbar="false"
      bordered
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <HeadLogo :collapsed="collapsed" />
      <SideBar />
    </n-layout-sider>
    <n-layout has-sider>
      <n-layout-header bordered position="absolute">
        <AppHeader v-model:collapsed="collapsed" :inverted="false" />
      </n-layout-header>
      <n-layout position="absolute" style="top: 64px" :native-scrollbar="false" bg-gray-400:20>
        <Tags />
      </n-layout>
      <n-layout
        position="absolute"
        content-style="padding: 24px;"
        style="top: 104px; bottom: 64px"
        :native-scrollbar="false"
      >
        <AppMain p24 />
      </n-layout>
    </n-layout>
    <n-layout-footer position="absolute" style="height: 64px; padding: 24px" bordered text-center>
      {{ t('all.footer') }}
    </n-layout-footer>
  </n-layout>
</template>

<script lang="ts" setup name="layoutDefault">
import AppHeader from './components/header/index.vue'
import HeadLogo from './components/header/components/HeadLogo.vue'
import SideBar from './components/sidebar/index.vue'
import { useAppStore } from '@store/app'
import { storeToRefs } from 'pinia'
import AppMain from './components/AppMain.vue'
import Tags from './components/tags/index.vue'
const { t } = useI18n()
const appStore = useAppStore()
const { collapsed } = storeToRefs(appStore)
watch(
  collapsed,
  (newVal, oldVal) => {
    appStore.setToggleCollapsed(newVal)
  },
  { immediate: true, deep: true }
)
</script>

<style lang="scss" scoped>
.n-layout-header {
  height: 60px;
  border-bottom: 1px solid #eee;
}
</style>
