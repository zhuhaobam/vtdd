<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <n-h1 prefix="bar" align-text type="info">
    <n-text type="info">GET</n-text>
  </n-h1>
  <div style="overflow: auto">
    <n-space vertical :size="16">
      <n-code :code="codeGet" language="javascript" show-line-numbers />
    </n-space>
  </div>
  <n-h1 prefix="bar" align-text type="info">
    <n-text type="info">JSON结果</n-text>
  </n-h1>
  <JsonViewer
    v-if="codeGetThenReactive"
    :value="codeGetThenReactive"
    :expanded="true"
    :expand-depth="5"
    theme="light"
  />
</template>
<script setup lang="ts" name="axios-get">
import { MyLogin } from '@/apis/apisTypes'
import { onLogin } from '@apis/app'
import { MyResponse } from 'axios'
import { JsonViewer } from 'vue3-json-viewer'
import 'vue3-json-viewer/dist/index.css'
const codeGetThen = ref()
const codeGetThenReactive = reactive(codeGetThen)
onMounted(() => {
  onLogin<MyResponse<MyLogin>>()
    .then(res => {
      codeGetThen.value = res
    })
    .catch((error: any) => {
      console.log('request->onLogin<MyResponse<MyLogin>>->error', error)
    })
})
const codeGet = ref(`onLogin<MyResponse<MyLogin>>()
    .then(res => {
      // ... ...
    })
    .catch((error: any) => {
      console.log('request->onLogin<MyResponse<MyLogin>>->error', error)
    })`)
</script>

<style lang="scss" scoped>
// values are default one from jv-light template
</style>
<route lang="yaml">
meta:
  breadcrumb: page.axios.get
  icon: i-ant-design:build-outlined
  sort: 70
</route>
