import { Howl } from 'howler'

// 菜单类型
type ar = {
  id: string
  name: string
}
type al = {
  id: string
  name: string
  picUrl: string
}
type musicMenuType = {
  id: string
  mv: number
  fee: number
  name: string
  dt: number
  ar: ar[]
  al: al
}
// 歌词类型
type musicLyricsType = {
  id: string
  name: string
  text: string
}

// 歌曲资源类型
type musicSrcType = {
  id: string
  name: string[]
  src: string[]
  format: string[]
}
/**
 * 菜单
 */
type musicMenuListCombinationType = {
  count: number
  musicMenuList: musicMenuType[]
}

type musicStoretCombinationType = {
  count: number
  musicMenuList: musicMenuType[]
  mapRun: { [k: string]: musicMenuRunType }
  mapSeekRun: { [k: string]: string }
  player: musicSrcType[]
}

/**
 * 显示菜单中的运行状态
 */
type musicMenuRunType = 'none' | 'playing' | 'pause'

/**
 * 全局暂存播放器,页面级别暂停
 */
type globalHowlPauseType = {
  howl: Howl
  howlId: number
  seek: number
}

export type {
  musicMenuType,
  musicLyricsType,
  musicSrcType,
  musicMenuListCombinationType,
  musicStoretCombinationType,
  musicMenuRunType,
  globalHowlPauseType
}
