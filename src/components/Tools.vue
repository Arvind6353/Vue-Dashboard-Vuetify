<template>
<div id="app">

  <v-card style="box-shadow: rgba(0, 0, 0, 0.3) -20px -5px 38px, rgba(0, 0, 0, 0.22) 10px 15px 12px;">
    <v-layout row>
    <v-flex xs6 offset-xs6>
      <v-text-field
            append-icon="search"
            label="Search for Tools"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
      </v-flex>
    </v-layout>
       <v-data-table
        v-model="selected"
        v-bind:headers="headers"
        v-bind:items="items"
         v-bind:search="search"
        select-all
        v-bind:pagination.sync="pagination"
        item-key="customerName"
        class="elevation-1"
        :loading="loading"
      >
       <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
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
            <span class="title blue--text text--darken-4" style="font-size:16px!important">{{ header.text }}</span>
          </th>
          <th>
            <span class="title blue--text text--darken-4" style="font-size:16px!important">   Actions
          </span>
          </th>
        </tr>
        </template>

      <template slot="items" slot-scope="props">
        <tr :active="props.selected" >

          <td>{{ props.item.customerName }}</td>
          <td>{{ props.item.customerRegion }}</td>
          <td>{{ props.item.country | multicountry }}</td>
          <td>{{ props.item.launchDate }}</td>
          <td>{{ props.item.products | splitter }}</td>
          <td>
            <v-btn icon color="success" @click="viewCustomerData(props.item)">
              <v-icon>list</v-icon>
            </v-btn>
            <v-btn icon color="info" @click="editCustomerData(props.item)">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn icon color="error" @click="deleteCustomerData(props.item)">
              <v-icon>delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>


      <template slot="no-data">
         <span :class="loadingColor"> <v-icon :class="loadingColor">{{loadingIcon}}</v-icon>
         &nbsp;&nbsp; {{loadingMsg}} </span>
      </template>


     <template slot="no-results">
         <span class="red--text text--darken-4">
           <v-icon class="red--text text--darken-4">warning</v-icon>
          &nbsp;&nbsp; No matching Records Found</span>
      </template>


    </v-data-table>
    </v-card>
 </div>

</template>


<script>
  import config from '../config'

  export default {
    data () {
      return {
        pagination: {
          sortBy: 'customerName'
        },
        loadingMsg: 'Loading Data',
        loadingColor: 'green--text text--darken-4',
        loadingIcon: 'info',
        search: '',
        selected: [],
        loading: false,
        item: {},
        headers: [
          {
            text: 'Customer Name',
            align: 'left',
            value: 'customerName'
          },
          { text: 'Region', value: 'customerRegion' },
          { text: 'Country', value: 'country' },
          { text: 'Launch Date', value: 'launchDate' },
          { text: 'Products', value: 'products' }

        ],
        items: []
      }
    },

    mounted () {
      this.loadData();
    },

    filters: {
      multicountry: function (value) {
        if(value && value.length > 1) return "Multi Country";
        if(!value) return '';
        return value.join(',');
      }
    },

    methods: {
      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.items.slice()
      },
      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      },
      loadData () {
        this.loadingColor ="green--text text--darken-4";
        this.loadingIcon = "info";
        this.getCustomerData()
          .then(data => {
            setTimeout(() =>{
                this.loading = false
                this.items = data
                if(!this.items){
                  this.loadingMsg = "Some Error Occurred . Please try again!";
                    this.loadingColor = "red--text text--darken-4";
                    this.loadingIcon = "warning";
                } else if(this.items.length == 0) {
                  this.loadingMsg = "No data found";
                  this.loadingColor = "red--text text--darken-4";
                  this.loadingIcon = "warning";
                }
            },2000);
        })
      },
      getCustomerData () {
          this.loading = true
          return this.$http.get(config.serverUrl+"/customer").then(result => {
                return result.data;

          }, error => {
              this.loading = false;
              this.items = [];
              this.loadingMsg = "Some Error Occurred . Please try again!";
              this.loadingColor = "red--text text--darken-4";
              this.loadingIcon = "warning";
              console.error(error);

          });
      }
    }
  }

</script>
