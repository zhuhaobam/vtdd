<template>
  <div>
    <n-menu
      accordion
      :style="'width: ' + collapsed ? 272 : 48 + 'px'"
      :options="menuOptions"
      :inverted="inverted"
      :mode="'vertical'"
      :collapsed="collapsed"
      :collapsed-width="48"
      :collapsed-icon-size="22"
      :indent="24"
      :expanded-keys="state.openKeys"
      :value="getSelectedKeys"
      @update:value="clickMenuItem"
      @update:expanded-keys="menuExpanded"
    />
  </div>
</template>
<script lang="ts" setup>
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { keyLabelAdjustment, primaryAdjustment, filterHiddenRoutes } from '@utils/router'
import { useAppStore } from '@store/app'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@store/theme'
import { MenuOption } from 'naive-ui'
import { useTagsStore } from '@store/tags'
const tagsStore = useTagsStore()
const { t } = useI18n({ useScope: 'global' })
const themeStore = useThemeStore()
const appStore = useAppStore()
const { locale, collapsed } = storeToRefs(appStore)
const { theme } = storeToRefs(themeStore)

const routes = generatedRoutes.map(v => {
  const currentMenu = v?.meta?.layout === false ? v : setupLayouts([v])[0]
  return currentMenu
})
const filterRoutes = filterHiddenRoutes(routes)
const primaryRoutes = primaryAdjustment(filterRoutes)
const menuOptions = ref<any[]>([])
watch(
  locale,
  (newVal, oldVal) => {
    menuOptions.value = keyLabelAdjustment(primaryRoutes, t)
  },
  { immediate: true, deep: true }
)

// 使用反转样式
const inverted = ref(theme !== null)
watch(
  theme,
  (newVal, oldVal) => {
    inverted.value = newVal !== null
  },
  { immediate: true, deep: true }
)

const currentRoute = useRoute()
// 获取当前打开的子菜单
const matched = currentRoute.matched
// const router = useRouter()
const selectedKeys = ref<string>(currentRoute.name as string)
const beforeOpenKeys: string[] = matched && matched.length ? matched.map(item => item.name as string) : []
const getOpenKeys = beforeOpenKeys.filter(x => x)
const state = reactive({
  openKeys: getOpenKeys
})
const getSelectedKeys = computed(() => {
  return unref(selectedKeys)
})
// 跟随页面路由变化，切换菜单选中状态
watch(
  () => currentRoute.fullPath,
  () => {
    const matched = currentRoute.matched
    state.openKeys = matched.map(item => item.name as string)
    const activeMenu: string = (currentRoute.meta?.activeMenu as string) || ''
    selectedKeys.value = activeMenu ? (activeMenu as string) : (currentRoute.name as string)
    tagsStore.addTag(matched[matched.length - 1])
  }
)
// 点击菜单(选中菜单的回调，key 是选中菜单项的 key，item 是菜单项原始数据)
function clickMenuItem(key: string, item: MenuOption) {
  if (/http(s)?:/.test(key)) {
    window.open(key)
  }
}

//展开菜单(keys 是展开菜单项的 key 的数组)
function menuExpanded(keys: string[]) {
  if (!keys) return
  const latestOpenKey = keys.find(key => state.openKeys.indexOf(key) === -1)
  const isExistChildren = findChildrenLen(latestOpenKey as string)
  state.openKeys = isExistChildren ? (latestOpenKey ? [latestOpenKey] : []) : keys
}
//查找是否存在子路由
function findChildrenLen(key: string) {
  if (!key) return false
  const subRouteChildren: string[] = []
  for (const { children, key } of unref(menuOptions)) {
    if (children && children.length) {
      subRouteChildren.push(key as string)
    }
  }
  return subRouteChildren.includes(key)
}
</script>
