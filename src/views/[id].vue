<template>
  <div>AAAAAAAAAA</div>
</template>
<script setup lang="ts" name="id">
const props = defineProps<{
  id: string
}>()
const index = computed(() => +props.id)
</script>
<route lang="yaml">
meta:
  title: 文章
  icon: color
  sort: 100
  hidden: true
</route>
