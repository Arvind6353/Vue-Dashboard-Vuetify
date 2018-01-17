<template>
  <div id="app">
<v-app>
 <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text" @click="gotohome">Customer Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
        <v-btn flat to="/search"> Search &nbsp;
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn flat to="/add"> Add Customer Data &nbsp;
          <v-icon>add</v-icon>
        </v-btn>

  </v-toolbar>


<!-- navbar-1.vue -->
<br/>
  <router-view></router-view>
  </v-app>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods : {
    gotohome(){
      this.$router.push("search")
    }
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

}
</style>
