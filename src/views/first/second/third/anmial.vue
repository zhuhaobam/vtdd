<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>thirdfloor->anmial</div>
</template>
<script setup lang="ts" name="first-second-third-anmial">
// default
// 被包裹组件被激活的状态下触发
onActivated(() => {
  console.log('first-second-third-anmial没错我在缓存组件中onActivated')
})

// 在被包裹组件停止使用时触发
onDeactivated(() => {
  console.log('first-second-third-anmial没错我在缓存组件中onDeactivated')
})
</script>
<route lang="yaml">
meta:
  breadcrumb: anmial
  icon: moon
  keepAlive: true
  sort: 300
  alwaysShow: false
</route>
