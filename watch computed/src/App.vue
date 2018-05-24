<template>
  <div id="app">
    <Compare />  
    <a href="mailto:email">xxx</a>
  </div>
</template>

<script>
import Compare from './components/Compare'

export default {
  name: 'App',
  components: {
    Compare
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
