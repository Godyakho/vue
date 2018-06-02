<template>
  <div id="app">
   <h1>Title: this is App.vue</h1>  
    <router-view />
    <router-link to="/Aa/123">to Aa/123</router-link>
    <router-link to="/Aa/456">to Aa/456</router-link>  
    <router-link to="/Aa/Test">to Aa/test</router-link>
    <br>
    <router-link to="/Bb">to Bb</router-link>
    <br>
    <router-link to="/redirect/123?a=1&b=2">to redirect</router-link>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
