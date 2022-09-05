import { useDrauuStore } from './drauu'
import { useMusicStore } from './music'
import { useNewSettingStore } from './new-setting'
import { useTagsStore } from './tags'
import { useUserStore } from './user'

const init = () => {
  const drauuStore = useDrauuStore()
  const musicStore = useMusicStore()
  const newSettingStore = useNewSettingStore()
  const tagsStore = useTagsStore()
  const userStore = useUserStore()
  //
  useStorage('slidev-drawing-enabled', false)
  useStorage('slidev-drawing-pinned', false)
  useStorage('slidev-drawing-pos', { x: 0, y: 0 })
  //
  drauuStore.init()
  musicStore.init()
  newSettingStore.init()
  tagsStore.init()
  userStore.logout()
}

export { init }
