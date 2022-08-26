<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <n-space vertical>
    <router-link v-for="drauu in 6" :key="drauu" :to="'/drawing/drauu/' + drauu">第{{ drauu }}页画板</router-link>
  </n-space>
</template>
<script setup lang="ts" name="drawing-drauu-list">
// default
</script>
<route lang="yaml">
meta:
  breadcrumb: page.drawing.drauu.list
  icon: i-carbon:chart-t-sne
  sort: 21
  padding: 40
</route>
