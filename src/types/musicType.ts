import { Howl } from 'howler'
// 菜单类型
type ar = {
  id: number
  name: string
}
type al = {
  id: number
  name: string
  picUrl: string
}
type musicMenuType = {
  id: number
  mv: number
  fee: number
  name: string
  dt: number
  arList: ar[]
  al: al
}
// 歌词类型
type musicLyricsType = {
  id: number
  text: string
}

// 歌曲资源类型
type musicSrcType = {
  id: number
  srcList: string[]
  formatList: string[]
}

// howler播放运行状态
type howlerRunType = {
  id: number
  howler?: Howl
  type: 'none' | 'playing' | 'pause'
}

/**
 * 显示菜单
 */
type musicMenuListCombinationType = {
  count: number
  musicMenuList: musicMenuType[]
}

type musicStoretCombinationType = {
  count: number
  musicMenuList: musicMenuType[]
  mapRun: { [k: string]: musicMenuRunType }
}

/**
 * 显示菜单中的运行状态
 */
type musicMenuRunType = 'none' | 'playing' | 'pause'

export type {
  musicMenuType,
  musicLyricsType,
  musicSrcType,
  musicMenuListCombinationType,
  musicStoretCombinationType,
  howlerRunType,
  musicMenuRunType
}
