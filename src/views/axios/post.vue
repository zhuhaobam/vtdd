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
  <json-viewer :value="codePostThen" :preview-mode="true" :show-array-index="false"></json-viewer>
</template>
<script setup lang="ts" name="axios-post">
import { MyTest } from '@/apis/apisTypes'
import { onTest } from '@apis/app'
import { MyResponse } from 'axios'
const codePostThen = ref({})
onMounted(() => {
  onTest<MyResponse<MyTest>>()
    .then(res => {
      console.log('===========POST==============》')
      console.log('===========request->onTest<MyResponse<MyTest>>->res')
      console.log(JSON.stringify(res))
      codePostThen.value = res
      console.log('===========request->onTest<MyResponse<MyTest>>【MyResponse】->res.data')
      console.log(JSON.stringify(res.data))
      console.log('===========request->onTest<MyResponse<MyTest>>【MyTest】->res.data.data')
      console.log(JSON.stringify(res.data.data))
      console.log('===========request->onTest<MyResponse<MyTest>>【MyTest】->res.data.data?.other')
      console.log(JSON.stringify(res.data.data?.other))
    })
    .catch((error: any) => {
      console.log('request->onTest<MyResponse<MyTest>>->error', error)
    })
})
const codePost = ref(`onTest<MyResponse<MyTest>>()
    .then(res => {
      console.log('===========POST==============》')
      console.log('===========request->onTest<MyResponse<MyTest>>->res')
      console.log(JSON.stringify(res))
      console.log('===========request->onTest<MyResponse<MyTest>>【MyResponse】->res.data')
      console.log(JSON.stringify(res.data))
      console.log('===========request->onTest<MyResponse<MyTest>>【MyTest】->res.data.data')
      console.log(JSON.stringify(res.data.data))
      console.log('===========request->onTest<MyResponse<MyTest>>【MyTest】->res.data.data?.other')
      console.log(JSON.stringify(res.data.data?.other))
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
