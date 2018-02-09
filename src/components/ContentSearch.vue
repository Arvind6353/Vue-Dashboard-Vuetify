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

          <td>{{ props.item.name }}</td>
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.url }}</td>
        </tr>
      </template>
        <template slot="no-data">
        <v-alert :value="true" :color="loadingColor" :icon="loadingIcon">
          {{loadingMsg}}
        </v-alert>
      </template>


    </v-data-table>
    {{pagination}} <br/>
     <v-pagination v-model="pagination.page" :length="pages" :circle="true"
     ></v-pagination>
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
          text: 'Title',
          align: 'left',
          value: 'name'
        },
        { text: 'Doc Id', value: 'id' },
        { text: 'Url', value: 'url' }

      ],
      items: []
    }
  },
 watch: {
    pagination: {
      handler (newVal) {
        console.log("new vla ", newVal);
        // alert(newVal)
        // if(newVal.rowsPerPage * newVal.page > this.items.length && newVal.page !=1 &&

        // newVal.rowsPerPage * newVal.page < this.totalItems ){
        //   let offset = this.items.length + 1;
        //     this.callApi(offset);

        // }

      }
    }
  },

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
        .then(data => {
              this.loading = false
              this.pagination.totalItems = data.totalItems;
              this.totalItems = data.totalItems;

              this.items = [... this.items,  ...data.searchResults.map((entry,index) => {
                 return { name : entry.name, id: entry.id, url : entry.url, idx:index }
               })]

              if(!this.items || this.items.length == 0) {
                this.loadingMsg = "No data found";
                this.loadingColor = "red";
                this.loadingIcon = "warning";
              }
      })
    },
    getCustomerData (param, offset) {
        if(!param) {
          param = "search"
        }


        this.loading = true
        return this.$http.get(config.serverUrl+"/customer/box/"+param+"?offset="+offset).then(result => {
              return result.data;

        }, error => {
            this.loading = false;
            this.items = [];
            this.totalItems = 0;
            this.loadingMsg = "Some Error Occurred . Please try again!";
            this.loadingColor = "red";
            this.loadingIcon = "warning";
            console.error(error);
            this.$router.push("errorpage");

        });
    }

  }
}

</script>
