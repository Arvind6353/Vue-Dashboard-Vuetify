<template>
<div id="app">
  <v-card>
     <v-data-table
        v-model="selected"
        v-bind:headers="headers"
        v-bind:items="items"
        v-bind:pagination.sync="pagination"
        item-key="name"
        class="elevation-1"
        :loading="loading"
        hide-actions
        fix-headers
      >
<v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="headers" slot-scope="props">
        <tr>
          <th v-for="header in props.headers.slice(0,1)" :key="header.text"
             :class="[ !header.disableSort ? 'column sortable' :'' ,
                       !header.disableSort && pagination.descending ? 'desc' : 'asc',
                       !header.disableSort && header.value === pagination.sortBy ? 'active' : ''
                    ]"
             @click="!header.disableSort && changeSort(header.value)"
             style="width:60%"
             v-if="header.text=='Title'"
          >
            <v-icon v-if="!header.disableSort">arrow_upward</v-icon>
            <span class="title blue--text text--darken-4" style="font-size:17px!important">{{ header.text }}</span>
          </th>
          <th v-for="header in props.headers.slice(1)" :key="header.text"
             :class="[ !header.disableSort ? 'column sortable' :'' ,
                       !header.disableSort && pagination.descending ? 'desc' : 'asc',
                       !header.disableSort && header.value === pagination.sortBy ? 'active' : ''
                    ]"
             @click="!header.disableSort && changeSort(header.value)"

          >
            <v-icon v-if="!header.disableSort">arrow_upward</v-icon>
            <span class="title blue--text text--darken-4" style="font-size:17px!important">{{ header.text }}</span>
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
          <td>{{ props.item.modifiedDate | dateFormat}}</td>
          <!-- <td>{{ props.item.description | urlcheck}}</td> -->


          <td v-if="props.item.url != null">
            <v-btn icon color="info" class="white--text" @click="viewInBrowser(props.item.url)">
              <v-icon>link</v-icon>
            </v-btn>
            <v-btn icon color="teal darken-1" class="white--text" @click="copy(props.item.url)">
              <v-icon>fa fa-copy fa-x</v-icon>
            </v-btn>

          </td>

          <td v-else>
            <span class="blue--text text--darken-4">N/A</span>
          </td>

        </tr>
      </template>

      <template slot="no-data">
        <!-- <v-alert :value="true" :color="loadingColor" :icon="loadingIcon"> -->

         <span :class="loadingColor"> <v-icon :class="loadingColor">{{loadingIcon}}</v-icon>
         &nbsp;&nbsp; {{loadingMsg}} </span>
        <!-- </v-alert> -->
      </template>

    <template slot="no-results">
        <!-- <v-alert :value="true" :color="loadingColor" :icon="loadingIcon"> -->
           <span :class="loadingColor"> <v-icon :class="loadingColor">{{loadingIcon}}</v-icon>
         &nbsp;&nbsp; Loading More data </span>
        <!-- </v-alert> -->
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
import config from '../config';
import debounce from "debounce";
import moment from "moment";


export default {
name : 'productcentral',
  data () {
    return {
      pagination: {
        sortBy: 'name',
        rowsPerPage : 25
      },
      totalItems : 0,
      loadingMsg: 'Please input the search string',
      loadingColor: 'green-text text--darken-4',
      loadingIcon: 'warning',
      search: '',
      selected: [],
      loading: false,
      item: {},
      cusData:{},
      delData: {},
      headers: [
        {
          text: 'Title',
          value: 'name',
          width: '10%'
        },
        { text: 'Date Modified', value: 'modifiedDate', align:'right' },
        { text: 'Actions', value: 'url' }
      ],
      items: []
    }
  },
  mounted () {
    // this.loadData();
   this.search = this.$store.getters.getsearch;
   this.loadData({},0)
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
      window.scrollTo(0,0);
      if(this.pagination.rowsPerPage * this.pagination.page > this.items.length && this.pagination.page !=1
          && this.items.length < this.totalItems
        ){
          //let offset = parseInt(this.totalItems/this.items.length);
          let offset = 200*Math.round(this.items.length/200);
          this.callApi(offset);

        }

      return this.pagination.rowsPerPage ? Math.ceil(this.totalItems / this.pagination.rowsPerPage) : 0
    },
   searchVal (){
      this.search = this.$store.getters.getsearch;
      //this.loadData({},0)
      return this.$store.getters.getsearch;
    }
  },
  watch: {
    'searchVal':{
      handler: function (val, oldVal) {
        console.log('watch', val)
        this.search = val;
        if(!this.search) {
          this.lastPromise = null;
          this.loading = false;
        }
        this.loadData({},0)
     },
      deep: true
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
      if(!this.search || this.search == ''){
        this.loadingColor ="green--text text--darken-4";
        this.loadingIcon = "warning";
        this.loadingMsg = "Please input the search string";
        return;
      } else {
        this.callApi(offset);
      }
    },1000),

    callApi(offset){

      if(!offset){
          offset = 0;
        }
      this.loadingColor ="green--text text--darken-4";
      this.loadingIcon = "info";
      this.loadingMsg = "Loading Data";
      const promise = this.getCustomerData(this.search, offset);
      this.lastPromise = promise;
        promise.then(result => {
          if(this.lastPromise == promise){
            this.lastPromise = null;
            var data = result.data;
            if(data) {
              this.pagination.totalItems = data.totalItems;
              this.totalItems = data.totalItems;

              this.items = [... this.items,  ...data.searchResults.map((entry,index) => {
                 return {
                    name : entry.name,
                    id: entry.id,
                    url : entry.url,
                    idx:index,
                    description : entry.description,
                    modifiedDate : entry.modifiedDate
                  }
               })]
            }
            this.loading = false
            if(!this.items || this.items.length == 0) {
              this.loadingMsg = "No data found";
              this.loadingColor = "red--text text--darken-4";
              this.loadingIcon = "warning";
            }
          }
      }).catch(error => {
          this.loading = false;
          this.items = [];
          this.totalItems = 0;
          this.loadingMsg = "Some Error Occurred . Please try again!";
          this.loadingColor = "red--text text--darken-4";
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
        return this.$http.get(encodeURI(config.serverUrl+"/box/"+param+"?offset="+offset))
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
      } else if ( iconType == 'png' || iconType == 'jpg' || iconType == 'jpeg' || iconType == 'gif') {
        return "purple"
      } else {
        return "black lighten-2"
      }

    },
    viewInBrowser: function(url){
      window.open(url,"_blank");
    },
    copy : function(url){
      var aux = document.createElement("input");
      aux.setAttribute("value", url);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
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
      } else if (iconType == 'png' || iconType == 'jpg' || iconType == 'jpeg' || iconType == 'gif') {
        return "fa fa-file-image-o fa-x"
      } else {
        return 'fa fa-file fa-x'
      }
    },
    urlcheck : function(value) {
      if(!value) return "-";
      return value;
    },
    dateFormat : function(value) {
      if(!value) return ''
      return moment(value).format('MMM Do YYYY')
    }
  }
}

</script>
