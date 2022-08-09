<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <n-h1 prefix="bar" align-text type="info">
      <n-text type="info" flex flex-row>
        <div class="i-ant-design:api-filled"></div>
        <div class="i-ant-design:dashboard-filled"></div>
        <div class="i-ant-design:appstore-outlined"></div>
        <div class="i-ant-design:area-chart-outlined"></div>
        <div class="i-ant-design:build-filled"></div>
        <div class="i-ant-design:build-outlined"></div>
        <div class="i-ant-design:dropbox-outlined"></div>
        <div class="i-ant-design:node-expand-outlined"></div>
        <div class="i-carbon:draw"></div>
        <div class="i-carbon:link"></div>
        <div class="i-carbon:color-palette"></div>
        <div class="i-carbon:chart-t-sne"></div>
        <div class="i-carbon:condition-point"></div>
        <div class="i-carbon:crop-health"></div>
      </n-text>
      <n-code :code="codeIcon" language="javascript" show-line-numbers />
      @iconify-json/ant-design图标使用之前需要通过页面使用，加载到项目中来
    </n-h1>
    <n-h1 prefix="bar" align-text type="info">
      <n-text type="info">测试keep-alive缓存功能</n-text>
    </n-h1>
    <n-input type="text" placeholder="测试keep-alive缓存功能" />
    <n-h1 prefix="bar" align-text type="warning">
      <n-text type="warning">注意：</n-text>
    </n-h1>
    <div>以下三个vite-plugin的使用可去官方查看为准</div>
    <n-h1 prefix="bar" align-text type="error">
      <n-text type="error">一、vite-plugin-pages</n-text>
    </n-h1>
    <div>生成扁平路由列表，生成的name为【组件名】或者【文件夹名字-组件名】或者【文件夹名字-文件夹名字-组件名】</div>
    <div>路由文件里面打印或则debugger一下查看生成信息</div>
    <n-h1 prefix="bar" align-text type="error">
      <n-text type="error">二、vite-plugin-vue-layouts</n-text>
    </n-h1>
    <div>按配置使用setupLayouts进行布局</div>
    <div style="overflow: auto">
      <n-space vertical :size="16">
        <n-code :code="codeLayouts" language="javascript" show-line-numbers />
      </n-space>
    </div>
    <n-h1 prefix="bar" align-text type="success">
      <n-text>router/index.ts</n-text>
    </n-h1>
    <div style="overflow: auto">
      <n-space vertical :size="16">
        <n-code :code="codePages" language="javascript" show-line-numbers />
      </n-space>
    </div>
    <n-h1 prefix="bar" align-text type="success">
      <n-text>utils/router.ts/primaryKeepAliveAdjustment</n-text>
    </n-h1>
    <div style="overflow: auto">
      <n-space vertical :size="16">
        <n-code :code="codePagesKeepAlive" language="javascript" show-line-numbers />
      </n-space>
    </div>
    <n-h1 prefix="bar" align-text type="error">
      <n-text type="error">三、vite-plugin-vue-setup-extend</n-text>
    </n-h1>
    <div>
      结合路由处理name="dashboard-analysis",以便primaryKeepAliveAdjustment方法处理laout后的路由数据，用来支持keep-alive缓存功能
    </div>
    <div style="overflow: auto">
      <n-space vertical :size="16">
        <n-code :code="codeExtend" language="javascript" show-line-numbers />
      </n-space>
    </div>
  </div>
</template>
<script setup lang="ts" name="dashboard-analysis">
// 被包裹组件被激活的状态下触发
onActivated(() => {
  console.log('激活【analysis】===keep-alive===onActivated' + new Date())
})

// 在被包裹组件停止使用时触发
onDeactivated(() => {
  console.log('停止【analysis】===keep-alive===onDeactivated' + new Date())
})
const codeIcon = ref(`<div class="i-ant-design:api-filled"></div>`)

const codePages = ref(`import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { primaryKeepAliveAdjustment } from '@/utils/router'

const routesLayouts = generatedRoutes.map(v => {
  const currentMenu = v.meta?.layout !== false ? setupLayouts([v])[0] : v
  return currentMenu
})
// keep-alive缓存支持 {Keep alive cache support}
// 将文件夹的路由展开，为了支持keep-alive {Expand the route of the folder to support keep alive}
const primaryRoutes = primaryKeepAliveAdjustment(routesLayouts)

const router = createRouter({
  history: createWebHistory(import.meta.env.VTDD_APP_BASE),
  routes: primaryRoutes
})

export default router`)
const codePagesKeepAlive = ref(`/**
 * 将文件夹的路由展开，为了支持keep-alive '{Expand the route of the folder to support keep alive}''
 * @param routes
 * @returns
 */
export function primaryKeepAliveAdjustment(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  return routes.map(vx => {
    const v = cloneDeep(vx)
    const hasChildren = (v.children?.length ?? 0) > 0
    const info = hasChildren ? v.children![0] : v
    const singlePage = !((info.children?.length ?? 0) > 0)
    if (!hasChildren || singlePage) {
      return v
    }
    const result: RouteRecordRaw = {
      ...info,
      path: v.path
    }
    result.component = v.component
    return result
  })
}`)
const codeLayouts = ref(`<route lang="yaml">
meta:
  breadcrumb: analysis
  icon: lang
  keepAlive: true
  sort: 1
</route>`)
const codeExtend = ref(`<script setup lang="ts" name="dashboard-analysis">`)
</script>
<route lang="yaml">
meta:
  breadcrumb: page.dashboard.analysis
  icon: i-ant-design:area-chart-outlined
  keepAlive: true
  sort: 0
</route>
