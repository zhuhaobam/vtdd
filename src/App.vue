<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="theme" :theme-overrides="themeOverrides">
    <StarportCarrier>
      <RouterView />
    </StarportCarrier>
  </n-config-provider>
</template>

<script setup lang="ts">
import DevicePixelRatio from '@utils/devicePixelRatio'
import { useThemeStore } from '@store/theme'
import { storeToRefs } from 'pinia'
import { zhCN, dateZhCN } from 'naive-ui'
const themeStore = useThemeStore()
const { theme, themeOverrides } = storeToRefs(themeStore)
onMounted(() => {
  // 校正windows页面在系统进行缩放后导致页面被放大的问题，通常放大比例是125%、150%
  DevicePixelRatio.init()
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
