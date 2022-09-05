<template>
  <n-layout-header position="absolute" class="nav" bordered :style="style" :inverted="inverted">
    <Logo :show-name="screen !== 'xs' && screen !== 's' && !collapsed" />
    <div flex items-center :class="collapsed ? 'pl7' : ''">
      <!-- 折叠切换 -->
      <div v-if="screen !== 'xs' && screen !== 's'" flex items-center @click="collapsedToggle()">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon v-if="collapsed" :size="screen === 'xs' || screen === 's' ? 30 : 16">
              <i-ant-design:menu-unfold-outlined />
            </n-icon>
            <n-icon v-else :size="screen === 'xs' || screen === 's' ? 30 : 16">
              <i-ant-design:menu-fold-outlined />
            </n-icon>
          </template>
          <span>{{ $t(collapsed ? 'project.unfold' : 'project.fold') }}</span>
        </n-tooltip>
      </div>
      <!-- 刷新 -->
      <div v-if="screen !== 'xs' && screen !== 's'" flex items-center px-5 @click="reloadPageClick">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon :size="screen === 'xs' || screen === 's' ? 30 : 16">
              <i-ant-design:reload-outlined />
            </n-icon>
          </template>
          <span>{{ $t('project.reload') }}</span>
        </n-tooltip>
      </div>
      <!-- 面包屑 -->
      <HeadBreadcrumb v-if="screen !== 'xs' && screen !== 's'" flex items-center />
    </div>
    <div flex items-center>
      <!--切换国际化-->
      <div pr-5>
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon :size="screen === 'xs' || screen === 's' ? 20 : 16" flex items-center @click="toggleLocales()">
              <div class="i-carbon-language" />
            </n-icon>
          </template>
          <span>{{ $t('project.toggle_langs') }}</span>
        </n-tooltip>
      </div>
      <!--切换全屏-->
      <div v-if="screen !== 'xs' && screen !== 's'" pr-5>
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon :size="screen === 'xs' || screen === 's' ? 30 : 16" flex @click="fullClick">
              <i-ant-design-fullscreen-exit-outlined v-if="isFullscreen" />
              <i-ant-design-fullscreen-outlined v-else />
            </n-icon>
          </template>
          <span>{{ $t(isFullscreen ? 'project.exitscreen' : 'project.fullscreen') }}</span>
        </n-tooltip>
      </div>
      <!--锁屏-->
      <div v-if="screen !== 'xs' && screen !== 's'" pr-5>
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon :size="screen === 'xs' || screen === 's' ? 30 : 16" flex @click="lockClick()">
              <div class="i-ant-design:lock-filled" />
            </n-icon>
          </template>
          <span>{{ $t('project.lock-screen') }}</span>
        </n-tooltip>
      </div>
      <div pr-5>
        <LightDark />
      </div>
      <HeadCenter />
      <n-popover
        v-if="screen === 'xs' || screen === 's'"
        placement="bottom-end"
        display-directive="show"
        trigger="click"
      >
        <template #trigger>
          <n-icon :size="screen === 'xs' || screen === 's' ? 30 : 16">
            <MenuSharp />
          </n-icon>
        </template>
        <div style="overflow: auto; max-height: 79vh">
          <slot name="menu" />
        </div>
      </n-popover>
    </div>
  </n-layout-header>
</template>

<script setup lang="ts">
import Logo from '../LoGo/index.vue'
import HeadBreadcrumb from '../HeadBreadcrumb/index.vue'
import LightDark from '../LightDark/index.vue'
import HeadCenter from '../HeadCenter/index.vue'
import { useNewSettingStore } from '@store/new-setting'
import { useFullStore } from '@store/full'
import { MenuSharp } from '@vicons/ionicons5'
const newSettingStore = useNewSettingStore()
const fullStore = useFullStore()
const { isFullscreen, toggle } = useFullscreen()
const { availableLocales, locale } = useI18n()

/**
 * 获取组件传值
 */
const props = withDefaults(
  defineProps<{
    collapsed: boolean
    inverted: boolean
    screen: string
  }>(),
  {
    inverted: false,
    collapsed: false,
    screen: 'xl'
  }
)

const style = computed(() => {
  return props.screen !== 'xs' && props.screen !== 's' && !props.collapsed
    ? {
        '--side-padding': '16px',
        '--header-height': '64px',
        'grid-template-columns': 'calc(272px - var(--side-padding)) 1fr auto'
      }
    : {
        '--side-padding': '16px',
        '--header-height': '64px',
        'grid-template-columns': 'auto 1fr auto'
      }
})

// 折叠切换
const collapsedToggle = () => {
  newSettingStore.toggleCollapsed(props.collapsed)
}
// 刷新
const reloadPageClick = () => {
  newSettingStore.settingReload()
}
// 锁屏
const lockClick = () => {
  newSettingStore.settingMLock(true)
}
// 全屏
const fullClick = () => {
  toggle().then(() => {
    fullStore.setPage(isFullscreen.value ? 'all:true' : 'all:false')
  })
}
const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  const localeValue = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  locale.value = localeValue
  newSettingStore.settingMLocale(localeValue)
}
</script>
<style lang="scss" scoped>
.nav {
  display: grid;
  align-items: center;
  padding: 0 var(--side-padding);
  grid-template-rows: calc(var(--header-height) - 1px);
}
</style>
