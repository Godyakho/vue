// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


Vue.config.productionTip = false

// 全局router 钩子

router.beforeEach((to, from ,next) => {
  // 进行数据校验,判断是否是登陆状态
  // if(to.fullPath === '/Aa') {
  //   next({path:'/Bb'})
  // } else {
  //   next()
  // }
  console.log('全局 beforeEach')
  next()
})

router.beforeResolve((to,from,next) => {
  console.log('全局 beforeResolve')
  next()
})

router.afterEach((to,from) => {
  console.log('全局 after离开')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
