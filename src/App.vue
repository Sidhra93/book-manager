<template>
  <div id="app">
    <div class="my-nav">
      <router-link to="/">
        Home
      </router-link>
      <router-link to="/search">
        Search
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
  .my-nav {
    width: 500px;
    margin-top: 10px;
    margin-bottom: 20px;
    margin-left: 30px;
  }
  a {
    margin-right: 10px
  }
</style>
