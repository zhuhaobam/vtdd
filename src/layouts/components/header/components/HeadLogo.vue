<template>
  <router-link h-64 flex flex-row justify-center items-center decoration-none color-primary to="/">
    <img h32 w-auto :src="getAssetsFile('cafe.png')" alt="" :class="{ 'mr-2': !props.collapsed }" />
    <h2 v-show="!collapsed" ml-10 text-16 font-bold max-w-140 flex-shrink-0>
      {{ $t('project.title') }}
    </h2>
  </router-link>
</template>

<script lang="ts" setup name="HeadLogo">
import { getAssetsFile } from '@/plugins/assets-kit'
const props = defineProps({
  collapsed: {
    type: Boolean
  }
})
</script>
