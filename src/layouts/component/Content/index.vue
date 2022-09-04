<template>
  <router-view v-slot="{ Component, route }">
    <transition
      :name="'fade-slide'"
      mode="out-in"
      :appear="true"
      @before-leave="handleBeforeLeave"
      @after-enter="handleAfterEnter"
    >
      <n-card>
        <div
          id="app-main"
          :style="
            (fullPage === 'inner:true'
              ? 'min-height: calc(100vh - ' + heightComputed(route.meta, 96) + ');'
              : fullPage === 'init'
              ? 'min-height: calc(100vh - ' + heightComputed(route.meta, 210) + ');'
              : 'min-height: calc(100vh - ' + heightComputed(route.meta, 210) + ');') +
            'padding:' +
            (route.meta?.padding ?? 0 + 'px')
          "
        >
          <keep-alive :include="keepAliveRouteNames">
            <component :is="Component" v-if="newSettingStore.headerSetting.mReload" :key="route.fullPath" />
          </keep-alive>
        </div>
      </n-card>
    </transition>
  </router-view>
  <n-back-top :visibility-height="300" />
</template>

<script setup lang="ts" name="content">
import { useNewSettingStore } from '@store/new-setting'
import { useFullStore } from '@store/full'
const newSettingStore = useNewSettingStore()
const fullStore = useFullStore()

// 通过fullscreenchange-》EventListener以及两个全屏图标事件串联获得fullPage页面最终全屏状态
const fullPage = computed(() => fullStore.getPage)

const heightComputed = (meta: any, px: number) => {
  // class n-scrollbar-content相差6px
  return (meta?.padding ?? '0px') + ' - ' + (meta?.padding ?? '0px') + ' - ' + (px - 6) + 'px'
}

const router = useRouter()
const allRoutes = router.getRoutes()
const keepAliveRouteNames = computed(() => {
  return allRoutes.filter(route => route.meta?.keepAlive).map(route => route.name as string)
})

interface Emits {
  /** 禁止主体溢出 */
  (e: 'hide-main-overflow', hidden: boolean): void
}
const emit = defineEmits<Emits>()

function handleBeforeLeave() {
  emit('hide-main-overflow', true)
}
function handleAfterEnter() {
  emit('hide-main-overflow', false)
}
</script>
