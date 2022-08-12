<template>
  <div>
    <n-menu
      :theme-overrides="menuThemeOverrides"
      accordion
      :options="menuOptions"
      :inverted="inverted"
      :mode="'vertical'"
      :collapsed="collapsed"
      :collapsed-width="props.collapsedWidth"
      :collapsed-icon-size="defultCollapsedIconSize"
      :icon-size="props.iconSize"
      :indent="props.indent"
      :root-indent="props.rootIndent"
      :expanded-keys="state.openKeys"
      :value="getSelectedKeys"
      :render-icon="renderMenuIcon"
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
import { MenuProps, NIcon } from 'naive-ui'
import { renderAssetsIcon } from '@/utils/render'
const tagsStore = useTagsStore()
const { t } = useI18n({ useScope: 'global' })
const themeStore = useThemeStore()
const appStore = useAppStore()
const { locale, collapsed } = storeToRefs(appStore)
const { theme, menuTheme } = storeToRefs(themeStore)
type Props = {
  collapsedIconSize: number
  collapsedWidth: number
  iconSize: number
  indent: number
  rootIndent: number
}
const props = withDefaults(defineProps<Props>(), {
  collapsedIconSize: 24,
  collapsedWidth: 48,
  iconSize: 20,
  indent: 32,
  rootIndent: 32
})

type MenuPropsOverrides = NonNullable<MenuProps['themeOverrides']>
const menuThemeOverrides = ref<MenuPropsOverrides>({})
const defultCollapsedIconSize = ref(0)
watch(
  collapsed,
  (newVal, oldVal) => {
    if (collapsed.value) {
      const height =
        props.collapsedIconSize < menuTheme.value.minHeight
          ? menuTheme.value.minHeight
          : props.collapsedIconSize + menuTheme.value.compensate
      menuThemeOverrides.value = {
        itemHeight: height + 'px'
      }
      defultCollapsedIconSize.value = props.collapsedIconSize
    } else {
      menuThemeOverrides.value = {
        itemHeight: menuTheme.value.minHeight + 'px'
      }
      defultCollapsedIconSize.value = menuTheme.value.minHeight
    }
  },
  { immediate: true, deep: true }
)

const routes = generatedRoutes.map(v => {
  const currentMenu = v?.meta?.layout === false ? v : setupLayouts([v])[0]
  return currentMenu
})
const filterRoutes = filterHiddenRoutes(routes)
const primaryRoutes = primaryAdjustment(filterRoutes)
const menuOptions = ref<any[]>([])

function renderMenuIcon(option: MenuOption) {
  return h(NIcon, null, {
    default: () => h(renderAssetsIcon(option.menuRenderIcon as string))
  })
}
// collapsed-icon-size 24 菜单折叠时图标的大小，如果未设定则使用 icon-size 代替
// collapsed-width 48 折叠后菜单的宽度
// icon-size 20  菜单未折叠时图标的大小
// indent 32 菜单每级的缩进
// root-indent 32 菜单第一级的缩进，如果没有设定，使用 indent 代替
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
// 初始化第一个tag
if (tagsStore.isEmpty) {
  tagsStore.addTag(currentRoute.matched[currentRoute.matched.length - 1])
}
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
