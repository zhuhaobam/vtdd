import { defineStore } from 'pinia'
import { RouteLocationMatched } from 'vue-router'
import router from '@/router'

interface ITagsStore {
  tags: RouteLocationMatched[]
  activeTag: string
}

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
    isEmpty(): boolean {
      return this.tags.length === 0
    }
  },
  actions: {
    setActiveTag(path: string) {
      this.activeTag = path
    },
    setTags(tags: RouteLocationMatched[]) {
      this.tags = tags
    },
    addTag(tag: RouteLocationMatched) {
      this.setActiveTag(tag.path)
      if (
        ['/404', '/login', '/system/user', '/system/setting'].includes(tag.path) ||
        this.tags.some(item => item.path === tag.path)
      )
        return
      this.setTags([...this.tags, tag])
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
