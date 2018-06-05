<template>
  <div style="border:2px solid red;padding:20px">
      This is moduleB
      <p>{{textB}}</p>
  </div>
</template>

<script>
export default {
  computed: {
    textB () {
      return this.$store.state.moduleB.count
    }
  }
}
</script>

<style>

</style>
