import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

import Redirect from '@/components/redirect'
import Aa from '@/components/a'
import Bb from '@/components/b'
import Test from '@/components/test'

export default new Router({
  mode: 'history',
  base: '/god/',
  linkActiveClass: 'god-active',
  linkExactActiveClass: 'god-exactactive-active',
  // 滚动条位置自定义
  scrollBehavior(to,from,position){
    return position || { x:0,y:0 }
  },
  // 提供自定义查询字符串的解析/反解析函数。覆盖默认行为。
  // parseQuery(query){
  //  //http://localhost:8080/god/Aa?a=1&&b=2
  // },
  // stringifyQuery(obj){},
  
  // 当浏览器不支持 history.pushState 控制路由是否应该回退到 hash 模式
  fallback: true,
  routes: [
    {
      path: '/',
      redirect: '/redirect'
    },
    {
      path: '/redirect',
      component: Redirect,
      // 路由守卫里操作meta
      meta: {
        title: '这是默认页',
        content: 'disable'
      }
    },
    {
      path: '/Aa',
      component: Aa,
    },
    {
      path: '/Aa/test',
      component: Test
    },
    {
      path: '/Bb',
      component: Bb,
      // 子路由
      children: [
        {
          path: 'test',
          component: Test
        }
      ]
    }
  ]
})
