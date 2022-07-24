<template>
  <n-icon
    flex
    items-center
    size="26"
    color="red"
    :depth="2"
    style="cursor: pointer"
    :title="t(isFullscreen ? 'exitscreen' : 'fullscreen')"
    @click="toggle"
  >
    <i-ant-design-fullscreen-exit-outlined v-if="isFullscreen" />
    <i-ant-design-fullscreen-outlined v-else />
  </n-icon>
</template>

<script lang="ts" setup>
const { isFullscreen, toggle } = useFullscreen()
const { t } = useI18n()
</script>
