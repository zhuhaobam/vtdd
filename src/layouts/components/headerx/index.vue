<template>
  <div flex items-center justify-between h16>
    <n-space flex items-center>
      <UserLogo />
      <MenuCollapse />
      <!-- 面包屑 -->
      <n-breadcrumb>
        <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
          <n-breadcrumb-item>
            <n-dropdown v-if="routeItem.children.length" :options="routeItem.children" @select="dropdownSelect">
              <span class="link-text">
                <svg-icon v-if="routeItem.meta.icon" :name="(routeItem.meta?.icon as string||'')" />
                {{ $t((routeItem.meta?.title as string) || '') }}
              </span>
            </n-dropdown>
            <span v-else class="link-text">
              <svg-icon v-if="routeItem.meta.icon" :name="(routeItem.meta?.icon as string||'')" />
              {{ $t((routeItem.meta?.title as string) || '') }}
            </span>
          </n-breadcrumb-item>
        </template>
      </n-breadcrumb>
    </n-space>
    <n-space flex items-center>
      <n-icon
        flex
        items-center
        size="24"
        color="red"
        :depth="2"
        style="cursor: pointer"
        :title="t('button.toggle_langs')"
        @click="toggleLocales()"
      >
        <div i-carbon-language />
      </n-icon>
      <FullScreen />
      <LightDark />
      <UserAvatar />
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import MenuCollapse from './components/MenuCollapse.vue'
import LightDark from './components/LightDark.vue'
import FullScreen from './components/FullScreen.vue'
import UserAvatar from './components/UserAvatar.vue'
import UserLogo from './components/UserLogo.vue'
import { useAppStore } from '@store/app'
import { RouteLocationMatched } from 'vue-router'
import SvgIcon from '@components/SvgIcon/index.vue'
const appStore = useAppStore()
const { t, availableLocales, locale } = useI18n()
const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  const localeValue = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  locale.value = localeValue
  appStore.setLocale(localeValue)
}

const generator: any = (routerMap: RouteLocationMatched[]) => {
  return routerMap.map(item => {
    const currentMenu = {
      ...item,
      label: t((item.meta.title as string) || ''),
      icon: renderIcon((item.meta.icon as string) || ''),
      key: item.name,
      disabled: item.path === '/'
    }
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentMenu.children = generator(item.children, currentMenu)
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

const router = useRouter()
const currentRoute = useRoute()

const breadcrumbList = ref<RouteLocationMatched[]>([])
watch(
  locale,
  (newVal, oldVal) => {
    breadcrumbList.value = generator(currentRoute.matched).filter((x: any) => x.name)
  },
  { immediate: true, deep: true }
)
watch(
  () => currentRoute.fullPath,
  () => {
    breadcrumbList.value = generator(currentRoute.matched).filter((x: any) => x.name)
  }
)

const dropdownSelect = (key: any) => {
  router.push({ name: key })
}
</script>
