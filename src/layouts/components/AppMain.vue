<template>
  <router-view v-slot="{ Component, route }">
    <transition
      :name="'fade-slide'"
      mode="out-in"
      :appear="true"
      @before-leave="handleBeforeLeave"
      @after-enter="handleAfterEnter"
    >
      <div id="app-main" :style="'padding:' + (route.meta?.padding ?? 0)">
        <keep-alive :include="keepAliveRouteNames">
          <component :is="Component" v-if="appStore.reload" :key="route.fullPath" />
        </keep-alive>
      </div>
    </transition>
  </router-view>
  <n-back-top :bottom="50" :visibility-height="300" />
</template>

<script setup lang="ts" name="appMain">
import { useAppStore } from '@store/app'

const appStore = useAppStore()
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
