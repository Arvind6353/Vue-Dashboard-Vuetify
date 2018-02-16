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
<banner></banner>


<!--
   <v-toolbar dense color="cyan lighten-5">
      <v-toolbar-title class="white--text" @click="gotohome">
      </v-toolbar-title>
      <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn flat to="/home"> Dashboard &nbsp;
            <v-icon>dashboard</v-icon>
          </v-btn>
          <v-btn flat to="/add"> Add Customer Data &nbsp;
            <v-icon>add</v-icon>
          </v-btn>

          <v-btn flat to="/contentsearch2"> Search Content&nbsp;
            <v-icon>search</v-icon>
          </v-btn>

        </v-toolbar-items>
 </v-toolbar>
-->
<div id="container">  <router-view></router-view> </div>
</v-app>
  </div>
</template>

<script>

export default {
  name: "app"
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
#container {
  margin: 2% 2% 0% 5% ;

}
/* override style for active tab */
  li.tabs__li >a.tabs__item--active {
    color: #1976D2  !important;
  }
  .tabs__li {
        border-right: 1px solid !important;

  }
</style>
