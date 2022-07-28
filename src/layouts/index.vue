<template>
  <n-layout style="height: 100vh" :position="'static'" has-sider>
    <n-layout-header bordered position="absolute">
      <Header v-model:collapsed="collapsed" :inverted="false" />
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
        <RouterView v-slot="{ Component }">
          <component :is="Component" />
        </RouterView>
      </n-layout>
    </n-layout>
    <n-layout-footer position="absolute" style="height: 64px; padding: 24px" bordered text-center>
      {{ t('foo') }}
    </n-layout-footer>
  </n-layout>
</template>

<script lang="ts" setup>
import Header from './components/header/index.vue'
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
  border-bottom: 1px solid #eee;
}
</style>
