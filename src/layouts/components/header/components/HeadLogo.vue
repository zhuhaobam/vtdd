<template>
  <div class="logo">
    <img :src="getAssetsFile('cafe.png')" alt="" :class="{ 'mr-2': !props.collapsed }" />
    <h2 v-show="!collapsed" class="title">{{ $t('project.title') }}</h2>
  </div>
</template>

<script lang="ts" setup name="HeadLogo">
import getAssetsFile from '@/plugins/assets-kit'
const props = defineProps({
  collapsed: {
    type: Boolean
  }
})
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  overflow: hidden;
  height: 64px;
  align-items: center;
  justify-content: center;
  line-height: 64px;
  white-space: nowrap;

  img {
    width: auto;
    height: 32px;
  }

  .title {
    width: 200px;
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>
