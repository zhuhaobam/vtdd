<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <n-h1 prefix="bar" align-text type="info">
      <n-text type="info"> {{ $t('workbench-watermark') }} </n-text>
    </n-h1>
    <n-input type="text" placeholder="基本的 Input2222" />
    <div>
      <n-watermark
        :content="$t('watermark')"
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
                <th>{{ $t('fupan') }}</th>
                <th>{{ $t('fupan') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ $t('fupan') }}</td>
                <td>{{ $t('fupan') }}</td>
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
import getAssetsFile from '@/plugins/assets-kit'
const show = ref(false)
onMounted(() => {
  console.log('....workbench......' + new Date())
})
// 被包裹组件被激活的状态下触发
onActivated(() => {
  console.log('workbench没错我在缓存组件中onActivated')
})

// 在被包裹组件停止使用时触发
onDeactivated(() => {
  console.log('workbench没错我在缓存组件中onDeactivated')
})
</script>
<route lang="yaml">
meta:
  breadcrumb: workbench
  icon: moon
  keepAlive: true
  sort: 3
  alwaysShow: false
</route>
