<template>
<div id="app">

  <ContentSearchNav></ContentSearchNav>


  <v-card>
      <v-card-title>
        <span class="title"></span>
        <v-text-field
          append-icon="search"
          label="Start Typing ..."
          single-line
          hide-details
          v-model="search"
          @input.native="loadData"

        ></v-text-field>
      </v-card-title>


<br/>
<!--
  {{pagination}} <br/> -->
     <!-- v-bind:search="search" -->
     <v-data-table
        v-model="selected"
        v-bind:headers="headers"
        v-bind:items="items"
        v-bind:pagination.sync="pagination"
        item-key="name"
        class="elevation-1"
        :loading="loading"
        hide-actions
      >

      <template slot="headers" slot-scope="props">
        <tr>
          <th v-for="header in props.headers" :key="header.text"
             :class="[ !header.disableSort ? 'column sortable' :'' ,
                       !header.disableSort && pagination.descending ? 'desc' : 'asc',
                       !header.disableSort && header.value === pagination.sortBy ? 'active' : ''
                    ]"
             @click="!header.disableSort && changeSort(header.value)"
          >
            <v-icon v-if="!header.disableSort">arrow_upward</v-icon>
            <span class="heading blue--text text--darken-4">{{ header.text }}</span>
          </th>

        </tr>
      </template>



      <template slot="items" slot-scope="props">
        <tr :active="props.selected" >

          <td>
             <v-icon :color="getColor(props.item.name)">
                              {{props.item.name | icon}}
                          </v-icon>
            &nbsp;&nbsp; {{ props.item.name }}</td>
          <td>{{ props.item.id }}</td>
          <td>
            <span class="blue--text text--darken-4">
            {{ props.item.url | urlcheck}}
            </span>
            </td>
        </tr>
      </template>

      <template slot="no-data">
        <v-alert :value="true" :color="loadingColor" :icon="loadingIcon">
          {{loadingMsg}}
        </v-alert>
      </template>

    <template slot="no-results">
        <v-alert :value="true" :color="loadingColor" :icon="loadingIcon">
          Loading More data
        </v-alert>
      </template>



    </v-data-table>

<br/><v-card-title>
<v-flex xs3>
            <v-select
              v-bind:items="[5,10,20,25]"
              v-model="pagination.rowsPerPage"
              label="Items Per Page"
              class="input-group--focused"
            ></v-select>
    </v-flex>
    <v-flex offset-xs-2>
     <v-pagination v-model="pagination.page" :length="pages" :circle="true"
     :total-visible="15"
     ></v-pagination>
    </v-flex>
</v-card-title>
<br/>
<br/>
    </v-card>
  </div>

</template>


<script>
import config from '../config'
import debounce from "debounce";


