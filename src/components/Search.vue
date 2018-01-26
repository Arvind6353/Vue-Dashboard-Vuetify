<template>
<div id="app">

<customer-nav></customer-nav>
  <v-card>
      <v-card-title>
        <span class="title"></span>
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Search"
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
      </v-card-title>
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
         <!-- <th>
            <v-checkbox
              primary
              hide-details
              @click.native="toggleAll"
              :input-value="props.all"
              :indeterminate="props.indeterminate"
            ></v-checkbox>
          </th>
          -->
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
          <th>
            <span class="heading blue--text text--darken-4">   Actions
          </span>
          </th>
        </tr>
      </template>



      <template slot="items" slot-scope="props">
        <tr :active="props.selected" >
          <!--<td>
            <v-checkbox
              primary
              hide-details
              :input-value="props.selected"
              @click="props.selected = !props.selected"
            ></v-checkbox>
          </td> -->
          <td>{{ props.item.customerName }}</td>
          <td>{{ props.item.customerRegion }}</td>
          <td>{{ props.item.country | multicountry }}</td>
          <td>{{ props.item.launchDate }}</td>
          <td>{{ props.item.products | splitter }}</td>
          <td>{{ props.item.pointOfContacts }}</td>
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
        <v-alert :value="true" color="error" icon="warning">
          Sorry, nothing to display here
        </v-alert>
      </template>
    </v-data-table>
    </v-card>

 <v-layout row justify-center>
      <v-dialog v-model="editDialog" max-width="1000px">
       <Add :is-edit="true" :item="item"
       @close-edit-dialog="closeEditDialog"
       @dismiss-edit-dialog="dismissEditDialog"></Add>
      </v-dialog>
  </v-layout>

   <v-layout row justify-center>
      <v-dialog v-model="viewDialog" max-width="800px">
       <ViewDetail :cusData="cusData"
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


  </div>

</template>



<script>
import config from '../config'
import CustomerNav from './CustomerNav.vue'

export default {
 components: {
    "customer-nav": CustomerNav
  },
  data () {
    return {
      pagination: {
        sortBy: 'customerName'
      },
      search: '',
      editDialog: false,
      viewDialog : false,
      deleteDialog: false,
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
        { text: 'Products', value: 'products' },
        { text: 'Point Of Contacts', value: 'pointOfContacts' }

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
      this.getCustomerData()
        .then(data => {
          setTimeout(() =>{
              this.loading = false
              this.items = data
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
            console.error(error);
            this.$router.push("errorpage");

        });
    },
    editCustomerData(data) {
      this.editDialog = true;
      this.item = data;

    },
    deleteCustomerData(data) {
      this.deleteDialog = true;
      this.delData = data;
    },
    viewCustomerData(data) {
        this.viewDialog = true;
        this.cusData = data;
    },
    closeEditDialog() {
      this.editDialog = false;
      this.loadData();
    },
    dismissEditDialog() {
      this.editDialog = false;
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
            console.error(error);
            this.$router.push("errorpage");
      });
    }
  }
}

</script>
