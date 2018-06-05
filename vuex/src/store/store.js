import Vuex from 'vuex'
import state from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  return new Vuex.Store({
    strict: isDev,
    state,
    mutations,
    getters,
    actions,
    modules: {
      moduleA: {
        // 模块添加命名空间
        namespaced: true,
        state: {
          count: '1A'
        },
        mutations: {
          updatetextA (state, data) {
            state.count = data
          }
        },
        actions: {

        }
      },
      moduleB: {
        state: {
          count: '2B'
        }
      }
    }
  })
}
