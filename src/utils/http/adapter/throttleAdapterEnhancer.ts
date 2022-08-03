import { AxiosAdapter, AxiosPromise, AxiosRequestConfig } from 'axios'
import LRUCache from 'lru-cache'
import { ICacheLike } from './cacheAdapterEnhancer'
import buildSortedURL from './utils/buildSortedURL'

export type RecordedCache = {
  timestamp: number
  value?: AxiosPromise
}

export type Options = {
  threshold?: number
  cache?: ICacheLike<RecordedCache>
}

export default function throttleAdapterEnhancer(adapter: AxiosAdapter, options: Options = {}): AxiosAdapter {
  const { threshold = 1000, cache = new LRUCache<string, RecordedCache>({ max: 2 }) } = options
  const recordCacheWithRequest = (index: string, config: AxiosRequestConfig) => {
    const responsePromise = (async () => {
      try {
        const response = await adapter(config)
        cache.set(index, {
          timestamp: Date.now(),
          value: Promise.resolve(response)
        })
        return response
      } catch (reason) {
        cache.delete(index)
        throw reason
      }
    })()
    cache.set(index, {
      timestamp: Date.now(),
      value: responsePromise
    })

    return responsePromise
  }

  return config => {
    const { url, method, params, paramsSerializer } = config
    const index = buildSortedURL(url, params, paramsSerializer)
    const now = Date.now()
    const cachedRecord = cache.get(index) || { timestamp: now }
    if (method === 'get') {
      if (now - cachedRecord.timestamp <= threshold) {
        const responsePromise = cachedRecord.value
        if (responsePromise) {
          /* istanbul ignore next */
          // eslint-disable-next-line no-console
          console.info(`[axios-extensions] 节流阀适配 --> url: ${index}`)

          return responsePromise
        }
      }

      return recordCacheWithRequest(index, config)
    }
    return adapter(config)
  }
}
