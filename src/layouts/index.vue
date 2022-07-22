<template>
  <n-layout style="height: 100vh">
    <n-layout-header bordered position="absolute">
      <AppHeader />
    </n-layout-header>
    <n-layout position="absolute" style="top: 64px; bottom: 64px" has-sider>
      <n-layout-sider
        v-show="collapsed"
        content-style="padding: 24px;background-color: purple;"
        :native-scrollbar="false"
        bordered
      >
        <SideBar />
      </n-layout-sider>
      <n-layout content-style="padding: 24px;" :native-scrollbar="false">
        <RouterView v-slot="{ Component }">
          <component :is="Component" />
        </RouterView>
      </n-layout>
    </n-layout>
    <n-layout-footer
      position="absolute"
      style="height: 64px; padding: 24px; background-color: blanchedalmond"
      bordered
      text-center
    >
      {{ t('foo') }}
    </n-layout-footer>
  </n-layout>
</template>

<script lang="ts" setup>
import AppHeader from './components/header/index.vue'
import SideBar from './components/sidebar/index.vue'
import { useAppStore } from '@store/app'

import { storeToRefs } from 'pinia'
const { t } = useI18n()
const appStore = useAppStore()
const { collapsed } = storeToRefs(appStore)
</script>

<style lang="scss" scoped>
.n-layout-header {
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}
</style>
