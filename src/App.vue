<template>
  <n-config-provider
    v-if="!headerSetting.mLock"
    :hljs="hljs"
    :locale="localeLRef"
    :date-locale="localeLDRef"
    :theme="theme"
    :theme-overrides="themeOverrides"
    inline-theme-disabled
    preflight-style-disabled
  >
    <n-loading-bar-provider>
      <n-message-provider>
        <StarportCarrier>
          <music-global>
            <router-view />
          </music-global>
        </StarportCarrier>
      </n-message-provider>
    </n-loading-bar-provider>
    <n-global-style />
  </n-config-provider>
  <ScreenLock :open="headerSetting.mLock" />
</template>

<script setup lang="ts">
import { useUserStore } from '@store/user'
import { useNewSettingStore } from '@store/new-setting'
import { storeToRefs } from 'pinia'
import useBreakpoint from '@/hooks/screen/use-breakpoint'
import { zhCN, enUS, dateEnUS, dateZhCN, NLocale, NDateLocale, GlobalTheme, GlobalThemeOverrides } from 'naive-ui'
import router from './router'
import { darkTheme } from 'naive-ui'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import java from 'highlight.js/lib/languages/java'
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('java', java)
const { t } = useI18n()
provide('provide-screen', useBreakpoint())
const newSettingStore = useNewSettingStore()
const userStore = useUserStore()

// naiveui组件库
const { headerSetting } = storeToRefs(newSettingStore)
const localeLRef = ref<NLocale>()
const localeLDRef = ref<NDateLocale>()
watch(
  () => newSettingStore.getMLocal,
  (newVal, oldVal) => {
    if (newVal === 'zh-CN') {
      localeLRef.value = zhCN
      localeLDRef.value = dateZhCN
    } else if (newVal === 'en') {
      localeLRef.value = enUS
      localeLDRef.value = dateEnUS
    }
    const titleProject = '-' + t(import.meta.env.VTDD_APP_TITLE)
    const breadcrumb = newSettingStore.headerSetting.title
    newSettingStore.settingDocumentTitle(breadcrumb !== '' ? t(breadcrumb) + titleProject : '^_^' + titleProject)
  },
  { immediate: true, deep: true }
)

// naiveui组件库主题更新
const theme = ref<GlobalTheme | null>(headerSetting.value.mTheme)
const themeOverrides = ref<GlobalThemeOverrides | null>(headerSetting.value.mThemeOverrides)

watch(
  () => newSettingStore.getMTheme,
  (newVal, oldVal) => {
    if (newVal === null) {
      theme.value = null
      themeOverrides.value = null
    } else {
      theme.value = darkTheme
      themeOverrides.value = headerSetting.value.mThemeOverrides
    }
  },
  { immediate: true, deep: true }
)

router.beforeEach((to, from, next) => {
  newSettingStore.loadingBarStart()
  // console.log('路由前置守卫[App.vue]', from, to)
  // console.log('路由前置守卫[App.vue]', 'from:' + from.fullPath, 'to:' + to.fullPath)
  const breadcrumb = to.meta?.breadcrumb ?? ''
  const titleProject = '-' + t(import.meta.env.VTDD_APP_TITLE)
  newSettingStore.settingTitle(breadcrumb ?? '')
  newSettingStore.settingDocumentTitle(breadcrumb !== '' ? t(breadcrumb) + titleProject : '^_^' + titleProject)
  if (to.name !== 'login' && !(userStore.getToken !== '')) {
    next({ name: 'login' })
  } else if (to.name === 'login' && userStore.getToken !== '') {
    next({ path: '/' })
  } else {
    next()
  }
})

router.afterEach((to, from, failure) => {
  newSettingStore.loadingBarFinish()
  // console.log('路由后置守卫[App.vue]', 'from:' + from.fullPath, 'to:' + to.fullPath)
})

router.beforeResolve(async to => {
  // console.log('解析守卫[App.vue]', 'to:', to)
  if (to.hash) {
    // hash路径后面连接其他路径就会返回null
    return to.hash.split('#')[1].indexOf('/') === -1
  }
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
