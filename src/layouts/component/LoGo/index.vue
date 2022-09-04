<template>
  <n-text
    tag="div"
    class="ui-logo"
    :style="showName ? 'padding-left:16px;' : 'width:64px;padding-left:16px;'"
    :depth="1"
  >
    <img :src="getAssetsFile('cafe.png')" />
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
  cursor: pointer;
  display: flex;
  font-size: 18px;
}
.ui-logo > img {
  height: 32px;
  width: 32px;
}
</style>
