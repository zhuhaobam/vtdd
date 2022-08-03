<template>
  <div>
    <n-h1 prefix="bar" align-text type="info">
      <n-text type="info"> {{ $t('workbench-watermark') }} </n-text>
    </n-h1>
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
  </div>
</template>
<script setup lang="ts" name="dashboardWorkbench">
import getAssetsFile from '@/plugins/assets-kit'
const show = ref(false)
console.log('..........' + new Date())
</script>
<route lang="yaml">
meta:
  title: workbench
  icon: moon
  keepAlive: true
  sort: 3
  alwaysShow: false
</route>
