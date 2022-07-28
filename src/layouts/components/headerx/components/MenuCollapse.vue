<template>
  <n-icon
    flex
    items-center
    size="24"
    color="red"
    style="cursor: pointer"
    :title="t('button.toggle_langs')"
    @click="appStore.toggleCollapsed"
  >
    <i-ant-design:menu-unfold-outlined v-if="appStore.collapsed" />
    <i-ant-design:menu-fold-outlined v-else />
  </n-icon>
</template>

<script lang="ts" setup>
import { useAppStore } from '@store/app'
const { t } = useI18n()

const appStore = useAppStore()
</script>
