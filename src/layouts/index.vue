<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <n-global-style />
    <n-layout style="height: 100vh">
      <n-layout-header
        bordered
        position="absolute"
        :class="[appStore.collapsed ? 'w-sidebar--collapsed' : 'w-sidebar']"
      >
        <AppHeader />
      </n-layout-header>
      <n-layout position="absolute" style="top: 64px; bottom: 64px" has-sider>
        <n-layout-sider content-style="padding: 24px;" :native-scrollbar="false" bordered>
          <SideBar />
        </n-layout-sider>
        <n-layout content-style="padding: 24px;" :native-scrollbar="false">
          <AppMain />
        </n-layout>
      </n-layout>
      <n-layout-footer position="absolute" style="height: 64px; padding: 24px" bordered> 城府路 </n-layout-footer>
    </n-layout>
  </n-config-provider>
</template>

<script lang="ts" setup>
import AppHeader from './components/header/index.vue'
import SideBar from './components/sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import { useAppStore } from '@store/app'

// 主题变量
import { useThemeStore } from '@store/theme'
import { storeToRefs } from 'pinia'
const themeStore = useThemeStore()
const appStore = useAppStore()

const { theme, themeOverrides } = storeToRefs(themeStore)
</script>

<style lang="scss" scoped>
.n-layout-header {
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}
</style>
