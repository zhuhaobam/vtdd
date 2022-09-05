<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <n-h1 prefix="bar" align-text type="info">
      <n-text type="info"> 测试keep-alive缓存功能 </n-text>
    </n-h1>
    <n-input type="text" placeholder="测试keep-alive缓存功能" />
    <div>
      <n-watermark
        :content="$t('page.dashboard.workbench-watermark')"
        cross
        selectable
        :font-size="16"
        :line-height="16"
        :width="192"
        :height="128"
        :x-offset="12"
        :y-offset="28"
        :rotate="-15"
      >
        <div>
          <n-table :bordered="false" :single-line="false">
            <thead>
              <tr>
                <th>{{ $t('page.dashboard.workbench-fupan') }}</th>
                <th>{{ $t('page.dashboard.workbench-fupan') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ $t('page.dashboard.workbench-fupan') }}</td>
                <td>{{ $t('page.dashboard.workbench-fupan') }}</td>
              </tr>
              <tr>
                <td>...</td>
                <td>...</td>
              </tr>
            </tbody>
          </n-table>
        </div>
      </n-watermark>
    </div>
    <n-watermark
      v-if="show"
      :image="getAssetsFile('cafe.png')"
      cross
      fullscreen
      :font-size="16"
      :line-height="16"
      :width="384"
      :height="384"
      :x-offset="12"
      :y-offset="0"
      :image-width="64"
      :image-opacity="0.24"
    />
    <n-switch v-model:value="show" />
    <n-card title="有good权限">
      <n-button v-permission="{ action: 'good', effect: 'disabled' }">有good权限</n-button>
    </n-card>
    <n-card title="没有权限移除">
      <n-button v-permission="{ action: 'xxx' }">???</n-button>
    </n-card>
    <n-card title="无xxx权限">
      <n-button v-permission="{ action: 'xxx', effect: 'disabled' }">无xxx权限</n-button>
    </n-card>
  </div>
</template>
<script setup lang="ts" name="dashboard-workbench">
import { getAssetsFile } from '@/plugins/assets-kit'
const show = ref(false)
// 被包裹组件被激活的状态下触发
onActivated(() => {
  console.log('激活【workbench】===keep-alive===onActivated' + new Date())
})

// 在被包裹组件停止使用时触发
onDeactivated(() => {
  console.log('停止【workbench】===keep-alive===onDeactivated' + new Date())
})
</script>
<route lang="yaml">
meta:
  breadcrumb: page.dashboard.workbench
  icon: i-ant-design:appstore-outlined
  keepAlive: true
  sort: 1
  padding: 40px
</route>
