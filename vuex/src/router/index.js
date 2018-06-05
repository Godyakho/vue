import Aa from '@/components/Aa'
import VueRouter from 'vue-router'

import ModuleA from '@/components/ModuleA'
import ModuleB from '@/components/ModuleB'

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Aa,
      children: [
        {
          path: 'ma',
          component: ModuleA
        },
        {
          path: 'mb',
          component: ModuleB
        }
      ]
    }
  ]
})
