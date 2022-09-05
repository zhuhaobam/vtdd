import { defineStore } from 'pinia'
import {
  musicMenuListCombinationType,
  musicStoretCombinationType,
  musicMenuType,
  musicMenuRunType,
  musicSrcType,
  musicSeekJoinRunType
} from '@/types/musicType'

// 导出pinia
export const useMusicStore = defineStore('music', {
  state: (): musicStoretCombinationType => {
    return {
      count: 0,
      musicMenuList: [],
      mapRun: {},
      mapSeekRun: {},
      seekJoinRun: {
        id: '0',
        seek: 0,
        timeStamp: 0
      },
      player: []
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['count', 'musicMenuList', 'mapRun', 'mapSeekRun', 'mapSeekJoinRun', 'player']
      }
    ]
  },
  getters: {
    getCount(state): number {
      return state.count
    },
    getMapRun(state): Map<string, musicMenuRunType> {
      const mapRun = new Map(Object.entries(Object.assign({}, state.mapRun)))
      return mapRun
    },
    getMapSeekRun(state): Map<string, string> {
      const mapSeekRun = new Map(Object.entries(Object.assign({}, state.mapSeekRun)))
      return mapSeekRun
    },
    getSeekJoinRun(state): musicSeekJoinRunType {
      return state.seekJoinRun
    },
    getPlayer(state): musicSrcType[] {
      return state.player
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
    setMapSeekRun(value: Map<string, string>) {
      this.mapSeekRun = Object.fromEntries(value)
    },
    setMapSeekRunOne(id: string, seek: string) {
      const mapSeekRun = new Map(Object.entries(Object.assign({}, this.mapSeekRun)))
      mapSeekRun.set(id, seek)
      this.mapSeekRun = Object.fromEntries(mapSeekRun)
    },
    setSeekJoinRun(value: musicSeekJoinRunType) {
      this.seekJoinRun = value
    },
    setPlayer(value: musicSrcType[]) {
      this.player = value
    },
    setMusicMenuList(count: number, musicMenuList: musicMenuType[]) {
      this.count = count
      this.musicMenuList = musicMenuList
    },
    setMusicMenuListSingle(mml: musicMenuListCombinationType) {
      this.count = mml.count
      this.musicMenuList = mml.musicMenuList
    },
    // 清除
    init() {
      this.count = 0
      this.musicMenuList = []
      this.mapRun = {}
      this.mapSeekRun = {}
      this.seekJoinRun = {
        id: '0',
        seek: 0,
        timeStamp: 0
      }
      this.player = []
    }
  }
})
