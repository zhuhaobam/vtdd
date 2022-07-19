import Cookies from 'js-cookie'

const cookiesStorage: Storage = {
  setItem(key, value) {
    return Cookies.set(key, value, { expires: 3 })
  },
  getItem(key) {
    return Cookies.get(key) as string
  },
  length: 0,
  clear: function (): void {
    throw new Error('Function not implemented.')
  },
  key: function (index: number): string | null {
    throw new Error('Function not implemented.')
  },
  removeItem: function (key: string): void {
    throw new Error('Function not implemented.')
  }
}
export default cookiesStorage
