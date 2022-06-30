import { LAYOUT } from '@/router/constants'
import { AppRouteRecordRaw } from '@/types/router'
import SvgIcon from '@components/SvgIcon/index.vue'

const document: AppRouteRecordRaw = {
  orderBy: 20,
  path: '/document',
  name: 'Document',
  component: LAYOUT,
  meta: {
    title: '文档',
    icon: h(SvgIcon, { name: 'lang' }),
    noPerm: true
  },
  children: [
    {
      path: 'vue',
      name: 'DocumentVue',
      component: () => import('@/views/document/vue/index.vue'),
      meta: {
        title: 'Vue',
        icon: h(SvgIcon, { name: 'lang' })
      }
    },
    {
      path: 'vite',
      name: 'DocumentVite',
      component: () => import('@/views/document/vite/index.vue'),
      meta: {
        title: 'Vite',
        icon: h(SvgIcon, { name: 'lang' })
      }
    },
    {
      path: 'naive',
      name: 'DocumentNaive',
      component: () => import('@/views/document/naive/index.vue'),
      meta: {
        title: 'Naive',
        icon: h(SvgIcon, { name: 'lang' })
      }
    },
    {
      path: 'linknaive',
      name: 'DocumentLink',
      component: () => '',
      meta: {
        title: 'NaiveUI文档(外链)',
        url: 'https://www.naiveui.com',
        icon: h(SvgIcon, { name: 'lang' })
      }
    }
  ]
}

export default document
