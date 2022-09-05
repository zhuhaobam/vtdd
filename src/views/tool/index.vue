<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <n-descriptions
    :label-placement="screen !== 's' && screen !== 'xs' ? 'left' : undefined"
    bordered
    :column="screen !== 's' && screen !== 'xs' ? 2 : 1"
  >
    <n-descriptions-item>
      <template #label> xicons from '@vicons/ionicons5'<br />naiveui推荐图标地址 </template>
      https://www.xicons.org/#/
    </n-descriptions-item>
    <n-descriptions-item>
      <template #label> unocss from 'unocss' <br />原子css搜索螃蟹 </template>
      https://uno.antfu.me/
    </n-descriptions-item>
    <n-descriptions-item>
      <template #label> naiveui from 'naive-ui' <br />naiveui螃蟹</template>
      https://www.naiveui.com/
    </n-descriptions-item>
    <n-descriptions-item>
      <template #label> vueuse from '@vueuse/core' <br />vueuse工具库螃蟹</template>
      https://vueuse.org/guide/
    </n-descriptions-item>
    <n-descriptions-item>
      <template #label> iconify图标</template>
      http://icon-sets.iconify.design/ant-design/
    </n-descriptions-item>
    <n-descriptions-item>
      <template #label> naive-ui推荐vicons图标</template>
      https://www.xicons.org/#/zh-CN
    </n-descriptions-item>
    <n-descriptions-item>
      <template #label> google-closure-library <br />closure-library工具库</template>
      https://github.com/google/closure-library
    </n-descriptions-item>
    <n-descriptions-item>
      <template #label> vue3社区文档</template>
      https://vue3js.cn/
    </n-descriptions-item>
    <n-descriptions-item>
      <template #label> vue3社区文档</template>
      http://www.liulongbin.top:8085/
    </n-descriptions-item>
  </n-descriptions>
</template>
<script setup lang="ts" name="tool">
import { ComputedRef } from 'vue'

// 屏幕大小
const screen = inject<ComputedRef<'s' | 'xs' | 'm' | 'l' | 'xl' | '2xl'>>('provide-screen')
// test
</script>
<route lang="yaml">
meta:
  breadcrumb: page.tool
  icon: bonfire-sharp
  sort: -15
</route>
