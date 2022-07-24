<template>
  <div>
    <n-menu :options="menuOptions" :inverted="inverted" :collapsed-width="64" :collapsed-icon-size="22" />
  </div>
</template>
<script lang="ts" setup>
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { generatorMenu } from '@utils/router'
import { useAppStore } from '@store/app'
import { storeToRefs } from 'pinia'
const appStore = useAppStore()
const { locale } = storeToRefs(appStore)

const { t } = useI18n({ useScope: 'global' })

function sortRoute(a: any, b: any) {
  return (a.meta?.sort || 0) - (b.meta?.sort || 0)
}
generatedRoutes.sort(sortRoute)
const routes = generatedRoutes.map(v => {
  const currentMenu = v?.meta?.layout === false ? v : setupLayouts([v])[0]
  return currentMenu
})
const menuOptions = ref<any[]>([])
watch(
  locale,
  (newVal, oldVal) => {
    menuOptions.value = generatorMenu(t, routes)
    console.log('###', menuOptions.value)
  },
  { immediate: true, deep: true }
)

const inverted = ref(false)
const currentRoute = useRoute()
// 获取当前打开的子菜单
const matched = currentRoute.matched
</script>
