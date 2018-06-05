<template>
    <div>
      <p>{{msg}}</p>
      <p>{{count}}</p>
      <p>{{fullname}}</p>
      <router-link to='/ma'> ModuleA </router-link>
      <router-link to='/mb'> ModuleB </router-link>
      <router-view />
    </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
export default {
  name: 'Aa',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    // 虽然可以直接修改state，但vuex就是规范避免这种操作，可以在store 加入 strict:true 来规范
    // this.$store.state.count = 1
    // this.$store.commit('updateCount', {num: 2, num2: 3})  没有map辅助函数时的写法
    this.updateCount({num: 2, num2: 3})
    // 调用action 用dispatch
    // this.$store.dispatch('updateCountAsync', {num: 20, num2: 30, time: 3000}) 没有map辅助函数时的写法
    this.updateCountAsync({num: 20, num2: 30, time: 3000})
  },
  methods: {
    ...mapMutations(['updateCount']),
    ...mapActions(['updateCountAsync'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters({fullname: 'fullName'})
    // 下面是没有map辅助函数的写法
    // count () {
    //   return this.$store.state.count
    // },
    // fullname () {
    //   return this.$store.getters.fullName
    // }
  }
}
</script>

<style scoped>
</style>
