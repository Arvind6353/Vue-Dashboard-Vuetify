<template>
<div>
  <v-card style="
    box-shadow: rgba(0, 0, 0, 0.3) -20px -5px 38px, rgba(0, 0, 0, 0.22) 10px 15px 12px;">
      <v-card-title style="padding-top: 0px!important;">
        <span class="title"></span>
        <v-text-field
          append-icon="search"
          label="Search for products, solutions, integrations, troubleshooting, postman scripts, FAQ and many more ..."
          single-line
          hide-details
          @input.native="updateSearch"
          v-model="search"
        ></v-text-field>
      </v-card-title>
  </v-card>


<br/><br/>
<div style="-webkit-box-shadow: -24px -13px 48px 8px rgba(179,177,177,1);
-moz-box-shadow: -24px -13px 48px 8px rgba(179,177,177,1);
box-shadow: -24px -13px 48px 8px rgba(179,177,177,1);">
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
