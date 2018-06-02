<template>
  <div >
    this is a.vue
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '我是beforeRouteEnter时要获取的数据id'
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log('a.vue 组件内部 beforeRouterEnter 钩子')
    // 可以一进页面获取需要的数据或赋值   
    next(vm => {
      console.log(vm.id)
    })
  },
  beforeRouteUpdate(to, from, next) {
    console.log('a.vue 组件内部 beforeRouterUpdate 钩子')
    // 页面可根据params不一样 例如:count不同 展示不同页面效果
    // 在相同的路径下，mounted 只触发第一次
    console.log(this.$route)
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log('a.vue 组件内部 beforeRouterLeave 钩子')
    // 确认是否要离开当前页的操作
    if(global.confirm('你确定离开')){
      next()
    }    
  },
  mounted() {
    console.log('a.vue mounted')
  }
}
</script>

<style>

</style>

