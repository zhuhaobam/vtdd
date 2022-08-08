<template>
  <n-config-provider :locale="localeLRef" :date-locale="localeLDRef" :theme="theme" :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
      <StarportCarrier>
        <router-view />
      </StarportCarrier>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import DevicePixelRatio from '@/plugins/devicePixelRatio'
import { useThemeStore } from '@store/theme'
import { useUserStore } from '@store/user'
import { useAppStore } from '@store/app'
import { storeToRefs } from 'pinia'
import { zhCN, enUS, dateEnUS, dateZhCN, NLocale, NDateLocale } from 'naive-ui'
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
    const localeT = localeMap[newVal]
    localeLRef.value = localeT?.l
    localeLDRef.value = localeT?.dl
    if ((oldVal ?? true) !== true) {
      appStore.freshTitle(t)
    }
  },
  { immediate: true, deep: true }
)

const themeStore = useThemeStore()
const { theme, themeOverrides } = storeToRefs(themeStore)
onMounted(() => {
  // 校正windows页面在系统进行缩放后导致页面被放大的问题，通常放大比例是125%、150%
  DevicePixelRatio.init()
})
router.beforeEach((to, from, next) => {
  appStore.setLoadingBarStart()
  // console.log('路由前置守卫[App.vue]')
  // console.log('路由前置守卫[App.vue]', 'from:' + from.fullPath, 'to:' + to.fullPath)
  appStore.setTitle(t, to.meta?.breadcrumb as string)
  if (to.name !== 'login' && !(userStore.getToken !== '')) {
    next({ name: 'login' })
  } else {
    next()
  }
})
router.afterEach((to, from, failure) => {
  appStore.setLoadingBarFinish()
  // console.log('路由后置守卫[App.vue]')
  // console.log('路由后置守卫[App.vue]', 'from:' + from.fullPath, 'to:' + to.fullPath)
})

router.beforeResolve(async to => {
  // console.log('解析守卫[App.vue]')
  // console.log('解析守卫[App.vue]', 'to:' + to.fullPath)
  // if (to.meta.requiresCamera) {
  //   try {
  //     await askForCameraPermission()
  //   } catch (error) {
  //     if (error instanceof NotAllowedError) {
  //       // ... 处理错误，然后取消导航
  //       return false
  //     } else {
  //       // 意料之外的错误，取消导航并把错误传给全局处理器
  //       throw error
  //     }
  //   }
  // }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
