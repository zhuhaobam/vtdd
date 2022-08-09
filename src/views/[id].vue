<template>
  <div>AAAAAAAAAA{{ props.id }}</div>
</template>
<script setup lang="ts" name="id">
const props = defineProps<{
  id: string | any
}>()
</script>
<route lang="yaml">
meta:
  breadcrumb: article
  icon: gift
  sort: 1
  hidden: true
</route>
