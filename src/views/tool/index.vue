<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <n-descriptions label-placement="left" bordered>
    <n-descriptions-item>
      <template #label> xicons from '@vicons/ionicons5' </template>
      <n-gradient-text type="success"> https://www.xicons.org/#/ </n-gradient-text>
    </n-descriptions-item>
    <n-descriptions-item>
      <template #label> unocss from 'unocss' </template>
      <n-gradient-text type="success">https://uno.antfu.me/</n-gradient-text>
    </n-descriptions-item>
    <n-descriptions-item>
      <template #label> naiveui from 'naive-ui' </template>
      <n-gradient-text type="success">https://www.naiveui.com/</n-gradient-text>
    </n-descriptions-item>
    <n-descriptions-item>
      <template #label> vueuse from '@vueuse/core' </template>
      <n-gradient-text type="success">https://vueuse.org/guide/</n-gradient-text>
    </n-descriptions-item>
  </n-descriptions>
</template>
<script setup lang="ts" name="tool">
// test
</script>
<route lang="yaml">
meta:
  breadcrumb: page.tool
  icon: bonfire-sharp
  sort: 20000
</route>
