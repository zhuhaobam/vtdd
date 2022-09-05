<template>
  <n-text
    tag="div"
    class="ui-logo"
    :style="showName ? 'padding-left:16px;' : 'width:64px;padding-left:0px;'"
    :depth="1"
  >
    <img :src="getAssetsFile('logo.png')" />
    <n-ellipsis v-if="showName" text-center w-full>
      {{ $t('project.title') }}
    </n-ellipsis>
  </n-text>
</template>

<script setup lang="ts">
import { getAssetsFile } from '@/plugins/assets-kit'
/**
 * 获取组件传值
 */
withDefaults(
  defineProps<{
    showName: boolean
  }>(),
  {
    showName: false
  }
)
</script>
<style lang="scss" scoped>
.ui-logo {
  display: flex;
  cursor: pointer;
  font-size: 18px;
}

.ui-logo > img {
  width: 71px;
  height: 32px;
}
</style>
