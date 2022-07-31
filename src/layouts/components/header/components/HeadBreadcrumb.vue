<template>
  <n-breadcrumb>
    <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
      <n-breadcrumb-item>
        <n-dropdown v-if="routeItem.children.length" :options="routeItem.children" @select="dropdownSelect">
          <span class="link-text">
            <component :is="routeItem?.icon" v-if="routeItem?.icon" />
            {{ $t(routeItem.meta?.title ?? '') }}
          </span>
        </n-dropdown>
        <span v-else class="link-text">
          <component :is="routeItem?.icon" v-if="routeItem?.icon" />
          {{ $t(routeItem.meta?.title ?? '') }}
        </span>
      </n-breadcrumb-item>
    </template>
  </n-breadcrumb>
</template>

<script lang="ts" setup name="HeadBreadcrumb">
import SvgIcon from '@components/SvgIcon/index.vue'
import { useRouter, useRoute, RouteLocationMatched } from 'vue-router'
import { useAppStore } from '@store/app'
const appStore = useAppStore()
const router = useRouter()
const currentRoute = useRoute()
const { t, locale } = useI18n()
const generator: any = (routerMap: RouteLocationMatched[]) => {
  return routerMap.map(item => {
    if (Object.keys(item.meta).length === 0) {
      return {}
    }
    const currentMenu = {
      ...item,
      label: t(item.meta?.title ?? ''),
      icon: renderIcon(item.meta?.icon ?? ''),
      key: item.name
    }
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      currentMenu.children = generator(item.children, currentMenu)
    } else {
      currentMenu.props = { default: currentMenu.props }
    }
    return currentMenu
  })
}
/**
 * render 图标
 * */
function renderIcon(icon: string) {
  return () => h(SvgIcon, { name: icon, size: 16 }, { default: () => h(icon) })
}

const breadcrumbList = ref<RouteLocationMatched[]>([])
watch(
  locale,
  (newVal, oldVal) => {
    appStore.setTitle(t, currentRoute.meta?.title ?? '')
    breadcrumbList.value = generator(currentRoute.matched).filter((x: any) => x.name)
  },
  { immediate: true, deep: true }
)
watch(
  () => currentRoute.fullPath,
  () => {
    appStore.setTitle(t, currentRoute.meta?.title ?? '')
    breadcrumbList.value = generator(currentRoute.matched).filter((x: any) => x.name)
  }
)
const dropdownSelect = (key: any) => {
  router.push({ name: key })
}
</script>
