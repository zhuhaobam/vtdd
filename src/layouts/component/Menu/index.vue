<template>
  <div>
    <n-menu
      accordion
      :options="menuOptions"
      :inverted="inverted"
      :mode="'vertical'"
      :collapsed-width="96"
      :collapsed-icon-size="30"
      :collapsed="collapsed"
      :expanded-keys="state.openKeys"
      :value="getSelectedKeys"
      :render-extra="renderExtra"
      :render-icon="renderMenuIcon"
      @update:value="clickMenuItem"
      @update:expanded-keys="menuExpanded"
    />
  </div>
</template>
<script lang="ts" setup>
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { keyLabelAdjustment, primaryAdjustment, filterHiddenRoutes } from '@/utils/naiveUiRouter'
import { MenuGroupOption, MenuOption } from 'naive-ui'
import { TagsType, useTagsStore } from '@store/tags'
import { hFunctionIcon } from '@/utils/hFunctionRender'
import { RouteLocationMatched } from 'vue-router'
import { NIcon } from 'naive-ui'
import { useNewSettingStore } from '@store/new-setting'
const { t } = useI18n()
const newSettingStore = useNewSettingStore()
const tagsStore = useTagsStore()
type Props = {
  collapsed: boolean
  inverted: boolean
  screen: string
}
withDefaults(defineProps<Props>(), {
  collapsed: false,
  inverted: false,
  screen: ''
})

// import { MenuProps } from 'naive-ui'
// type MenuPropsOverrides = NonNullable<MenuProps['themeOverrides']>
// const menuThemeOverrides = ref<MenuPropsOverrides>()
// menuThemeOverrides.value = {
//   itemHeight: (props.collapsed ? 64 : 42) + 'px'
// }
// collapsed-icon-size 24 菜单折叠时图标的大小，如果未设定则使用 icon-size 代替
// collapsed-width 48 折叠后菜单的宽度
// icon-size 20  菜单未折叠时图标的大小
// indent 32 菜单每级的缩进
// root-indent 32 菜单第一级的缩进，如果没有设定，使用 indent 代替

const routes = generatedRoutes.map(v => {
  const currentMenu = v?.meta?.layout === false ? v : setupLayouts([v])[0]
  return currentMenu
})
const filterRoutes = filterHiddenRoutes(routes)
const primaryRoutes = primaryAdjustment(filterRoutes)
const menuOptions = ref<any[]>([])
watch(
  () => newSettingStore.headerSetting.mLocal,
  (newVal, oldVal) => {
    menuOptions.value = keyLabelAdjustment(primaryRoutes, t)
  },
  { immediate: true, deep: true }
)

// 路由处理
const currentRoute = useRoute()
const smatched = currentRoute.matched
const selectedKeys = ref<string>(currentRoute.name as string)
const beforeOpenKeys: string[] = smatched && smatched.length ? smatched.map(item => item.name as string) : []
const getOpenKeys = beforeOpenKeys.filter(x => x)
const state = reactive({
  openKeys: getOpenKeys
})
const getSelectedKeys = computed(() => {
  return unref(selectedKeys)
})

onMounted(() => {
  const mmatched = currentRoute.matched
  const lastMatched: RouteLocationMatched = mmatched[mmatched.length - 1]
  const tag: TagsType = {
    path: lastMatched.path,
    params: currentRoute.params,
    breadcrumb: lastMatched.meta.breadcrumb ?? '',
    icon: lastMatched.meta.icon ?? ''
  }
  tagsStore.addTag(tag)
})

watch(
  () => currentRoute.fullPath,
  () => {
    const wmatched = toRaw(currentRoute.matched)
    state.openKeys = wmatched.map(item => item.name as string)
    const activeMenu: string = (currentRoute.meta?.activeMenu as string) || ''
    selectedKeys.value = activeMenu ? (activeMenu as string) : (currentRoute.name as string)
    const lastMatched: RouteLocationMatched = wmatched[wmatched.length - 1]
    const tag: TagsType = {
      path: lastMatched.path,
      params: currentRoute.params,
      breadcrumb: lastMatched.meta.breadcrumb ?? '',
      icon: lastMatched.meta.icon ?? ''
    }
    tagsStore.addTag(tag)
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

function renderMenuIcon(option: MenuOption) {
  return h(NIcon, hFunctionIcon(option.menuRenderIcon as string))
}

function renderExtra(option: MenuOption | MenuGroupOption) {
  // if (option.path === '/drawing') {
  //   return h(NGradientText, { type: 'danger', size: 10 }, '重写')
  // }
}
</script>
