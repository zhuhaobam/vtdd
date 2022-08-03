<template>
  <n-config-provider :locale="localeLRef" :date-locale="localeLDRef" :theme="theme" :theme-overrides="themeOverrides">
    <StarportCarrier>
      <RouterView v-if="isRouterAlive" />
    </StarportCarrier>
  </n-config-provider>
</template>

<script setup lang="ts">
import DevicePixelRatio from '@/plugins/devicePixelRatio'
import { useThemeStore } from '@store/theme'
import { storeToRefs } from 'pinia'
import { zhCN, enUS, dateEnUS, dateZhCN, NLocale, NDateLocale } from 'naive-ui'
import { useAppStore } from '@store/app'
const appStore = useAppStore()
const { locale } = storeToRefs(appStore)
const localeMap = new Map<
  string,
  {
    l: NLocale
    dl: NDateLocale
  }
>()
localeMap.set('en', {
  l: enUS,
  dl: dateEnUS
})
localeMap.set('zh-CN', {
  l: zhCN,
  dl: dateZhCN
})
const localeLRef = ref<NLocale>()
const localeLDRef = ref<NDateLocale>()
watch(
  locale,
  (newVal, oldVal) => {
    const key = locale.value
    const localeT = localeMap.get(key)
    localeLRef.value = localeT?.l
    localeLDRef.value = localeT?.dl
  },
  { immediate: true, deep: true }
)

const themeStore = useThemeStore()
const { theme, themeOverrides } = storeToRefs(themeStore)
onMounted(() => {
  // 校正windows页面在系统进行缩放后导致页面被放大的问题，通常放大比例是125%、150%
  DevicePixelRatio.init()
})

// 局部组件刷新
const isRouterAlive = ref(true)
const reloadMethod = () => {
  console.log('app reload')
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}
watch(
  () => appStore.reload,
  () => {
    reloadMethod()
  }
)
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
