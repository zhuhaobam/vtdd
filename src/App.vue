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
import { useUserStore } from '@store/user'
import { storeToRefs } from 'pinia'
import { zhCN, enUS, dateEnUS, dateZhCN, NLocale, NDateLocale } from 'naive-ui'
import { useAppStore } from '@store/app'
import router from './router'

const { t } = useI18n()
const appStore = useAppStore()
const userStore = useUserStore()
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
  'zh- CN': {
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
// 全局前置守卫(如果用户无法进入页面时你希望避免执行的操作）的理想位置
router.beforeEach((to, from, next) => {
  console.log('全局前置守卫', to, !isAuthenticated())
  if (to.name !== 'login' && !isAuthenticated()) {
    next({ name: 'login' })
  } else {
    next()
  }
})
const isAuthenticated = () => {
  return userStore.getToken !== ''
}
// 全局后置钩子
// https://router.vuejs.org/zh/guide/advanced/navigation-failures.html
// https://router.vuejs.org/zh/guide/advanced/navigation-failures.html#%E5%AF%BC%E8%88%AA%E6%95%85%E9%9A%9C%E7%9A%84%E5%B1%9E%E6%80%A7
router.afterEach((to, from, failure) => {
  console.log('全局后置钩子', to)
  appStore.setTitle(t, to.meta?.breadcrumb as string)
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
