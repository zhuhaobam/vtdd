<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <n-layout style="height: calc(100vh - 105px)">
    <n-layout position="absolute" has-sider>
      <n-layout-sider content-style="padding: 0;" :native-scrollbar="false" bordered>
        <n-menu
          :options="options"
          style="width: 272px"
          :default-expand-all="true"
          :value="defaultMenuOption?.key"
          :render-label="renderMenuLabel"
          :render-icon="renderMenuIcon"
          @update:value="handleComponent"
        />
      </n-layout-sider>
      <n-layout content-style="padding: 0 ;" :native-scrollbar="false">
        <n-layout-header bordered>
          <h2 flex justify-start items-center ml-24 mr-24>
            <n-icon-wrapper :size="20" :border-radius="30" color="rgba(24, 160, 88, 0.3)" icon-color="#18a058">
              <component :is="defaultMenuOption?.icon" v-if="defaultMenuOption?.icon" />
            </n-icon-wrapper>
            <span px-5>·</span
            >{{
              defaultMenuOption?.noi18n === 'yes'
                ? (defaultMenuOption?.label as string)
                : $t(defaultMenuOption?.label as string)
            }}
          </h2>
        </n-layout-header>
        <n-layout
          position="absolute"
          content-style="padding:0 24px 24px 24px;"
          style="top: 68px"
          :native-scrollbar="false"
        >
          <component :is="newComponent" />
        </n-layout>
      </n-layout>
    </n-layout>
  </n-layout>
</template>
<script setup lang="ts" name="markdown">
import { hFunctionIcon } from '@/utils/hFunctionRender'
import { MenuOption, NIcon } from 'naive-ui'
import { NEllipsis } from 'naive-ui'
const { t } = useI18n()
const defaultMenuOption = ref<MenuOption>()
const newComponent = shallowRef()
// 生成菜单
const options = ref<MenuOption[]>()
const modulesFiles: Record<string, any> = import.meta.glob('/src/md/**/*.md', { eager: true })
function madeOptions(levelName: string, level: number, list: Record<string, any>) {
  const onlyOptions: MenuOption[] = []
  for (const path in list) {
    if (path.split('/').length === level && path.slice(0, path.lastIndexOf('/')) === levelName) {
      const frontmatter = list[path].frontmatter
      const onlyMenuOption: MenuOption[] = madeOptions(path.slice(0, path.lastIndexOf('.')), level + 1, list)
      if (onlyMenuOption.length > 0) {
        onlyOptions.push({
          label: (frontmatter.noi18n ?? 'yes') === 'yes' ? frontmatter.title : frontmatter.trans,
          key: path,
          icon: hFunctionIcon(frontmatter.icon),
          sort: frontmatter.sort,
          noi18n: frontmatter.noi18n ?? 'yes',
          children: onlyMenuOption
        })
      } else {
        onlyOptions.push({
          label: (frontmatter.noi18n ?? 'yes') === 'yes' ? frontmatter.title : frontmatter.trans,
          key: path,
          icon: hFunctionIcon(frontmatter.icon),
          sort: frontmatter.sort,
          noi18n: frontmatter.noi18n ?? 'yes'
        })
      }
    }
  }
  onlyOptions.sort((a: MenuOption, b: MenuOption) => {
    return ((a?.sort as number) ?? 0) - ((b?.sort as number) ?? 0)
  })
  return onlyOptions
}
options.value = madeOptions('/src/md', 4, modulesFiles)
const defaultMd = defaultChildMd(options.value[0])
defaultMenuOption.value = defaultMd
newComponent.value = modulesFiles[defaultMd.key as string].default

function defaultChildMd(current: MenuOption): MenuOption {
  const currentChildren = current.children?.length ? current.children : []
  if ((currentChildren.length ?? 0) > 0) {
    return defaultChildMd(currentChildren[0])
  }
  return current
}

function renderMenuLabel(option: MenuOption) {
  return h(NEllipsis, null, {
    default: () => (option.noi18n === 'yes' ? (option.label as string) : t(option.label as string))
  })
}

function renderMenuIcon(option: MenuOption) {
  return h(NIcon, option.icon)
}

function handleComponent(key: string, item: MenuOption) {
  defaultMenuOption.value = item
  newComponent.value = modulesFiles[key].default
}
</script>
<route lang="yaml">
meta:
  breadcrumb: md.md
  icon: file-markdown-filled
  sort: -10
  hidden: true
</route>
<style lang="scss" scoped>
body {
  scroll-behavior: smooth;
}

ol {
  counter-reset: list-item;
}
li {
  display: block;
  counter-increment: list-item;
}
li:before {
  content: counters(list-item, '.') ' ';
}
</style>
