<template>
  <div id="app">
<v-app>
 <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text">Customer Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn icon to="/search">
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon to="/add">
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar-items>
  </v-toolbar>


<!-- navbar-1.vue -->
<br/>
  <router-view></router-view>
  </v-app>
  </div>
</template>

<script>
export default {
  name: 'app'
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
