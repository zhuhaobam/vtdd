<template>
  <n-config-provider :locale="localeLRef" :date-locale="localeLDRef" :theme="theme" :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
      <StarportCarrier>
        <RouterView />
      </StarportCarrier>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import DevicePixelRatio from '@/plugins/devicePixelRatio'
import { useThemeStore } from '@store/theme'
import { storeToRefs } from 'pinia'
import { zhCN, enUS, dateEnUS, dateZhCN, NLocale, NDateLocale } from 'naive-ui'
import { useAppStore } from '@store/app'

const { t } = useI18n()
const appStore = useAppStore()
const { locale } = storeToRefs(appStore)

const localeMap: {
  [key: string]: {
    l: NLocale
    dl: NDateLocale
  }
} = {
  en: {
    l: enUS,
    dl: dateEnUS
  },
  'zh-CN': {
    l: zhCN,
    dl: dateZhCN
  }
}

const localeLRef = ref<NLocale>()
const localeLDRef = ref<NDateLocale>()
watch(
  locale,
  (newVal, oldVal) => {
    const localeT = localeMap[locale.value]
    localeLRef.value = localeT?.l
    localeLDRef.value = localeT?.dl
    appStore.freshTitle(t)
  },
  { immediate: true, deep: true }
)

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
