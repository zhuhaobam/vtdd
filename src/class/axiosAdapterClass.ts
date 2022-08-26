import { AxiosPromise } from 'axios'

// Cache方法
export function isCacheLike(cache: any) {
  return !!(
    cache.set &&
    cache.get &&
    cache.delete &&
    typeof cache.get === 'function' &&
    typeof cache.set === 'function' &&
    typeof cache.delete === 'function'
  )
}

// Cache抽象类
export interface ICacheLike<T> {
  get(key: string): T | undefined

  set(key: string, value: T, maxAge?: number): boolean

  delete(key: string): void
}

// Cache脚本类型

export type CacheAdapterOptions = {
  enabledByDefault?: boolean
  cacheFlag?: string
  defaultCache?: ICacheLike<AxiosPromise>
}

// Throttle脚本类型

export type RecordedCache = {
  timestamp: number
  value?: AxiosPromise
}

export type ThrottleAdapterOptions = {
  threshold?: number
  cache?: ICacheLike<RecordedCache>
}
