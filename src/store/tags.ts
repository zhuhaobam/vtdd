import { defineStore } from 'pinia'
import { RouteParams } from 'vue-router'
import router from '@/router'
import { cloneDeep } from 'lodash-es'
import { isString } from '@/utils/is'
export type TagsType = {
  path: string
  params: RouteParams
  breadcrumb: string
  icon: string
}
interface ITagsStore {
  tags: TagsType[]
  activeTag: string
}
const noTags = ['/404', '/:id(\\d+)', '/:all(.*)*', '/login', '/system/user', '/system/setting']
const replaceTags = ['/drawing/drauu/:did(\\d+)']
// 导出pinia
export const useTagsStore = defineStore('tags', {
  state: (): ITagsStore => {
    return {
      tags: [],
      activeTag: ''
    }
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ['tags', 'activeTag'] }]
  },
  getters: {
    hasEmpty(state): boolean {
      return state.tags.length === 0
    },
    leastTwo(state): boolean {
      return state.tags.length > 1
    },
    getActiveTag(state): string {
      return state.activeTag
    },
    getTags(state): TagsType[] {
      return state.tags
    }
  },
  actions: {
    clear() {
      this.activeTag = ''
      this.tags = []
    },
    setActiveTag(path: string) {
      this.activeTag = path
    },
    async setTags(tags: TagsType[]) {
      await nextTick()
      this.tags = cloneDeep(tags)
    },
    addTag(tag: TagsType) {
      let path = ''
      if (replaceTags.includes(tag.path)) {
        const messages = Object.fromEntries(
          Object.entries(tag.params).map(([key, value]) => {
            return [key, value]
          })
        )
        if (isString(messages.did)) {
          path = tag.path.replace(':did(\\d+)', messages.did)
        }
      } else {
        path = tag.path
      }
      this.setActiveTag(path)
      if (noTags.includes(tag.path) || this.tags.some(item => item.path === path)) return
      this.setTags([...this.tags, { ...tag, path: path }])
    },
    removeOtherTag(path: string) {
      if (path !== this.activeTag) {
        router.push(path)
      }
      this.setTags(this.tags.filter(tag => tag.path === path))
    },
    removeTag(path: string) {
      if (path === this.activeTag) {
        const activeIndex = this.tags.findIndex(item => item.path === path)
        if (activeIndex > 0) {
          router.push(this.tags[activeIndex - 1].path)
        } else {
          router.push(this.tags[activeIndex + 1].path)
        }
      }
      this.setTags(this.tags.filter(tag => tag.path !== path))
    }
  }
})
