<template>
<div>
   <v-toolbar dark color="primary" style="height:72px!important">
      <v-toolbar-title class="white--text">
      </v-toolbar-title>
 <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
  <div>
    <a href="#/contentsearch2/dashboardsearch" class="pypl-logo pypl-logo--white">PayPal</a>
   </div>
   <v-flex xs-4 offset-xs-4>
    <div class="title" style="padding-top:14px;">
          Global Professional Services
     </div>
  <span class="title" style="line-height: 2em !important"> Ask Yoda </span>
 </span>
  </v-flex>
 </v-toolbar>

<v-navigation-drawer
        temporary
        v-model="drawer"
        :mini-variant="mini"
        dark
        absolute
      ripple
      >
        <v-list class="pa-1">
          <v-list-tile v-if="mini" @click.stop="mini = !mini">
            <v-list-tile-action>
              <v-icon>chevron_right</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img src="../assets/logopaypal.png" >
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Menu</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
         <v-list class="pt-0" >
          <v-divider light></v-divider>
          <v-list-tile v-for="item in items" :key="item.title" :to="item.link">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        </v-navigation-drawer>


</div>
</template>
<script>
export default {
name :'Banner',
data(){
  return {
    drawer: null,
      mini: false,
    right: null,
    items: [
        { title: 'Home', icon: 'dashboard', link : '/contentsearch2/dashboardsearch' },
        { title: 'Tools', icon: 'settings' , link: '/tools'},
        { title: 'Postman', icon: 'code' ,link:'/postman'},
      ]
  }
  }
}
</script>
<<style scoped>
.pypl-logo {
		width: 29px;
		height: 34px;
		background-size: cover;
		background-position: left;
		background-clip: content-box;
		background-origin: content-box
	}
.pypl-logo--white {
	display: inline-block;
	width: 136px;
	height: 31px;
	overflow: hidden;
	text-indent: -999em;
	background: transparent url(../assets/ppcom-white.svg) center center no-repeat;
	background-size: 93pt 33px;
	vertical-align: middle;
  padding-top: 5px;
  margin-left: 20px;
	margin-top: -7px;
	position: absolute;
	top: 21px
}



</style>
