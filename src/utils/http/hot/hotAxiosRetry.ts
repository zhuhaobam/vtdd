import { AxiosInstance, AxiosStatic, AxiosError } from 'axios'
import axiosRetry, { IAxiosRetryConfig } from 'axios-retry'

/**
 *  1、 自定义重试接口，在config里面配置 shouldRetry: (res: RetryResult) => res.code === 200
 *      res.code为用户自定义接口返回的code
 *  2、 自定义重试接口，在config里面配置 needRetry: true 当前接口需要重试，如果不配置，接口错了也不会重试
 *  */

const hotAxiosRetry = (instance: AxiosStatic | AxiosInstance, config: IAxiosRetryConfig = {}) => {
  instance.interceptors.response.use(response => {
    const { data, config, request } = response
    if (config?.retry?.shouldRetry?.(data)) {
      console.log('自定义【异常】条件重试')
      config.retry.needRetry = true
      return Promise.reject(new AxiosError(`自定义条件重试`, data.code, config, request, response))
    }
    return Promise.resolve(response)
  })
  axiosRetry(instance, {
    ...config,
    retryCondition: error => {
      console.log('网络、请求或者自定义条件重试')
      return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.config?.retry?.needRetry || false
    }
  })
}

export default hotAxiosRetry
