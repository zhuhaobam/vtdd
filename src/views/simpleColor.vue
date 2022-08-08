<template>
  <div>颜色</div>
</template>
<script setup lang="ts" name="simpleColor">
// default
console.log('simple-color')
// 被包裹组件被激活的状态下触发
onActivated(() => {
  console.log('simpleColor没错我在缓存组件中onActivated')
})

// 在被包裹组件停止使用时触发
onDeactivated(() => {
  console.log('simpleColor没错我在缓存组件中onDeactivated')
})
</script>
<route lang="yaml">
meta:
  breadcrumb: color
  icon: color
  keepAlive: true
  sort: 7
  alwaysShow: false
</route>
