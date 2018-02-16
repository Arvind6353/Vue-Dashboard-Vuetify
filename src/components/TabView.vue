<template>

<div id="tabView">
         <v-tabs
   grow dark v-model="active" >
      <v-tabs-bar style="border-top: 0px #003087 solid !important;">

        <v-tabs-slider color="yellow" ></v-tabs-slider>

      <v-tabs-item  ripple to="/contentsearch2/dashboardsearch">
        <v-icon>dashboard</v-icon>
      &nbsp;&nbsp;<span id="firstTab">PS Dashboard</span>
      </v-tabs-item>

      <v-tabs-item ripple to="/contentsearch2/boxcontent" >
        <v-icon>search</v-icon>
        &nbsp;&nbsp;Box
      </v-tabs-item>

      <v-tabs-item ripple to="/contentsearch2/confluencecontent">
        <v-icon>description</v-icon>
        &nbsp;&nbsp;Confluence
      </v-tabs-item>

      <v-tabs-item  ripple to="/contentsearch2/productcentral">
        <v-icon>new_releases</v-icon>
          &nbsp;&nbsp;Product Central
         </v-tabs-item>


      <v-tabs-item  to="/contentsearch2/developerportal">
        <v-icon>code</v-icon>
          &nbsp;&nbsp;Dev Portal
         </v-tabs-item>


      <v-tabs-item  to="/contentsearch2/mtsfaq">
        <v-icon>help</v-icon>
         &nbsp;&nbsp; MTS FAQ
         </v-tabs-item>

      </v-tabs-bar>


  <v-tabs-items>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  </v-tabs-items>

  </v-tabs>
</div>
</template>

<script>
export default {
name :"tabview",

data (){
    return {
      active : 'tab-0',
      tabs: null,
      tabComponent: 'Dashboard'
    }
  }
}

</script>
<style scoped>
/* override style for tab slider */
.yellow {
    background-color: #003087 !important;
    border-color: #003087 !important;
    border-width: 2px  solid !important;
    height:3px;
}
</style>
