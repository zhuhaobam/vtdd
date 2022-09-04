import { GameControllerOutline, GameController } from '@vicons/ionicons5/es/async-index'
import { Component } from 'vue'
const viewViconsIcons: Record<string, Component> = {
  GameControllerOutline: GameControllerOutline,
  GameController: GameController
}

const checkHasViconsIcons = (keyName: string) => {
  return Object.entries(viewViconsIcons).some(([key, value]) => {
    return keyName === key
  })
}
const getViconsIcon: Component = (keyName: string) => {
  return viewViconsIcons[keyName]
}

export { checkHasViconsIcons, getViconsIcon }
