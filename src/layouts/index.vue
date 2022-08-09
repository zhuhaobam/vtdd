<template>
  <n-layout style="height: 100vh" :position="'static'" has-sider>
    <n-layout-header bordered position="absolute">
      <AppHeader v-model:collapsed="collapsed" :inverted="false" />
    </n-layout-header>
    <n-layout position="absolute" style="top: 64px; bottom: 64px" has-sider>
      <n-layout-sider
        :position="'static'"
        :collapsed="collapsed"
        collapse-mode="width"
        :native-scrollbar="false"
        bordered
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <SideBar />
      </n-layout-sider>
      <n-layout content-style="padding: 24px;" :native-scrollbar="false">
        <AppMain />
      </n-layout>
    </n-layout>
    <n-layout-footer position="absolute" style="height: 64px; padding: 24px" bordered text-center>
      {{ t('all.footer') }}
    </n-layout-footer>
  </n-layout>
</template>

<script lang="ts" setup name="layoutDefault">
import AppHeader from './components/header/index.vue'
import SideBar from './components/sidebar/index.vue'
import { useAppStore } from '@store/app'
import { storeToRefs } from 'pinia'
import AppMain from './components/AppMain.vue'
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
