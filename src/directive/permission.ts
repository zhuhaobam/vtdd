import { DirectiveBinding, ObjectDirective } from 'vue'
import { usePermission } from '@hooks/usePermission'
type BindingType = {
  action: string[]
  effect: string
}
export const permission: ObjectDirective = {
  mounted(el: HTMLButtonElement, binding: DirectiveBinding<BindingType>) {
    const { hasPermission } = usePermission()
    const bindValue: BindingType = binding.value
    if (bindValue === undefined) return
    const { action, effect } = bindValue
    if (!hasPermission(action)) {
      if (effect === 'disabled') {
        el.disabled = true
        el.classList.add('n-button--disabled')
      } else {
        el.remove()
      }
    }
  }
}
