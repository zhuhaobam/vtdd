<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- 给vite.config.ts中vite-plugin-pages配置Pages下extendRoute重定向首页使用 -->
  <RouterView />
</template>
<script setup lang="ts" name="index">
// default
</script>
<route lang="yaml">
meta:
  title: index
  icon: color
  sort: 0
  hidden: true
</route>
