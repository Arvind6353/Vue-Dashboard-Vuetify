<template>
<div>
<v-toolbar  app color="primary">
   <v-toolbar-title class="ml-0 pl-3">
      <span class="title google_font hidden-xs-only"></span>
   </v-toolbar-title>
   <v-spacer class="hidden-xs-only"></v-spacer>
</v-toolbar>
<br/>
               <v-select
                label="Start Typing ..."
                v-bind:items="docs"
                :loading="loading"
                v-model="doc"
                light
                solo
                chips
                item-text="name"
                item-value="name"
                max-height="auto"
                autocomplete
                @input.native = "doSearch"
                content-class="test"
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
                  <template v-if="typeof data.item !== 'object'">
                  </template>
                  <template v-else>

                   <v-list-tile-content three-line>

                <v-list-tile-title style="height:30px !important">
                  <v-icon :color="getColor(data.item.name)">
                      {{data.item.name | icon}}
                    </v-icon>
                    &nbsp;&nbsp;&nbsp;
                  <span class=" blue--text text--darken-4">{{data.item.name | uppercase}}
                    </span>
                  </v-list-tile-title>

                      <v-list-tile-sub-title v-if ="data.item.shared_link != null" > <br/>
                        <a target="_blank" style="text-decoration:none" :href="data.item.shared_link.url">View this </a>
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
  name: "confluence",
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      search1: null,
      select: [],
      doc: [],
      docs: []
    };
  },
  methods: {
    doSearch: debounce(function(event) {
      this.loading = true;
      var v = event.target.value;
      console.log("v --", v);
        if (v == "") {
          this.docs = [];
          this.loading = false;
          this.doc = null;
          return;
        }
        if (event.target.value.length > 0) {

            this.$http.get(config.serverUrl+"/search?query="+event.target.value).then(result => {
                this.docs = result.data;
                this.loading = false;
            }, error =>{
                console.log("errror");
                this.loading = false;
          })
        }
    }, 200),
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
</script>
<<style>
.test>.card > ul >li>a {
   height : 100px !important;
}
</style>
