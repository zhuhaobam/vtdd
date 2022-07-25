<template>
  <div>
    <n-h1 prefix="bar" align-text type="info">
      <n-text type="info"> 工作台水印 </n-text>
    </n-h1>
    <div>
      <n-watermark
        content="水印"
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
                <th>复盘</th>
                <th>赋能</th>
                <th>协同</th>
                <th>...</th>
                <th>串联</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>拉通</td>
                <td>打通</td>
                <td>树立</td>
                <td>...</td>
                <td>履约</td>
              </tr>
              <tr>
                <td>...</td>
                <td>...</td>
                <td>...</td>
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
import getAssetsFile from '@utils/assets-kit'
const show = ref(false)
</script>
<route lang="yaml">
meta:
  title: workbench
  icon: moon
  keepAlive: true
  sort: 3
</route>
