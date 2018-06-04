<template>
    <div>
      <p>{{msg}}</p>
      <p></p>
    </div>
</template>

<script>
export default {
  name: 'Aa',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    console.log(this.$store)
  },
  computed: {
    // count () {
    //   return this.$store.state.count
    // }
  }
}
</script>

<style scoped>
</style>
