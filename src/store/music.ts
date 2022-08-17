import { defineStore } from 'pinia'
import {
  musicMenuListCombinationType,
  musicStoretCombinationType,
  musicMenuType,
  musicMenuRunType
} from '@/types/musicType'

// 导出pinia
export const useMusicStore = defineStore('music', {
  state: (): musicStoretCombinationType => {
    return {
      count: 0,
      musicMenuList: [],
      mapRun: {}
    }
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ['count', 'musicMenuList', 'mapRun'] }]
  },
  getters: {
    getCount(state): number {
      return state.count
    },
    getMapRun(state): Map<string, musicMenuRunType> {
      const mapRun = new Map(Object.entries(state.mapRun))
      return mapRun
    },
    getMusicMenuList(state): musicMenuListCombinationType {
      return {
        count: state.count,
        musicMenuList: state.musicMenuList
      }
    },
    getMusicMenuListSingle(state): musicMenuType[] {
      return state.musicMenuList
    }
  },
  actions: {
    setCount(value: number) {
      this.count = value
    },
    setMapRun(value: Map<string, musicMenuRunType>) {
      this.mapRun = Object.fromEntries(value)
    },
    setMusicMenuList(count: number, musicMenuList: musicMenuType[]) {
      this.count = count
      this.musicMenuList = musicMenuList
    },
    setMusicMenuListSingle(mml: musicMenuListCombinationType) {
      this.count = mml.count
      this.musicMenuList = mml.musicMenuList
    },
    destroy() {
      this.count = 0
      this.musicMenuList = []
    }
  }
})
