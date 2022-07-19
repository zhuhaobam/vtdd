<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade-slide" mode="out-in" appear>
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
const router = useRouter()
const allRoutes = router.getRoutes()
</script>
