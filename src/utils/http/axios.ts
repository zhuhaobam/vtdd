import axios, {
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosRequestType,
  HttpRequesTypeInterface
} from 'axios'
// import { createDiscreteApi } from 'naive-ui'
import { AxiosAdapter } from 'axios'
import cacheAdapterEnhancer from './adapter/cacheAdapterEnhancer'
import throttleAdapterEnhancer from './adapter/throttleAdapterEnhancer'
import retryInterceptorsResponse from './interceptors/retryInterceptorsResponse'
import { axiosGetObj2Params } from './utils/params'
// const { message } = createDiscreteApi(['message'])
// message.info('axios.page')
const handleCode = (code: any, msg: any) => {
  console.log('handleCode', code, msg)
}

class AxiosHttpRequest implements HttpRequesTypeInterface {
  baseURL: string
  timeout: number
  adapter: AxiosAdapter
  constructor() {
    this.baseURL = import.meta.env.VTDD_APP_BASE_API
    this.timeout = 1500
    // adapters的模块是处理分派请求并在Promise收到响应后处理返回的模块。
    // https://github.com/kuitos/axios-extensions
    this.adapter = throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter!))
  }

  // 配置参数
  getConfigParams() {
    return {
      baseURL: this.baseURL,
      timeout: this.timeout,
      adapter: this.adapter,
      headers: {},
      validateStatus: function (status: number) {
        // 使用validateStatusconfig 选项，您可以定义应该引发错误的 HTTP 代码。
        return ![500, 404].includes(status)
      }
    }
  }

  // 拦截设置
  interceptors<U = any>(instance: AxiosInstance, url: string | number | undefined) {
    // 请求拦截( axios 的自定义实例中)
    instance.interceptors.request.use(
      (config: AxiosRequestType) => {
        // 添加全局的loading..
        // 请求头携带token
        config.headers.Authorization = 'Bearer ' + 'token666'
        config.headers['Content-Type'] = 'application/json;charset=utf-8'
        // get请求映射params参数
        if (config.method === 'get' && config.params) {
          config.url = config.url + axiosGetObj2Params(config.params)
          config.params = {}
        }
        return config
      },
      (error: any) => {
        return Promise.reject(error)
      }
    )

    // 响应拦截( axios 的自定义实例中)
    instance.interceptors.response.use(
      (res: any) => {
        const myData: U = res
        return Promise.resolve(myData)
      },
      (error: any) => {
        const { response, message } = error
        if (error.response && error.response.data) {
          const { status, data } = response
          handleCode(status, data.msg || message)
        } else {
          let { message } = error
          if (message === 'Network Error') {
            message = '后端接口连接异常'
          }
          if (message.includes('timeout')) {
            message = '后端接口请求超时'
          }
          if (message.includes('Request failed with status code')) {
            const code = message.substr(message.length - 3)
            message = '后端接口' + code + '异常'
          }
          console.log(message || `后端接口未知异常`, 'error')
        }
        return Promise.reject(error)
      }
    )
  }

  /**
   * 外部调用方法
   * @param options axios请求参数
   * @returns 实例
   */
  request<U = any>(options: AxiosRequestConfig): AxiosPromise<U> {
    const instance = axios.create()
    options = Object.assign(this.getConfigParams(), options)
    retryInterceptorsResponse(instance, {
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
    this.interceptors<U>(instance, options.url)
    return instance(options)
  }
}

// 实例化请求类
const http = new AxiosHttpRequest()

export default http
