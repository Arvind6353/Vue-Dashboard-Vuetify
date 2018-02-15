<template>
<div id="app">

  <v-card>


        <!-- <v-text-field
          append-icon="search"
          label="Search"
          single-line
          hide-details
          v-model="search"
        ></v-text-field> -->
        <v-flex xs3 offset-xs10>
           <v-btn small  color="primary" @click="showAddDialog()" title="Add Customer Data"
           style="margin-right:-20%">
              Add
            </v-btn>
       </v-flex>
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
            <span class="title blue--text text--darken-4" style="font-size:18px!important">{{ header.text }}</span>
          </th>
          <th>
            <span class="title blue--text text--darken-4" style="font-size:18px!important">   Actions
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
        <v-alert :value="true" :color="loadingColor" :icon="loadingIcon">
          {{loadingMsg}}
        </v-alert>
      </template>
    </v-data-table>
    </v-card>

 <v-layout row justify-center>
      <v-dialog v-model="editDialog"
       fullscreen transition="dialog-bottom-transition"
      >
       <Add :is-edit="true" :item="item"
       @close-edit-dialog="closeEditDialog"
       @dismiss-edit-dialog="dismissEditDialog"></Add>
      </v-dialog>
  </v-layout>

   <v-layout row justify-center>
      <v-dialog v-model="viewDialog" fullscreen transition="dialog-bottom-transition">
       <ViewDetail :cusData="cusData"
        @dismiss-view-dialog="dismissViewDialog"
      ></ViewDetail>
      </v-dialog>
  </v-layout>


  <v-layout row justify-center>
      <v-dialog v-model="deleteDialog" max-width="500px">
       <Del :delData="delData"
       @close-delete-dialog="closeDeleteDialog"
       @do-delete="deleteData"
      ></Del>
      </v-dialog>
  </v-layout>

      </v-card>

 <v-layout row justify-center>
      <v-dialog v-model="addDialog"
       fullscreen transition="dialog-bottom-transition"
      >
       <Add :item="item"
       @close-add-dialog="closeAddDialog"
       @dismiss-add-dialog="dismissAddDialog"></Add>
      </v-dialog>
  </v-layout>


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
      loadingColor: 'success',
      loadingIcon: 'info',
      search: '',
      editDialog: false,
      viewDialog : false,
      deleteDialog: false,
      addDialog: false,
      selected: [],
      loading: false,
      item: {},
      cusData:{},
      delData: {},
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
   this.search = this.$store.getters.getsearch;
   $("#firstTab").click()
   this.loadData();
  },
   computed: {
     searchVal(){
       this.search = this.$store.getters.getsearch;
       return this.$store.getters.getsearch;
     }
   },
   watch: {
    'searchVal':{
      handler: function (val, oldVal) {
        console.log('watch', val)
        this.search = val;
       // this.loadData({},0)
      },
      deep: true
    }
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
      this.loadingColor ="success";
      this.loadingIcon = "info";
      this.getCustomerData()
        .then(data => {
          setTimeout(() =>{
              this.loading = false
              this.items = data
              if(!this.items || this.items.length == 0) {
                this.loadingMsg = "No data found";
                this.loadingColor = "red";
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
            this.loadingColor = "red";
            this.loadingIcon = "warning";
            console.error(error);
            this.$router.push("errorpage");

        });
    },
    editCustomerData(data) {
      this.editDialog = true;
      this.item = Object.assign({},data);

    },
    deleteCustomerData(data) {
      this.deleteDialog = true;
      this.delData = Object.assign({},data);
    },
    viewCustomerData(data) {
        this.viewDialog = true;
        this.cusData = Object.assign({},data);
    },
    closeEditDialog() {
      this.editDialog = false;
      this.loadData();
    },
    dismissEditDialog() {
      this.editDialog = false;
    },
    dismissViewDialog() {
      this.viewDialog = false;
    },
    closeDeleteDialog() {
      this.deleteDialog = false;
    },
    deleteData(id) {
      this.loading = true
        this.$http.delete(config.serverUrl+"/customer/"+id).then(result => {
            console.log("deleted successfully")
            this.deleteDialog = false;
            this.loading = false;
            this.loadData();
        }, error => {
            this.loading = false;
            this.deleteDialog = false;
            this.items = [];
            this.loadingMsg = "Some Error Occurred . Please try again!";
            this.loadingColor = "red";
            this.loadingIcon = "warning";
            console.error(error);
            this.$router.push("errorpage");
      });
    },
    showAddDialog(){
      this.addDialog = true;
      this.item = {};
    },
    closeAddDialog() {
      this.addDialog = false;
      this.loadData();
    },
    dismissAddDialog() {
      this.addDialog = false;
    }
  }
}

</script>
