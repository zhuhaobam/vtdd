export {}
import 'axios'

declare module 'axios' {
  interface RetryResult<T = unknown> {
    code: number
    data: T
  }

  // interface AxiosResponse {
  //   [key: string]: any
  // }
  interface AxiosRequestConfig {
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
}
