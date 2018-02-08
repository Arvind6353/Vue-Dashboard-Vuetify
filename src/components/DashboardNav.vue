<template>
<div></div>
 <!-- <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text" @click="gotohome"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>

        <v-toolbar-items>
          <v-btn flat to="/dashboard"> Search &nbsp;
            <v-icon>list</v-icon>
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
 </v-toolbar> -->

</template>

<script>

export default {

  methods: {
    gotohome(){
      this.$router.push("dashboard")
    }
  }

}
</script>
