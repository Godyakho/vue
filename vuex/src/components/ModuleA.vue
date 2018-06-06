<template>
  <div style="border:2px solid red;padding:20px">
      This is moduleA
      <p>A state: {{textA}}</p>
      <p>B state: {{textB}}</p>
      <p>A Getters: {{updateGetters}}</p>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions
} from 'vuex'
export default {
  mounted () {
    // this.$store.commit('updatetextA', '更改A')
    // this.updatetextA('更改A')
    this['moduleA/updatetextA']('更改A')
    this['moduleA/updateActions']()
    console.log(this['updateGetters'])
    console.log(this.$store)
  },
  methods: {
    ...mapMutations(['moduleA/updatetextA']),
    ...mapActions(['moduleA/updateActions'])
  },
  computed: {
    ...mapState({
      textA: (state) => state.moduleA.count,
      textB: (state) => state.moduleB.count
    }),
    // textA () {
    //   return this.$store.state.moduleA.count
    // }
    ...mapGetters({'updateGetters': 'moduleA/updateGetters'})
  }
}
</script>

<style>

</style>
