<template>
  <n-result status="404" :title="$t('notfound.title')" :description="$t('notfound.subtitle')" size="huge">
    <template #footer>
      <n-button @click="router.replace('/')">{{ $t('notfound.home') }} →</n-button>
    </template>
  </n-result>
</template>

<script setup lang="ts" name="all">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<route lang="yaml">
meta:
  breadcrumb: not-found
  layout: false
  sort: 0
  hidden: true
</route>
<style scoped>
.n-result {
  margin: 20vh auto 0;
}
</style>
