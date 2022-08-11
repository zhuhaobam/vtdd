<template>
  <n-layout style="height: calc(100vh - 153px)">
    <n-layout position="absolute" has-sider>
      <n-layout-sider content-style="padding: 0;" :native-scrollbar="false" bordered>
        <n-menu
          :options="options"
          style="width: 272px"
          :default-value="defaultMenuOption?.key"
          :render-label="renderMenuLabel"
          :render-icon="renderMenuIcon"
          @update:value="handleComponent"
        />
      </n-layout-sider>
      <n-layout content-style="padding: 0 ;" :native-scrollbar="false">
        <n-layout-header bordered>
          <h2 flex justify-start items-center ml-24 mr-24>
            <n-icon-wrapper :size="20" :border-radius="30">
              <component :is="defaultMenuOption?.icon" v-if="defaultMenuOption?.icon" />
            </n-icon-wrapper>
            <span px-5>·</span>{{ $t(defaultMenuOption?.label as string) }}
          </h2>
        </n-layout-header>
        <n-layout position="absolute" content-style="padding:0;" style="top: 80px" :native-scrollbar="false">
          <component :is="newComponent" />
        </n-layout>
      </n-layout>
    </n-layout>
  </n-layout>
</template>
<script setup lang="ts" name="vueMd">
import { renderDefaultAssetsIcon, renderSvgIcon } from '@/utils/render'
import { sortRoute } from '@/utils/router'
import { MenuOption } from 'naive-ui'
import { NEllipsis } from 'naive-ui'
const { t } = useI18n()
const modules: Record<string, any> = import.meta.glob('/src/md/*.md', { eager: true })
const defaultMenuOption = ref<MenuOption>()
const newComponent = shallowRef()
// 生成菜单
const options = ref<MenuOption[]>()
const moduleOptions: MenuOption[] = []
const madeOptions = () => {
  for (const key in modules) {
    const frontmatter = modules[key].frontmatter
    moduleOptions.push({
      label: frontmatter.title,
      key: key,
      icon: renderDefaultAssetsIcon(frontmatter.icon),
      sort: frontmatter.sort
    })
  }
  moduleOptions.sort(sortRoute)
  defaultMenuOption.value = moduleOptions[0]
  newComponent.value = modules[moduleOptions[0].key as string].default
  options.value = moduleOptions
}
madeOptions()

function renderMenuLabel(option: MenuOption) {
  return h(NEllipsis, null, { default: () => t(option.label as string) })
}

function renderMenuIcon(option: MenuOption) {
  return h(renderSvgIcon('file-markdown-filled'))
}

// 显示组件

function handleComponent(key: string, item: MenuOption) {
  defaultMenuOption.value = item
  newComponent.value = modules[key].default
}
</script>
<route lang="yaml">
meta:
  breadcrumb: page.md
  icon: file-markdown-filled
  sort: -1
</route>
<style lang="scss" scoped></style>
