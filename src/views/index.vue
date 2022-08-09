<template>给vite.config.ts中vite-plugin-pages配置Pages下extendRoute重定向首页使用</template>
<script setup lang="ts" name="index">
// default
</script>
<route lang="yaml">
redirect: /dashboard/analysis
meta:
  breadcrumb: index
  sort: 0
  hidden: true
</route>
