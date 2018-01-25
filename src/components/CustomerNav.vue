<template>
 <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text" @click="gotohome">Customer Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
        <v-btn flat to="/search"> Search &nbsp;
          <v-icon>table</v-icon>
        </v-btn>
        <v-btn flat to="/add"> Add Customer Data &nbsp;
          <v-icon>add</v-icon>
        </v-btn>

  </v-toolbar>

</template>

<script>

export default {

  methods: {
    gotohome(){
      this.$router.push("search")
    }
  }

}
</script>
