<template>
  <n-config-provider
    v-if="!lock"
    :hljs="hljs"
    :locale="localeLRef"
    :date-locale="localeLDRef"
    :theme="theme"
    :theme-overrides="themeOverrides"
    inline-theme-disabled
  >
    <!-- <n-theme-editor> -->
    <n-loading-bar-provider>
      <StarportCarrier>
        <music-global>
          <router-view />
        </music-global>
      </StarportCarrier>
    </n-loading-bar-provider>
    <n-global-style />
    <!-- </n-theme-editor> -->
  </n-config-provider>
  <ScreenLock :open="lock" />
</template>

<script setup lang="ts">
import DevicePixelRatio from '@/plugins/devicePixelRatio'
import { useThemeStore } from '@store/theme'
import { useUserStore } from '@store/user'
import { useAppStore } from '@store/app'
import { storeToRefs } from 'pinia'
import { zhCN, enUS, dateEnUS, dateZhCN, NLocale, NDateLocale, GlobalTheme, GlobalThemeOverrides } from 'naive-ui'
import router from './router'
import { darkTheme } from 'naive-ui'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('javascript', javascript)
const { t } = useI18n()

const appStore = useAppStore()
const userStore = useUserStore()
const { locale, lock } = storeToRefs(appStore)
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
const theme = ref<GlobalTheme | null>(null)
const themeOverrides = ref<GlobalThemeOverrides | null>(null)
const themeOverridesTomplate = {
  common: {
    primaryColor: '#18a058',
    primaryColorSuppl: '#18a058',
    primaryColorHover: 'blue',
    successColorHover: '#f0a020',
    successColorSuppl: '#f0a020'
  }
}
if (themeStore.isNullTheme) {
  themeStore.setTheme(null)
  themeStore.setThemeOverrides(null)
} else {
  themeStore.setTheme(darkTheme)
  themeStore.setThemeOverrides(themeOverridesTomplate)
}
watch(
  () => themeStore.theme,
  (newVal, oldVal) => {
    theme.value = newVal
    themeOverrides.value = themeOverridesTomplate
  },
  { immediate: true, deep: true }
)
onMounted(() => {
  // 校正windows页面在系统进行缩放后导致页面被放大的问题，通常放大比例是125%、150%
  DevicePixelRatio.init()
})

router.beforeEach((to, from, next) => {
  appStore.setLoadingBarStart()
  // console.log('路由前置守卫[App.vue]', from, to)
  // console.log('路由前置守卫[App.vue]', 'from:' + from.fullPath, 'to:' + to.fullPath)
  appStore.setTitle(t, to.meta?.breadcrumb ?? 'md.md')
  if (to.name !== 'login' && !(userStore.getToken !== '')) {
    next({ name: 'login' })
  } else if (to.name === 'login' && userStore.getToken !== '') {
    next({ path: '/' })
  } else if (String(to.name) === 'all' && String(from.path).startsWith('/md/')) {
    next({ path: from.path, hash: decodeURI(String(to.path).replace('/', '#')) })
  } else {
    next()
  }
})

router.afterEach((to, from, failure) => {
  appStore.setLoadingBarFinish()
  // console.log('路由后置守卫[App.vue]', 'from:' + from.fullPath, 'to:' + to.fullPath)
})

router.beforeResolve(async to => {
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
