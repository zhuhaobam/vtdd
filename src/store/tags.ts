import { defineStore } from 'pinia'
import { RouteLocationMatched } from 'vue-router'
import router from '@/router'
import { cloneDeep } from 'lodash-es'
import { isString } from '@/utils/is'

interface ITagsStore {
  tags: RouteLocationMatched[]
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
    getTags(state): RouteLocationMatched[] {
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
    setTags(tags: RouteLocationMatched[]) {
      // 涉及到对象循环引用，这里直接深拷贝一下Circular reference
      this.tags = cloneDeep(tags)
      console.log(cloneDeep(tags).length)
    },
    addTag(tag: RouteLocationMatched) {
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
