/**
 * @description 获取assets静态资源
 *
 **/
const getAssetsFile = (url: string) => {
  return new URL(`../assets/img/${url}`, import.meta.url).href
}

/**
 * @description 获取assets静态资源
 *
 **/
const getAssetsDirFile = (url: string) => {
  return new URL(`../assets/${url}`, import.meta.url).href
}

export { getAssetsFile, getAssetsDirFile }
