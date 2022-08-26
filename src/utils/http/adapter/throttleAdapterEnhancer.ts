import { RecordedCache, ThrottleAdapterOptions } from '@class/axiosAdapterClass'
import { AxiosAdapter, AxiosRequestConfig } from 'axios'
import LRUCache from 'lru-cache'
import buildSortedURL from '../utils/buildSortedURL'
//threshold临界点number默认值1000	限制请求调用到的毫秒数
// cache缓存CacheLike	new LRUCache({ max: 10 }) 将用于存储限制请求的 CacheLike 实例
export default function throttleAdapterEnhancer(
  adapter: AxiosAdapter,
  options: ThrottleAdapterOptions = {}
): AxiosAdapter {
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
          /* istanbul ignore next */
          if (import.meta.env.VTDD_APP_LOGGER_LEVEL === 'info') {
            // eslint-disable-next-line no-console
            console.info(`[axios-extensions] 节流阀适配 --> url: ${index}`)
          }

          return responsePromise
        }
      }

      return recordCacheWithRequest(index, config)
    }
    return adapter(config)
  }
}
