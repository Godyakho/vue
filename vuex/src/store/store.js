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
        getters: {
          updateGetters (state, getters, rootState) {
            return state.count + ' getters ' + rootState.lname
          }
        },
        actions: {
          updateActions ({state, commit, rootState}) {
            // 默认调用模块A的mutations
            commit('updatetextA', '来自moduleA 的 actions')
            // root:true 调用全局等mutations
            // commit('updateCount', {num: 2}, {root: true})
          }
        }
      },
      moduleB: {
        state: {
          count: '2B'
        },
        actions: {
          updateBActions ({ commit }) {
            // B 修改 A 的state
            commit('moduleA/updatetextA', 'moduleB 调用 moduleA 的 mutations', {root: true})
          }
        }
      }
    }
  })
}
