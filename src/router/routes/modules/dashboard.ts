import { LAYOUT } from '@/router/constants'
import { AppRouteRecordRaw } from '@/types/router'
import SvgIcon from '@components/SvgIcon/index.vue'

const dashboard: AppRouteRecordRaw = {
  orderBy: 0,
  path: '/dashboard',
  name: 'Dashboard',
  redirect: '/dashboard/analysis',
  component: LAYOUT,
  meta: {
    title: 'Dashboard',
    icon: h(SvgIcon, { name: 'color' })
  },
  children: [
    {
      path: 'analysis',
      name: 'DashboardAnalysis',
      component: () => import('@/views/dashboard/analysis/index.vue'),
      meta: {
        title: '分析页',
        icon: h(SvgIcon, { name: 'color' })
      }
    },
    {
      path: 'workbench',
      name: 'DashboardWorkbench',
      component: () => import('@/views/dashboard/workbench/index.vue'),
      meta: {
        title: '工作台',
        icon: h(SvgIcon, { name: 'color' })
      }
    }
  ]
}

export default dashboard
