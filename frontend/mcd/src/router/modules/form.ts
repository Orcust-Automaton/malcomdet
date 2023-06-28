import { Layout } from '../base'

export default {
  path: '/form',
  name: 'Form',
  component: Layout,
  redirect: '/form/base',
  meta: { title: '表单管理', keepAlive: false },
  children: [
    {
      path: '/form/base',
      name: 'FormBase',
      component: () => import('@/views/form/base/index.vue'),
      meta: { title: '微博评论', keepAlive: false }
    },
    {
      path: '/form/step',
      name: 'FormStep',
      component: () => import('@/views/form/step/index.vue'),
      meta: { title: '贴吧评论', keepAlive: false }
    }
  ]
}
