export default {
  // mutation 是同步代码，action 是异步代码
  updateCountAsync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', {num: data.num, num2: data.num2})
    }, data.time)
  }
}