export default {

  data () {
    return {
      pagination: {
        sortBy: 'name',
        rowsPerPage : 25
      },
      totalItems : 0,
      loadingMsg: 'No data found',
      loadingColor: 'red',
      loadingIcon: 'warning',
      search: '',
      selected: [],
      loading: false,
      item: {},
      cusData:{},
      delData: {},
      headers: [
        {
          text: 'TITLE',
          value: 'name'
        },
        { text: 'DOC ID', value: 'id' },
        { text: 'URL', value: 'url' }

      ],
      items: []
    }
  },
//  watch: {
//     pagination: {
//       handler (newVal) {
//         console.log("new vla ", newVal);
//       }
//     }
//   },

  mounted () {
    // this.loadData();
  },

  filters: {
    multicountry: function (value) {
      if(value && value.length > 1) return "Multi Country";
      if(!value) return '';
      return value.join(',');
    }
  },
  computed: {
    pages () {
      var newVal = this.pagination;

      if(newVal.rowsPerPage * newVal.page > this.items.length && newVal.page !=1 &&

        newVal.rowsPerPage * newVal.page < this.totalItems ){
          //let offset = parseInt(this.totalItems/this.items.length);
          let offset = 200*Math.round(this.items.length/200);
          this.callApi(offset);

        }

      return this.pagination.rowsPerPage ? Math.ceil(this.totalItems / this.pagination.rowsPerPage) : 0
    }
  },

  methods: {
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
    loadData : debounce(function(event,offset) {

      this.pagination.totalItems = 0;
      this.pagination.page = 1;
      this.pagination.sortBy = "name";
      this.pagination.descending = false;
      this.totalItems = 0;
      this.items = [];
      if(!offset){
          offset = 0;
        }
      this.callApi(offset);
    },1000),

    callApi(offset){

      if(!offset){
          offset = 0;
        }
      this.loadingColor ="success";
      this.loadingIcon = "info";
      this.loadingMsg = "Loading Data";
      this.getCustomerData(this.search, offset)
        .then(result => {
            var data = result.data;
            if(data) {
              this.pagination.totalItems = data.totalItems;
              this.totalItems = data.totalItems;

              this.items = [... this.items,  ...data.searchResults.map((entry,index) => {
                 return { name : entry.name, id: entry.id, url : entry.url, idx:index }
               })]
            }
            this.loading = false
            if(!this.items || this.items.length == 0) {
              this.loadingMsg = "No data found";
              this.loadingColor = "red";
              this.loadingIcon = "warning";
            }
      }).catch(error => {
          this.loading = false;
          this.items = [];
          this.totalItems = 0;
          this.loadingMsg = "Some Error Occurred . Please try again!";
          this.loadingColor = "red";
          this.loadingIcon = "warning";
          console.error(error);
          //this.$router.push("errorpage");
        });

    },

    getCustomerData (param, offset) {
        if(!param) {
          param = "search"
        }
        this.loading = true
        return this.$http.get(encodeURI(config.serverUrl+"/customer/box/"+param+"?offset="+offset))
    },
    getColor( value){
      if (!value) return ''

      var reversedStr = value.split("").reverse().join("");
      var iconType = reversedStr.split('.')[0].split("").reverse().join("").trim();
      if(iconType == 'docx' || iconType == 'doc'){
          return  'blue darken-2'
      } else if(iconType == 'ppt' || iconType == 'pptx') {
          return 'red'
      } else if(iconType == 'xls' || iconType == 'xlsx' || iconType == 'xlsm') {
          return 'green darken-2'
      } else if(iconType == 'js' || iconType == 'json') {
          return 'black darken-2'
      } else if(iconType == 'css') {
          return 'pink darken-2'
      } else if(iconType == 'py') {
          return 'black darken-2'
      } else if(iconType == 'html') {
          return 'blue darken-2'
      } else if(iconType == 'text' || iconType == 'txt') {
          return "blue lighten-1"
      }  else if(iconType == 'pdf') {
          return "red lighten-1"
      } else if ( iconType == 'msg') {
        return "black"
      } else {
        return "black lighten-2"
      }


    }
  },
  filters: {
    icon: function (value) {
      if (!value) return ''

      var reversedStr = value.split("").reverse().join("");
      var iconType = reversedStr.split('.')[0].split("").reverse().join("").trim();

      if(iconType == 'docx' || iconType == 'doc'){
          return  'fa fa-file-word-o fa-x'
      } else if(iconType == 'ppt' || iconType == 'pptx') {
          return 'fa fa-file-powerpoint-o fa-x'
      } else if(iconType == 'xls' || iconType == 'xlsx' || iconType == 'xlsm') {
          return 'fa fa-file-excel-o fa-x'
      }  else if(iconType == 'js' || iconType == 'json') {
          return 'fa fa-file-code-o fa-x'
      } else if(iconType == 'css') {
          return 'fa fa-css3 fa-x'
      } else if(iconType == 'py') {
          return 'fa fa-file-code-o fa-x'
      } else if(iconType == 'html') {
          return 'fa fa-html5 fa-x'
      } else if(iconType == 'text' || iconType == 'txt') {
          return 'fa fa-file-text-o fa-x'
      } else if(iconType == 'pdf') {
          return 'fa fa-file-pdf-o fa-x'
      } else if(iconType == 'msg') {
          return 'fa fa-file-o fa-x'
      } else {
        return 'fa fa-file fa-x'
      }

    },
    urlcheck : function(value) {
      if(!value) return "-";
      return value;
    }
  }

}

</script>
