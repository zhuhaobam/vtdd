<template>
  <n-result status="404" :title="'404' + $t('not-found')" :description="$t('description')" size="huge">
    <template #footer>
      <n-button @click="router.replace('/')">{{ $t('back-home') }} →</n-button>
    </template>
  </n-result>
</template>

<script setup lang="ts" name="notFound">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<route lang="yaml">
label: not-found
meta:
  layout: false
  sort: 200
  hidden: true
  alwaysShow: false
</route>
<style scoped>
.n-result {
  margin: 20vh auto 0;
}
</style>
