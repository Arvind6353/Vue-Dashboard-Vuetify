<template>
<div>

               <v-select
                label="Start Typing ..."
                v-bind:items="docs"
                :loading="loading"
                v-model="doc"
                dark
                chips
                item-text="name"
                item-value="name"
                autocomplete
                max-height="450"
                @input.native = "doSearch"
                content-class="test"
                :overflow="true"
                :clearable="true"
              >
                <template slot="selection" slot-scope="data">

                  <v-chip
                    @input="data.parent.selectItem(data.item)"
                    :selected="data.selected"
                    class="chip--select-single"
                    :key="JSON.stringify(data.item)"
                  >
                   {{data.item.name | uppercase}}
                   <v-icon
                          @click="closeThis">close
                    </v-icon>

                  </v-chip>
                </template>

                <template slot="item" slot-scope="data">

                  <template>

                   <v-list-tile-content three-line>

                      <v-list-tile-title style="height:25px !important">
                          <v-icon :color="getColor(data.item.name)">
                              {{data.item.name | icon}}
                          </v-icon>
                            &nbsp;
                          <span class=" black--text text--darken-4">{{data.item.name | uppercase}} {{data.item.idx}}
                          </span>
                        </v-list-tile-title>

                        <v-list-tile-sub-title v-if ="data.item.url != null">

                          <a target="_blank" class="blue--text text--darken-4"style="text-decoration:none;margin-left:35px!important;" :href="data.item.url">View </a>

                          <a @click="copy(data.item.url)" href="#" class="blue--text text--darken-4" style="text-decoration:none;margin-left:10px!important;">Copy link</a>

                          </v-list-tile-sub-title>

                          <v-list-tile-sub-title v-else>
                            <span class="blue--text text--darken-4" style="margin-left:35px!important;">No Link Found</span>
                          </v-list-tile-sub-title>

                  </v-list-tile-content>

                  </template>
                </template>
               </v-select>

</div>
</template>

<script>
import debounce from "debounce";
import config from '../config'

export default {
  name: "ContentSearch",
  data() {
    return {
      loading: false,
      doc: [],
      docs: []
    };
  },
  watch: {
    'doc':{
      handler: function (val, oldVal) {
        console.log('watch', val)
        if(!val || val.length == 0){
          this.docs = [];
          return;
       }
      },
      deep: true
    }
  },
  methods: {
    copy : function(url){
      var aux = document.createElement("input");
      aux.setAttribute("value", url);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
    },
    doSearch: debounce(function(event) {
      this.loading = true;
      var v = event.target.value;
      console.log("val --", v);
        if (v == "") {
          this.docs = [];
          this.loading = false;
          this.doc = null;
          return;
        }
        if (event.target.value.length > 0) {

            this.$http.get(config.serverUrl+"/customer/box/"+event.target.value).then(result => {

               this.docs = result.data.map((entry,index) => {
                 return { name : entry.name, id: entry.id, url : entry.url, idx:index }
               });
              console.log(this.docs.length)
               this.loading = false;

            }, error =>{
                console.log("errror");
                this.loading = false;
          })
        }
    }, 4000),
    closeThis() {
      this.docs = [];
      this.doc = null;
    },
    getColor( value){
      if (!value) return ''
      var iconType = value.split('.')[1].trim();
      if(iconType == 'docx'){
          return  'blue darken-2'
      } else {
        return 'red'
      }

    }
  },
  filters: {
    icon: function (value) {
      if (!value) return ''
      var iconType = value.split('.')[1].trim();
      if(iconType == 'docx'){
          return  'fa fa-file-word-o fa-x'
      } else {
 return 'fa fa-file-powerpoint-o fa-x'
      }

    }
  }
};

function myFunction() {
  var aux = document.createElement("input");
  aux.setAttribute("value", document.getElementById(elementId).href);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
}


</script>
<style >
.test>.card > ul >li>a {
   height : 70px !important;
}
.input-group--autocomplete .input-group__input{
      background: #424242 !important;
      height : 70px !important;

}

.input-group--autocomplete > label {
  vertical-align:  middle !important;
  margin-top:10px;
}
</style>
