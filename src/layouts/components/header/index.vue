<!-- eslint-disable vue/require-explicit-emits -->
<template>
  <div class="layout-header">
    <!--顶部菜单-->
    <!--左侧菜单-->
    <div class="layout-header-left">
      <MyLogo :collapsed="props.collapsed" />
      <!-- 菜单收起 -->
      <div
        class="ml-1 layout-header-trigger layout-header-trigger-min"
        @click="() => $emit('update:collapsed', !props.collapsed)"
      >
        <n-icon v-if="props.collapsed" size="18">
          <i-ant-design:menu-unfold-outlined />
        </n-icon>
        <n-icon v-else size="18">
          <i-ant-design:menu-fold-outlined />
        </n-icon>
      </div>
      <!-- 刷新 -->
      <div class="mr-1 layout-header-trigger layout-header-trigger-min" @click="reloadPage">
        <n-icon size="18">
          <i-myself-color />
        </n-icon>
      </div>
      <!-- 面包屑 -->
      <n-breadcrumb>
        <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
          <n-breadcrumb-item>
            <n-dropdown v-if="routeItem.children.length" :options="routeItem.children" @select="dropdownSelect">
              <span class="link-text">
                <component :is="routeItem.meta.icon" v-if="routeItem.meta.icon" />
                {{ $t(routeItem.meta.title) }}
              </span>
            </n-dropdown>
            <span v-else class="link-text">
              <component :is="routeItem.meta.icon" v-if="routeItem.meta.icon" />
              {{ $t(routeItem.meta.title) }}
            </span>
          </n-breadcrumb-item>
        </template>
      </n-breadcrumb>
    </div>
    <div class="layout-header-right">
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18" @click="toggleLocales()">
              <div class="i-carbon-language" />
            </n-icon>
          </template>
          <span>{{ $t('button.toggle_langs') }}</span>
        </n-tooltip>
      </div>
      <!--切换全屏-->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18" @click="toggle()">
              <i-ant-design-fullscreen-exit-outlined v-if="isFullscreen" />
              <i-ant-design-fullscreen-outlined v-else />
            </n-icon>
          </template>
          <span>{{ $t(isFullscreen ? 'exitscreen' : 'fullscreen') }}</span>
        </n-tooltip>
      </div>
      <LightDark />
      <!-- 个人中心 -->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-dropdown
          trigger="hover"
          :options="[
            {
              label: '个人设置',
              key: 1
            },
            {
              label: '退出登录',
              key: 2
            }
          ]"
          @select="avatarSelect"
        >
          <div class="avatar">
            <n-avatar round>
              {{ $t('name') }}
              <template #icon>
                <img :src="getAssetsFile('cafe.png')" />
              </template>
            </n-avatar>
          </div>
        </n-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="header">
import LightDark from './components/LightDark.vue'
import SvgIcon from '@components/SvgIcon/index.vue'
import { useRouter, useRoute, RouteLocationMatched } from 'vue-router'
import { useAppStore } from '@store/app'
import getAssetsFile from '@utils/assets-kit'
import MyLogo from './components/MyLogo.vue'
const props = defineProps({
  collapsed: {
    type: Boolean
  },
  inverted: {
    type: Boolean
  }
})
const appStore = useAppStore()
const router = useRouter()
const currentRoute = useRoute()
const { isFullscreen, toggle } = useFullscreen()
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
// 刷新页面
const reloadPage = () => {
  router.push({
    path: '/redirect' + unref(currentRoute).fullPath
  })
}

//头像下拉菜单
const avatarSelect = (key: number) => {
  switch (key) {
    case 1:
      router.push({ name: 'Setting' })
      break
    case 2:
      console.log(2)
      break
    default:
      console.log('default')
  }
}

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

<style lang="scss" scoped>
.layout-header {
  z-index: 11;
  display: flex;
  width: 100%;
  height: 64px;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  transition: all 0.2s ease-in-out;

  &-left {
    display: flex;
    align-items: center;

    .logo {
      display: flex;
      overflow: hidden;
      height: 64px;
      align-items: center;
      justify-content: center;
      padding-left: 10px;
      line-height: 64px;
      white-space: nowrap;

      img {
        width: auto;
        height: 32px;
        margin-right: 10px;
      }

      .title {
        margin-bottom: 0;
      }
    }

    ::v-deep(.ant-breadcrumb span:last-child .link-text) {
      color: #515a6e;
    }

    .n-breadcrumb {
      display: inline-block;
    }

    &-menu {
      color: var(--text-color);
    }
  }

  &-right {
    display: flex;
    align-items: center;
    margin-right: 20px;

    .avatar {
      display: flex;
      height: 64px;
      align-items: center;
    }

    > * {
      cursor: pointer;
    }
  }

  &-trigger {
    display: inline-block;
    width: 64px;
    height: 64px;
    cursor: pointer;
    text-align: center;
    transition: all 0.2s ease-in-out;

    .n-icon {
      display: flex;
      height: 64px;
      align-items: center;
      line-height: 64px;
    }

    &:hover {
      background: hsl(0deg 0% 100% / 8%);
    }

    .anticon {
      color: #515a6e;
      font-size: 16px;
    }
  }

  &-trigger-min {
    width: auto;
    padding: 0 12px;
  }
}

.layout-header-light {
  background: #fff;
  color: #515a6e;

  .n-icon {
    color: #515a6e;
  }

  .layout-header-trigger {
    &:hover {
      background: #f8f8f9;
    }
  }
}

.layout-header-fix {
  position: fixed;
  z-index: 11;
  top: 0;
  right: 0;
  left: 200px;
}
</style>
