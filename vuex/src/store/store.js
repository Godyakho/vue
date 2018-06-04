import Vuex from 'vuex'
import state from './state/state'

export default () => new Vuex.Store({
  state,
  mutations: {
    updateCount (state, num) {
      state.count = num
    }
  }
})
