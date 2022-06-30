<script lang="ts" setup>
import { useAppStore } from '@store/app'
import { useTabStore } from '@store/tab'

const appStore = useAppStore()
const tabStore = useTabStore()

const includeList = computed(() => {
  return tabStore.tabs.map(route => route.name as string)
})
</script>
<template>
  <div
    class="fixed top-content right-0 bottom-0 transition-all duration-300"
    :class="[appStore.collapsed ? 'left-sidebar--collapsed' : 'left-sidebar']"
  >
    AAAAAAAAAAAAAAA
    <p>Scrollbar</p>
    <div class="p-normal min-h-[calc(100vh-92px)] bg-[#eff3f5]">
      <router-view v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in" appear>
          <KeepAlive :include="['BlankLayout', ...includeList]">
            <Component :is="Component" :key="route.name" />
          </KeepAlive>
        </Transition>
      </router-view>
    </div>
  </div>
</template>
