// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import store from './store/store'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueRouter)
const createStore = store()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  createStore,
  components: { App },
  template: '<App/>'
})