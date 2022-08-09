<!-- eslint-disable vue/require-explicit-emits -->
<template>
  <div class="layout-header">
    <!--顶部菜单-->
    <!--左侧菜单-->
    <div class="layout-header-left">
      <!-- 菜单收起 -->
      <div
        class="ml-1 layout-header-trigger layout-header-trigger-min"
        @click="() => $emit('update:collapsed', !props.collapsed)"
      >
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon v-if="props.collapsed" size="18">
              <i-ant-design:menu-unfold-outlined />
            </n-icon>
            <n-icon v-else size="18">
              <i-ant-design:menu-fold-outlined />
            </n-icon>
          </template>
          <span>{{ $t(props.collapsed ? 'project.unfold' : 'project.fold') }}</span>
        </n-tooltip>
      </div>
      <!-- 刷新 -->
      <div class="mr-1 layout-header-trigger layout-header-trigger-min" @click="reloadPage">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18">
              <i-ant-design:reload-outlined />
            </n-icon>
          </template>
          <span>{{ $t('project.reload') }}</span>
        </n-tooltip>
      </div>
      <!-- 面包屑 -->
      <HeadBreadcrumb />
    </div>
    <div class="layout-header-right">
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18" @click="toggleLocales()">
              <div class="i-carbon-language" />
            </n-icon>
          </template>
          <span>{{ $t('project.toggle_langs') }}</span>
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
          <span>{{ $t(isFullscreen ? 'project.exitscreen' : 'project.fullscreen') }}</span>
        </n-tooltip>
      </div>
      <LightDark />
      <!-- 个人中心 -->
      <div class="layout-header-trigger layout-header-trigger-min">
        <HeadCenter />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="appHeader">
import LightDark from './components/LightDark.vue'
import { useAppStore } from '@store/app'
import HeadCenter from './components/HeadCenter.vue'
import HeadBreadcrumb from './components/HeadBreadcrumb/index.vue'
const props = defineProps({
  collapsed: {
    type: Boolean
  },
  inverted: {
    type: Boolean
  }
})
const appStore = useAppStore()
const { isFullscreen, toggle } = useFullscreen()
const { availableLocales, locale } = useI18n()
const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  const localeValue = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  locale.value = localeValue
  appStore.setLocale(localeValue)
}
// 刷新页面
const reloadPage = () => {
  appStore.setReload()
}
</script>

<style lang="scss" scoped>
.layout-header {
  z-index: 11;
  display: flex;
  width: 100%;
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
    margin-right: 0;

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
