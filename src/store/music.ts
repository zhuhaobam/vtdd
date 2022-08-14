import { defineStore } from 'pinia'
type CurrentPlaySongType = {
  tlyric?: string
  lyric?: string
  currentPlayLyric?: string
  isNotLyric?: boolean
}
export type playMode = 'order' | 'random' | 'singleLoop'

interface IMusicStore {
  currentPlaySong: CurrentPlaySongType
  showMusicDetail?: boolean
  playMode?: playMode
  playing?: boolean
  playWaiting?: boolean
  playList: any[]
  currentPlayIndex: number
}

// 导出pinia
export const useMusicStore = defineStore('music', {
  state: (): IMusicStore => {
    return {
      currentPlaySong: {
        tlyric: '',
        lyric: '',
        currentPlayLyric: '',
        isNotLyric: true
      },
      showMusicDetail: false,
      playMode: 'order',
      playing: false,
      playWaiting: true,
      playList: [],
      currentPlayIndex: 0
    }
  },
  getters: {
    getCurrentPlaySong(state) {
      return state.playList[state.currentPlayIndex]
    }
  },
  actions: {
    setTlyric(value: string) {
      this.currentPlaySong.tlyric = value
    },
    setLyric(value: string) {
      this.currentPlaySong.lyric = value
    },
    setCurrentPlayLyric(value: string) {
      this.currentPlaySong.currentPlayLyric = value
    },
    setIsNotLyric(value: boolean) {
      this.currentPlaySong.isNotLyric = value
    },
    setShowMusicDetail(value: boolean) {
      this.showMusicDetail = value
    },
    // 切换播放模式
    changePlayMode(mode: playMode) {
      this.playMode = mode
    },
    // 切换播放状态
    changePlaying(playing: boolean) {
      this.playing = playing
    },
    changeWaiting(waiting: boolean) {
      this.playWaiting = waiting
    },
    setPlayList(playList: any[]) {
      this.playList = playList
    },
    // 切换下一首
    async toggleNext(index?: number) {
      return { success: true }
    },
    // 切换上一首
    async togglePrev(index?: number) {
      return { success: true }
    }
  }
})
