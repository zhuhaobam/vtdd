<template>
  <div flex items-center justify-center w-68 p0 m0>
    <n-space flex items-center>
      <n-avatar flex items-center :src="getAssetsFile('cafe.png')" :class="{ 'mr-2': !collapsed }" />
      <n-gradient-text v-show="!collapsed" type="danger" w-20> {{ t('title') }} </n-gradient-text>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@store/app'
import { storeToRefs } from 'pinia'
import getAssetsFile from '@utils/assets-kit'
const appStore = useAppStore()
const { collapsed } = storeToRefs(appStore)
const { t } = useI18n()
</script>
