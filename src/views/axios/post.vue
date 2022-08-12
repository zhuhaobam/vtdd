<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <n-h1 prefix="bar" align-text type="info">
    <n-text type="info">POST</n-text>
  </n-h1>
  <div style="overflow: auto">
    <n-space vertical :size="16">
      <n-code :code="codePost" language="javascript" show-line-numbers />
    </n-space>
  </div>
  <n-h1 prefix="bar" align-text type="info">
    <n-text type="info">JSON结果</n-text>
  </n-h1>
  <JsonViewer
    v-if="codePostThenReactive"
    :value="codePostThenReactive"
    :expanded="true"
    :expand-depth="5"
    theme="light"
  />
</template>
<script setup lang="ts" name="axios-post">
import { MyTest } from '@/apis/apisTypes'
import { onTest } from '@apis/app'
import { MyResponse } from 'axios'
import { JsonViewer } from 'vue3-json-viewer'
import 'vue3-json-viewer/dist/index.css'
const codePostThen = ref()
const codePostThenReactive = reactive(codePostThen)
onMounted(() => {
  onTest<MyResponse<MyTest>>()
    .then(res => {
      codePostThen.value = res
    })
    .catch((error: any) => {
      console.log('request->onTest<MyResponse<MyTest>>->error', error)
    })
})
const codePost = ref(`onTest<MyResponse<MyTest>>()
    .then(res => {
      // ... ...
    })
    .catch((error: any) => {
      console.log('request->onTest<MyResponse<MyTest>>->error', error)
    })`)
</script>

<style lang="scss" scoped>
// values are default one from jv-light template
</style>
<route lang="yaml">
meta:
  breadcrumb: page.axios.post
  icon: i-ant-design:build-filled
  sort: 71
</route>
