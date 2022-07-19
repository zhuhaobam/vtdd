<template>
  <n-icon size="26" color="#333" :depth="2" style="cursor: pointer" @click="toggle">
    <i-ant-design-fullscreen-outlined v-if="isFullscreen" />
    <i-ant-design-fullscreen-exit-outlined v-else />
  </n-icon>
</template>

<script lang="ts" setup>
const { isFullscreen, toggle } = useFullscreen()
</script>
