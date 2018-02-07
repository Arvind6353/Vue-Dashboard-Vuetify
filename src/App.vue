<template>
  <div id="app">
<v-app>

  <v-tabs fixed icons centered >
    <v-tabs-bar dark color="black">
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tabs-item to="/dashboard">
        <v-icon>dashboard</v-icon>
      Dashboard
      </v-tabs-item>
      <v-tabs-item to="/contentsearch">
        <v-icon>search</v-icon>
        Content Search
      </v-tabs-item>
    </v-tabs-bar>
  </v-tabs>

  <router-view></router-view>
</v-app>
  </div>
</template>

<script>
export default {
  name: "app",
  methods: {
    gotohome() {
      this.$router.push("dashboard");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
