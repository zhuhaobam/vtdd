<template>
  <n-icon size="24" color="red" style="cursor: pointer" @click="appStore.toggleCollapsed">
    <i-ant-design:menu-unfold-outlined v-if="appStore.collapsed" />
    <i-ant-design:menu-fold-outlined v-else />
  </n-icon>
</template>

<script lang="ts" setup>
import { useAppStore } from '@store/app'

const appStore = useAppStore()
</script>
