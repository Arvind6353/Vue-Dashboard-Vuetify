<template>

<div id="app">
    <div
      id="e3"
      style="background-color:white;"
      class="grey lighten-3"

    >
      <v-toolbar dark color="primary">
        <v-toolbar-title class="white--text">{{customerData.customerName}} information</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dismiss">
            <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex xs12 v-for="(value, key , index) in customerData" v-if="key != '_id'">

<!-- start of non-reference cards -->
            <v-card color="white darken-4" class="white--text"
              v-if=" key !='references'"
            >
              <v-card-title>
                <div class="title blue--text text--darken-4">
              {{key | upperCase }}
                  </div>
              </v-card-title>

               <v-card-title>

                <div v-if="key !='products' && key !='country'"
                    class='black--text text--darken-4'
                    style="white-space:word-wrap">{{value}}
                </div>

                <div v-if="key =='products' || key =='country'"
                    class='black--text text--darken-4'
                    style="white-space:word-wrap">{{value | splitter}}
                </div>
               </v-card-title>
            </v-card>
<!-- end of non reference cards -->
<!-- references empty -->
            <v-card color="white darken-4" class="white--text"
              v-if="key =='references' && (value == null || value =='')"
            >
              <v-card-title>
                <div class="title blue--text text--darken-4">
                {{key | upperCase }}
                  </div>
              </v-card-title>
               <v-card-title>
                <div
                    class='black--text text--darken-4'
                    style="white-space:word-wrap">{{value}}
                </div>
               </v-card-title>
            </v-card>
<!-- end of empty references -->

<!-- start of references -->

          <v-card color="white darken-4" class="white--text"
              v-if="key =='references' && value != null && value !=''"
              v-for="(ref,index) in value"
              :key="index"
            >
              <v-card-title>
                <div class="title blue--text text--darken-4">
                {{key | upperCase }}&nbsp;{{index+1}}
                  </div>
              </v-card-title>
               <v-card-title>
                <div
                    class='black--text text--darken-4'
                    style="white-space:word-wrap;"><a style="text-decoration:none" :href="ref" target="_blank"
                    >{{ref}}</a>
                </div>
               </v-card-title>
            </v-card>


<!-- end of references -->
          </v-flex>
        </v-layout>
         <v-btn @click="dismiss">Dismiss</v-btn>
      </v-container>
    </div>
</div>
  <!-- <div id="app">
        <v-toolbar color="purple" dark>
          <v-toolbar-title class="display-1">{{customerData.customerName}} information</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>

          </v-btn>
        </v-toolbar>

<div style="margin:2%;padding:2%;">

<v-card>
            <v-card-title primary-title>
                <div class="headline">Unlimited music now</div>
                <div>Listen to your favorite artists and albums whenever and wherever, online and offline.</div>
            </v-card-title>
</v-card>
</div> -->
        <!-- <v-list three-line subheader>
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
        </v-list> -->

        <!-- <v-divider></v-divider>
         <v-btn @click="dismiss">Dismiss</v-btn>

      </div> -->
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
         document.getElementsByClassName('dialog dialog--active')[0].scrollTop = 0
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
  methods: {
    dismiss() {
       this.$emit("dismiss-view-dialog");
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
#app {
  height:100%;
}
</style>
