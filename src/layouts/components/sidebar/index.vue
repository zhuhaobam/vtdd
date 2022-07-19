<script lang="ts" setup>
import { useAppStore } from '@store/app'
import { useRoute } from 'vue-router'
import { NIcon } from 'naive-ui'

const appStore = useAppStore()

const route = useRoute()
</script>

<template>
  <div class="h-full fixed top-16 left-0 transition-all duration-300 z-30 flex flex-col shadow-lg">
    <div
      class="h-header flex items-center justify-center font-bold text-medium text-primary whitespace-nowrap overflow-hidden"
    >
      {{ appStore.collapsed ? 'N' : 'Naive Template' }}
    </div>
    <div class="flex-1 overflow-auto">
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
  </div>
</template>
