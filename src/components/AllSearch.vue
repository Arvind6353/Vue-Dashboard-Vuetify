<template>
<div>
  <!--
     -->
  <v-card style=" box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
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
<!--
  style="-webkit-box-shadow: -24px -13px 48px 8px rgba(179,177,177,1);
-moz-box-shadow: -24px -13px 48px 8px rgba(179,177,177,1);
box-shadow: -24px -13px 48px 8px rgba(179,177,177,1);">
  -->
  <!--
    style=" box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"
    -->
<div style=" box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"
   >
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
