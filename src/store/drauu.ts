import { drauuSvgType } from '@/types/drauuType'
import { Brush, DrawingMode } from 'drauu'
import { defineStore } from 'pinia'

// 导出pinia
export const useDrauuStore = defineStore('drauu', {
  state: (): drauuSvgType => {
    return {
      drauuDump: {},
      drawingMode: {},
      brush: {}
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['drauuDump', 'drawingMode', 'brush']
      }
    ]
  },
  getters: {
    getDrauuDump(state): Record<string, string> {
      return state.drauuDump
    },
    getDdrawingMode(state): Record<string, DrawingMode | 'arrow'> {
      return state.drawingMode
    },
    getBrush(state): Record<string, Brush> {
      return state.brush
    }
  },
  actions: {
    setDrauuDumpOne(key: string, value: string) {
      const modules = this.drauuDump
      modules[key] = value
      this.drauuDump = modules
    },
    setDdrawingMode(key: string, value: DrawingMode | 'arrow') {
      const modules = this.drawingMode
      modules[key] = value
      this.drawingMode = modules
    },
    setBrush(key: string, value: Brush) {
      const modules = this.brush
      modules[key] = value
      this.brush = modules
    },
    // 清除
    init() {
      this.drauuDump = {}
      this.drawingMode = {}
      this.brush = {}
    }
  }
})
