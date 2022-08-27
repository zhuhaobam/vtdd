<template>
  <div>AAAAAAAAAA{{ props.id }}</div>
</template>
<script setup lang="ts" name="id">
const props = defineProps<{
  id: String | Number
}>()
</script>
<route lang="yaml">
meta:
  breadcrumb: page.article
  icon: gift
  sort: 1
  hidden: true
</route>
