<template>
 <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text" @click="gotohome"></v-toolbar-title>
      <v-spacer></v-spacer>

        <v-btn flat to="/contentsearch"> Box Content&nbsp;
          <v-icon>folder</v-icon>
        </v-btn>
        <v-btn flat to="/confluencesearch"> Confluence Content&nbsp;
          <v-icon>description</v-icon>
        </v-btn>

  </v-toolbar>

</template>

<script>

export default {

  methods: {
    gotohome(){
      this.$router.push("contentsearch")
    }
  }

}
</script>
