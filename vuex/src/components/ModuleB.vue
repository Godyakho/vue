<template>
  <div style="border:2px solid red;padding:20px">
      This is moduleB
      <p>A state: {{textA}}</p>
      <p>B state: {{textB}}</p>
  </div>
</template>

<script>
import {
//   mapActions
} from 'vuex'
export default {
  computed: {
    textA () {
      return this.$store.state.moduleA.count
    },
    textB () {
      return this.$store.state.moduleB.count
    }
  },
  methods: {
    // ...mapActions(['updateBActions'])
  },
  mounted () {
    this.$store.dispatch('updateBActions')
    // this.updateBActions()
    console.log(this.$store)
  }
}
</script>

<style>

</style>
