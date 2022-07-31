import { AxiosAdapter, AxiosResponse } from 'axios'

declare module 'axios' {
  interface AxiosRequestConfig {
    retryTimes?: number
  }
}

export type Options = {
  times?: number
}

export default function retryAdapterEnhancer(adapter: AxiosAdapter, options: Options = {}): AxiosAdapter {
  const { times = 2 } = options

  return async config => {
    const { retryTimes = times } = config

    let timeUp = false
    let count = 0
    const request = async (): Promise<AxiosResponse> => {
      try {
        return await adapter(config)
      } catch (e) {
        timeUp = retryTimes === count
        if (timeUp) {
          throw e
        }

        count++

        /* istanbul ignore next */
        // eslint-disable-next-line no-console
        console.info(`[axios-extensions] 重试适配 --> url: ${config.url} , time: ${count}`)

        return request()
      }
    }

    return request()
  }
}
