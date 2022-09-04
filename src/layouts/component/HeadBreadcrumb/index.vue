<template>
  <div>
    <n-breadcrumb>
      <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
        <n-breadcrumb-item>
          <n-dropdown v-if="routeItem.children.length" :options="routeItem.children" @select="dropdownSelect">
            <div flex items-center justify-center>
              <component :is="routeItem?.icon" v-if="routeItem?.icon" />
              {{ $t(routeItem.meta?.breadcrumb as string) }}
            </div>
          </n-dropdown>
          <div v-else flex items-center justify-center>
            <component :is="routeItem?.icon" v-if="routeItem?.icon" />
            {{ $t(routeItem.meta?.breadcrumb as string) }}
          </div>
        </n-breadcrumb-item>
      </template>
    </n-breadcrumb>
  </div>
</template>

<script lang="ts" setup name="HeadBreadcrumb">
import { useRouter, useRoute, RouteLocationMatched } from 'vue-router'
import { headBreadcrumbMatched } from './index'
const router = useRouter()
const currentRoute = useRoute()
const { t, locale } = useI18n()

const breadcrumbList = ref<RouteLocationMatched[]>([])
watch(
  locale,
  (newVal, oldVal) => {
    breadcrumbList.value = headBreadcrumbMatched(currentRoute.matched, t)
  },
  { immediate: true, deep: true }
)
watch(
  () => currentRoute.fullPath,
  () => {
    breadcrumbList.value = headBreadcrumbMatched(currentRoute.matched, t)
  }
)
const dropdownSelect = (key: any) => {
  router.push({ name: key })
}
</script>
