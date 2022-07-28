<template>
  <div>AAAAAAAAAA{{ props.id }}</div>
</template>
<script setup lang="ts" name="id">
const props = defineProps<{
  id: string
}>()
</script>
<route lang="yaml">
meta:
  title: 文章
  icon: color
  sort: 100
  hidden: true
</route>
