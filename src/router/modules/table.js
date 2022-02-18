/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complexTable',
  name: '管理',
  meta: {
    title: '管理',
    icon: 'wechat'
  },
  alwaysShow: true,
  opened: true,
  children: [
    {
      path: 'dynamic-table',
      component: () => import('@/views/table/dynamic-table/index'),
      name: 'DynamicTable',
      meta: { title: '商品维护' }
    },
    {
      path: 'drag-table',
      component: () => import('@/views/table/drag-table'),
      name: 'DragTable',
      meta: { title: '订单信息' }
    },
    {
      path: 'inline-edit-table',
      component: () => import('@/views/table/inline-edit-table'),
      name: 'InlineEditTable',
      meta: { title: '用户信息' }
    },
    {
      path: 'complexTable',
      component: () => import('@/views/table/complexTable'),
      name: 'ComplexTable',
      meta: { title: '访问列表' }
    }
  ]
}
export default tableRouter
