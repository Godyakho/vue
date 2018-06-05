<template>
  <div style="border:2px solid red;padding:20px">
      This is moduleA
      <p>{{textA}}</p>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations
} from 'vuex'
export default {
  mounted () {
    console.log(this.$store)
    // this.$store.commit('updatetextA', '更改A')
    // this.updatetextA('更改A')
    this['moduleA/updatetextA']('更改A')
  },
  methods: {
    ...mapMutations(['moduleA/updatetextA'])
  },
  computed: {
    ...mapState({
      textA: (state) => state.moduleA.count
    })
    // textA () {
    //   return this.$store.state.moduleA.count
    // }
  }
}
</script>

<style>

</style>
