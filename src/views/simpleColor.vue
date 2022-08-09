<template>
  <div>颜色</div>
</template>
<script setup lang="ts" name="simpleColor">
// default
// 被包裹组件被激活的状态下触发
onActivated(() => {
  console.log('激活【simpleColor】===keep-alive===onActivated' + new Date())
})

// 在被包裹组件停止使用时触发
onDeactivated(() => {
  console.log('停止【simpleColo】===keep-alive===onDeactivated' + new Date())
})
</script>
<route lang="yaml">
meta:
  breadcrumb: page.color
  icon: i-carbon:color-palette
  sort: 8000
</route>
