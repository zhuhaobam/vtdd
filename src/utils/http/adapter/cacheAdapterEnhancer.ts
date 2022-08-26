import { CacheAdapterOptions, ICacheLike, isCacheLike } from '@class/axiosAdapterClass'
import { AxiosAdapter, AxiosPromise } from 'axios'
import LRUCache from 'lru-cache'
import buildSortedURL from '../utils/buildSortedURL'
const FIVE_MINUTES = 1000 * 60 * 5
const CAPACITY = 100
// adapter遵循axios 适配器标准的 axios 适配器在哪里，options是配置缓存的可选配置
// enabledByDefault默认启用boolean=true	 为请求配置中没有明确定义的所有请求启用缓存（例如cache: true）
// cacheFlag缓存标志string='cache'	为 axios 请求中缓存使用的显式定义配置键（flag）
// defaultCache默认缓存	CacheLike	= new LRUCache({ ttl: FIVE_MINUTES, max: 100 })默认情况下将用于存储请求的 CacheLike 实例，除非您使用请求配置定义自定义缓存
// **[此处是因为cacheFlag为cache] { cache: false } //手动禁用缓存，并调用真正的http请求
export default function cacheAdapterEnhancer(adapter: AxiosAdapter, options: CacheAdapterOptions = {}): AxiosAdapter {
  const {
    enabledByDefault = true,
    cacheFlag = 'cache',
    defaultCache = new LRUCache<string, AxiosPromise>({ ttl: FIVE_MINUTES, max: CAPACITY })
  } = options

  return config => {
    const { url, method, params, paramsSerializer, forceUpdate } = config
    const useCache =
      (config as any)[cacheFlag] !== void 0 && (config as any)[cacheFlag] !== null
        ? (config as any)[cacheFlag]
        : enabledByDefault

    if (method === 'get' && useCache) {
      // if had provide a specified cache, then use it instead
      const cache: ICacheLike<AxiosPromise> = isCacheLike(useCache) ? useCache : defaultCache

      // build the index according to the url and params
      const index = buildSortedURL(url, params, paramsSerializer)

      let responsePromise = cache.get(index)

      if (!responsePromise || forceUpdate) {
        responsePromise = (async () => {
          try {
            return await adapter(config)
          } catch (reason) {
            cache.delete(index)
            throw reason
          }
        })()

        // put the promise for the non-transformed response into cache as a placeholder
        cache.set(index, responsePromise)

        return responsePromise
      }

      /* istanbul ignore next */
      if (import.meta.env.VTDD_APP_LOGGER_LEVEL === 'info') {
        // eslint-disable-next-line no-console
        console.info(`[axios-extensions] request cached by cache adapter --> url: ${index}`)
      }

      return responsePromise
    }

    return adapter(config)
  }
}
