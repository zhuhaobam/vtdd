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
  icon: color
  sort: 100
  hidden: true
  alwaysShow: false
</route>
