<template>
  <div id="app">
<v-app>
<!--
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
  </v-tabs> -->

   <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text" @click="gotohome"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>

        <v-toolbar-items>
          <v-btn flat to="/dashboard"> Dashboard &nbsp;
            <v-icon>dashboard</v-icon>
          </v-btn>
          <v-btn flat to="/add"> Add Customer Data &nbsp;
            <v-icon>add</v-icon>
          </v-btn>

          <v-btn flat to="/contentsearch"> Box Content&nbsp;
            <v-icon>folder</v-icon>
          </v-btn>
          <v-btn flat to="/confluencesearch"> Confluence Content&nbsp;
            <v-icon>description</v-icon>
          </v-btn>
        </v-toolbar-items>
 </v-toolbar>


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
