import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
// import Qs from 'qs'
import { createDiscreteApi } from 'naive-ui'
import { AxiosAdapter } from 'axios'
// import cacheAdapterEnhancer from './adapter/cacheAdapterEnhancer'
import throttleAdapterEnhancer from './adapter/throttleAdapterEnhancer'
import hotAxiosRetry from './hot/hotAxiosRetry'
const { message } = createDiscreteApi(['message'])
// 接口类型和方法
interface BaseType {
  baseURL: string
  timeout: number
  adapter: AxiosAdapter
  getConfigParams(): any
  interceptors(instance: AxiosInstance, url: string | number | undefined): any
  request(options: AxiosRequestConfig): any
}

interface AxiosRequestType {
  baseURL?: string
  url?: string | undefined
  data?: any
  params?: any
  method?: string
  headers?: any
  timeout?: number
  value?: any
  cancelToken?: any
}

class AxiosHttpRequest implements BaseType {
  baseURL: string
  timeout: number
  adapter: AxiosAdapter
  constructor() {
    this.baseURL = import.meta.env.VTDD_APP_BASE_API
    this.timeout = 1500
    this.adapter = throttleAdapterEnhancer(axios.defaults.adapter!)
  }

  // 配置参数
  getConfigParams() {
    return {
      baseURL: this.baseURL,
      timeout: this.timeout,
      // adapter: this.adapter,
      headers: {},
      validateStatus: function (status: number) {
        // 使用validateStatusconfig 选项，您可以定义应该引发错误的 HTTP 代码。
        return ![500, 404].includes(status)
      }
    }
  }

  // 拦截设置
  interceptors(instance: AxiosInstance, url: string | number | undefined) {
    // 请求拦截( axios 的自定义实例中)
    instance.interceptors.request.use(
      (config: AxiosRequestType) => {
        console.log('【' + url + '】@@@@@@aioxs')
        // 添加全局的loading..
        // 请求头携带token
        // config.headers['Authorization'] = 'Bearer ' + 'token666'
        config.headers['Content-Type'] = 'application/json;charset=utf-8'
        // get请求映射params参数
        if (config.method === 'get' && config.params) {
          let url = config.url + '?'
          for (const propName of Object.keys(config.params)) {
            const value = config.params[propName]
            const part = encodeURIComponent(propName) + '='
            if (value !== null && typeof value !== 'undefined') {
              if (typeof value === 'object') {
                for (const key of Object.keys(value)) {
                  const params = propName + '[' + key + ']'
                  const subPart = encodeURIComponent(params) + '='
                  url += subPart + encodeURIComponent(value[key]) + '&'
                }
              } else {
                url += part + encodeURIComponent(value) + '&'
              }
            }
          }
          url = url.slice(0, -1)
          config.params = {}
          config.url = url
        }
        return config
      },
      (error: any) => {
        console.log('【' + url + '】@@@@@@aioxs', error)
        return Promise.reject(error)
      }
    )

    // 响应拦截( axios 的自定义实例中)
    instance.interceptors.response.use(
      (res: any) => {
        console.log('【' + url + '】******aioxs')
        return Promise.resolve(res)
      },
      (error: any) => {
        error.globalErrorProcess = function () {
          if (this.code === 'ERR_BAD_RESPONSE') {
            switch (this.response.status) {
              case 401: // 处理基本 401 错误
                message.error('[ERR_BAD_RESPONSE]' + error.message, { duration: 3000 })
                break
              case 404: // 处理基本 404 错误
                message.error('[ERR_BAD_RESPONSE]' + new Date() + error.message, { duration: 3000 })
                break
              case 403: // 处理基本 403 错误
                message.error('[ERR_BAD_RESPONSE]' + error.message, { duration: 3000 })
                break
              default:
                message.error('[ERR_BAD_RESPONSE]' + this.message, { duration: 3000 })
                break
            }
          } else if (this.code === 'ERR_BAD_REQUEST') {
            switch (this.response.status) {
              case 401: // 处理基本 401 错误
                message.error('[ERR_BAD_REQUEST]' + error.message, { duration: 3000 })
                break
              case 404: // 处理基本 404 错误
                message.error('[ERR_BAD_REQUEST]' + new Date() + error.message, { duration: 3000 })
                break
              case 403: // 处理基本 403 错误
                message.error('[ERR_BAD_REQUEST]' + error.message, { duration: 3000 })
                break
              default:
                message.error('[ERR_BAD_REQUEST]' + this.message, { duration: 3000 })
                break
            }
          } else if (this.code === 'ECONNABORTED') {
            message.error('取消重复请求', { duration: 3000 })
          } else if (this.message === 'Network Error') {
            message.error('网络错误', { duration: 3000 })
          }
          return new Promise(() => {})
          // return Promise.reject(error)
        }
        if (Object.prototype.hasOwnProperty.call(error.config, 'catch') && error.config.catch === true) {
          return Promise.reject(error)
        }
        return error.globalErrorProcess()
      }
    )
  }

  /**
   * 外部调用方法
   * @param options axios请求参数
   * @returns 实例
   */
  request(options: AxiosRequestConfig) {
    const instance = axios.create()
    options = Object.assign(this.getConfigParams(), options)
    hotAxiosRetry(instance, {
      // 失败重试的次数
      retries: 2,
      // 定义是否应在重试之间重置超时（设置为false，后面的重试很可能会被取消）
      shouldResetTimeout: true,
      // 请求之间延迟重试时间（毫秒）
      retryDelay: retryCount => {
        return retryCount * 3000
      },
      // 当重试即将发生时通知的回调
      onRetry: (retryCount, error, requestConfig) => {
        console.log(retryCount, error, requestConfig)
      }
    })
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

// 实例化请求类
const http = new AxiosHttpRequest()

export default http
