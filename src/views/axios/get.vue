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
  <json-viewer :value="codeGetThen" :preview-mode="true" :show-array-index="false"></json-viewer>
</template>
<script setup lang="ts" name="axios-get">
import { MyLogin } from '@/apis/apisTypes'
import { onLogin } from '@apis/app'
import { MyResponse } from 'axios'
const codeGetThen = ref({})
onMounted(() => {
  onLogin<MyResponse<MyLogin>>()
    .then(res => {
      console.log('===========GET==============》')
      console.log('===========request->onLogin<MyResponse<MyLogin>>->res')
      console.log(JSON.stringify(res))
      codeGetThen.value = res
      console.log('===========request->onLogin<MyResponse<MyLogin>>【MyResponse】->res.data')
      console.log(JSON.stringify(res.data))
      console.log('===========request->onLogin<MyResponse<MyLogin>>【MyLogin】->res.data.data')
      console.log(JSON.stringify(res.data.data))
      console.log('===========request->onLogin<MyResponse<MyLogin>>【MyLogin】->res.data.data?.other')
      console.log(JSON.stringify(res.data.data?.other))
      console.log('===========request->onLogin<MyResponse<MyLogin>>【MyLogin】->res.data.data?.permList')
      console.log(JSON.stringify(res.data.data?.permList))
      console.log('===========request->onLogin<MyResponse<MyLogin>>【MyLogin】->res.data.data?.permList')
      console.log(JSON.stringify(res.data.data?.permList))
    })
    .catch((error: any) => {
      console.log('request->onLogin<MyResponse<MyLogin>>->error', error)
    })
})
const codeGet = ref(`onLogin<MyResponse<MyLogin>>()
    .then(res => {
      console.log('===========GET==============》')
      console.log('===========request->onLogin<MyResponse<MyLogin>>->res')
      console.log(JSON.stringify(res))
      console.log('===========request->onLogin<MyResponse<MyLogin>>【MyResponse】->res.data')
      console.log(JSON.stringify(res.data))
      console.log('===========request->onLogin<MyResponse<MyLogin>>【MyLogin】->res.data.data')
      console.log(JSON.stringify(res.data.data))
      console.log('===========request->onLogin<MyResponse<MyLogin>>【MyLogin】->res.data.data?.other')
      console.log(JSON.stringify(res.data.data?.other))
      console.log('===========request->onLogin<MyResponse<MyLogin>>【MyLogin】->res.data.data?.permList')
      console.log(JSON.stringify(res.data.data?.permList))
      console.log('===========request->onLogin<MyResponse<MyLogin>>【MyLogin】->res.data.data?.permList')
      console.log(JSON.stringify(res.data.data?.permList))
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
