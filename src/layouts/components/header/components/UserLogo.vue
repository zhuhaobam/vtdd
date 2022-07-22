<template>
  <div flex items-center justify-center w-68 p0 m0>
    <n-space flex items-center>
      <n-avatar flex items-center :src="getAssetsFile('cafe.png')" />
      <n-gradient-text type="danger" w-20> {{ t('title') }} </n-gradient-text>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import getAssetsFile from '@utils/assets-kit'
const { t } = useI18n()
</script>
