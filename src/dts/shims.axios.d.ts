import 'axios'
import { AxiosAdapter, AxiosInstance } from 'axios'

declare module 'axios' {
  interface RetryResult<T = unknown> {
    code: number
    data: T
  }

  export interface AxiosRequestType {
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

  export interface AxiosRequestConfig {
    /**
     * cacheAdapterEnhancer
     * [由于配置了强制更新而发出并缓存的实际请求]
     */
    forceUpdate?: boolean
    /**
     * cacheAdapterEnhancer
     * [此处是因为cacheFlag为cache]
     */
    cache?: boolean | ICacheLike<any>
    /**
     * 是否自定义特定异常处理
     */
    catch?: boolean
    /**
     * 重试
     */
    retry?: {
      /**
       * whether to retry
       */
      needRetry?: boolean
      /**
       * whether to retry fn
       */
      shouldRetry?: (res: RetryResult) => boolean
    }
  }
  /**
   * request 接口规范
   */
  export interface HttpRequesTypeInterface {
    //  baseURL:一个相对 URL，作为所有请求的前缀，每个请求都可以附加 URL
    // headers：可以根据请求设置的自定义标头
    // timeout:请求中止的时间点，通常以毫秒为单位。默认值为0，表示不适用。
    // withCredentials：指示是否应使用凭据进行跨站点访问控制请求。默认值为false.
    // responseType：表示服务器将返回的数据类型，选项包括json（默认）、arraybuffer document、、、text和stream。
    // responseEncoding： 表示用于解码响应的编码。默认值为utf8。
    // xsrfCookieName:用作 XSRF 令牌值的 cookie 的名称，默认值为XSRF-TOKEN.
    // xsrfHeaderName：携带 XSRF 令牌值的 HTTP 标头的名称。默认值为X-XSRF-TOKEN。
    // maxContentLength：定义允许的 HTTP 响应内容的最大大小（以字节为单位）
    // maxBodyLength：定义允许的 HTTP 请求内容的最大大小（以字节为单位）
    baseURL: string
    timeout: number
    adapter: AxiosAdapter
    getConfigParams(): any
    interceptors(instance: AxiosInstance, url: string | number | undefined): any
    request(options: AxiosRequestConfig): any
  }
  /**
   * MyResponse
   */
  export interface MyResponse<T = any> {
    message?: string
    code?: number
    data?: T
  }
}
