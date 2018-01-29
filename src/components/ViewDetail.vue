<template>
  <v-card>
        <v-toolbar color="purple" dark>
          <v-toolbar-title class="display-1">{{customerData.customerName}} information</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>

          </v-btn>
        </v-toolbar>
        <v-list three-line subheader>
          <v-list-tile v-for="(value, key , index) in customerData"  v-if="key != '_id'">
            <v-list-tile-content v-if="key !='products' && key !='country' && key !='references' ">
              <v-list-tile-title class="title" ><span class="blue--text text--darken-4">{{key | upperCase }}</span></v-list-tile-title>
              <v-list-tile-title class='black--text text--darken-2' style="white-space:word-wrap">{{value}}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-content v-if="key =='products' || key =='country'">
              <v-list-tile-title class="title" ><span class="blue--text text--darken-4">{{key | upperCase }}</span></v-list-tile-title>
              <v-list-tile-title class='black--text text--darken-2' style="white-space:word-wrap">{{value | splitter}}</v-list-tile-title>
            </v-list-tile-content>
            <div  v-if="key =='references'">
              <div v-if="value == null || value ==''">
                 <v-list-tile-content>
                  <v-list-tile-title class="title" ><span class="blue--text text--darken-4">{{key | upperCase }}</span></v-list-tile-title>
                  <v-list-tile-title class='black--text text--darken-2' style="white-space:word-wrap">{{value}}</v-list-tile-title>
                </v-list-tile-content>
              </div>
              <div v-else>
                <v-list-tile-content v-for="(ref,index) in value">
                      <v-list-tile-title class="title" ><span class="blue--text text--darken-4">{{key | upperCase }}&nbsp;{{index+1}}</span></v-list-tile-title>
                      <v-list-tile-title class='black--text text--darken-2' style="white-space:word-wrap"><a :href="ref" target="_blank">{{ref}}</a></v-list-tile-title>
                <br/>
                </v-list-tile-content>
              </div>
            </div>

        </v-list-tile>
        </v-list>

        <v-divider></v-divider>
      </v-card>
</template>

<script>
export default {
  name: 'viewDetail',
  props: ["cusData"],
  watch: {
    'cusData':{
      handler: function (val, oldVal) {
        console.log('watch', val)
        let obj = val;
        this.customerData = Object.assign({},obj);
      },
      deep: true
    }
  },
  data () {
    return {
      customerData :{},
      msg: 'Welcome to Your Vue.js App',
      notifications: false,
        sound: true,
        widgets: false
    }
  },
  filters: {
    upperCase: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.toUpperCase()
    }
  }
}
window.setTimeout(()=>{
  window.scrollTo(0,0);
},1000);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
