<template>
  <router-view v-slot="{ Component, route }">
    <div id="app-main" :style="'padding:' + (route.meta?.padding ?? 0) + 'px'">
      <keep-alive :include="keepAliveRouteNames">
        <component :is="Component" v-if="appStore.reload" :key="route.path" />
      </keep-alive>
    </div>
  </router-view>
</template>

<script setup lang="ts" name="appMain">
import { useAppStore } from '@store/app'

const appStore = useAppStore()
const router = useRouter()
const allRoutes = router.getRoutes()
const keepAliveRouteNames = computed(() => {
  return allRoutes.filter(route => route.meta?.keepAlive).map(route => route.name as string)
})
</script>
