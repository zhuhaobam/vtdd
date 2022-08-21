export function parseLyric(lrc: string): LineItem[] {
  const lyrics = lrc.split('\n')
  const lrcObj: LineItem[] = []
  for (let i = 0; i < lyrics.length; i++) {
    const lyric = decodeURIComponent(lyrics[i])
    const timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g
    const timeRegExpArr = lyric.match(timeReg)
    if (!timeRegExpArr) continue
    const content = lyric.replace(timeReg, '')
    for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
      const t = timeRegExpArr[k]
      const min = Number(String(t.match(/\[\d*/i)).slice(1))
      const sec = Number(String(t.match(/:\d*/i)).slice(1))
      const time = min * 60 + sec
      if (content !== '') {
        lrcObj.push({ id: i, time: time, content })
      }
    }
  }
  return lrcObj
}
export function parseRangeLyric(lyricList: LineItem[]) {
  const map = new Map<number, LineItem>()
  let currentIndex = 0
  let nextIndex = 1
  // 如果第一项播放时间不为0，则手动插入一个
  if (lyricList[currentIndex].time !== 0 && lyricList[currentIndex].content !== '纯音乐，请欣赏') {
    lyricList.unshift({
      ...lyricList[currentIndex],
      time: 0
    })
  }
  while (currentIndex !== lyricList.length - 1) {
    const cur = lyricList[currentIndex]
    const next = lyricList[nextIndex]
    if (cur.time < next.time) {
      map.set(cur.time, {
        ...cur
      })
    }
    if (next) {
      currentIndex++
      nextIndex++
    }
    if (currentIndex === lyricList.length - 1) {
      map.set(next.time, {
        ...next
      })
    }
  }
  return map
}
export interface LineItem {
  id: number
  time: number
  content: string
  translateContent?: string
}
