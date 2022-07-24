<template>
  <div>
    <n-menu :options="menuOptions" :inverted="inverted" :collapsed-width="64" :collapsed-icon-size="22" />
  </div>
</template>
<script lang="ts" setup>
import { useAppStore } from '@store/app'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { generatorMenu } from '@utils/router'
import { storeToRefs } from 'pinia'
const { t } = useI18n({ useScope: 'global' })
const appStore = useAppStore()

function sortRoute(a: any, b: any) {
  return (a.meta?.sort || 0) - (b.meta?.sort || 0)
}
generatedRoutes.sort(sortRoute)
const routes = generatedRoutes.map(v => {
  const currentMenu = v?.meta?.layout === false ? v : setupLayouts([v])[0]
  return currentMenu
})
const menuOptions = ref<any[]>([])
const { locale } = storeToRefs(appStore)
watch(
  locale,
  (newVal, oldVal) => {
    menuOptions.value = generatorMenu(t, routes)
  },
  { immediate: true, deep: true }
)

const inverted = ref(false)
const currentRoute = useRoute()
// 获取当前打开的子菜单
const matched = currentRoute.matched
</script>
