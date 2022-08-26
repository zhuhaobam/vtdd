import qs from 'qs'

// https://github.com/ljharb/qs
export function axiosGetObj2Params<T>(params: T): string {
  return qs.stringify(params, { addQueryPrefix: true, sort: (a, b) => a.localeCompare(b) })
}
