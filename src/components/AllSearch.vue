<template>
<div>
  <v-card style="
     box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);">
      <v-card-title style="padding-top: 0px!important;">
        <span class="title"></span>
        <v-text-field
          append-icon="search"
          label="Start Typing ..."
          single-line
          hide-details
          @input.native="updateSearch"
          v-model="search"
        ></v-text-field>
      </v-card-title>
  </v-card>


<br/><br/>
<div>
  <tabview :searchParam="search"></tabview>
</div>

</div>
</template>

<script>
export default {
  name :'allsearch',
data(){
  return {
    search : null
  }
},
methods:{
  updateSearch (){
    this.$store.commit('setsearch', this.search)
  }
}
}
</script>
<style scoped>
</style>
