<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="keepAliveRouteNames">
      <component :is="Component" v-if="appStore.reload" :key="route.path" />
    </keep-alive>
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
