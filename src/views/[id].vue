<script setup lang="ts" name="PageId">
const props = defineProps<{
  id: string
}>()
const index = computed(() => +props.id)
</script>

<template>
  <div>AAAAAAAAAA</div>
</template>
<route lang="yaml">
name: PageId
</route>
