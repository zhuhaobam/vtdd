<script lang="ts" setup>
import { useAppStore } from '@store/app'
import { useRoute } from 'vue-router'

const appStore = useAppStore()
const route = useRoute()
</script>

<template>
  <div style="background-color: blanchedalmond">
    AAAAAAAA
    <NMenu
      :value="(route.name as string)"
      :collapsed="appStore.collapsed"
      :collapsed-width="56"
      :indent="20"
      :options="[]"
      key-field="name"
      :render-label="(route: any) => route.name"
    />
  </div>
</template>
