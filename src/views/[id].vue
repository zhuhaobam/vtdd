<template>
  <div>AAAAAAAAAA{{ props.id }}</div>
</template>
<script setup lang="ts" name="id">
const props = defineProps<{
  id: string
}>()
</script>
<route lang="yaml">
label: article
meta:
  icon: color
  sort: 100
  hidden: true
  alwaysShow: false
</route>
