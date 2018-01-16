<template>
<div id="app">
  <v-card>
      <v-card-title>
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
            {{ header.text }}
          </th>
          <th>
            Actions
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
          <td class="text-xs-right">{{ props.item.customerRegion }}</td>
          <td class="text-xs-right">{{ props.item.country }}</td>
          <td class="text-xs-right">{{ props.item.launchDate }}</td>
          <td class="text-xs-right">{{ props.item.problemStatement }}</td>
          <td class="text-xs-right">{{ props.item.solutionProvided }}</td>
          <td class="text-xs-right">{{ props.item.products }}</td>
          <td class="text-xs-right">{{ props.item.references }}</td>
          <td class="text-xs-right">{{ props.item.pointOfContacts }}</td>
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
          Sorry, nothing to display here :(
        </v-alert>
      </template>
    </v-data-table>
    </v-card>

 <v-layout row justify-center>
      <v-dialog v-model="dialog" max-width="1000px">
       <Add is-edit="true" :item="item"
       @close-dialog="closeDialog"></Add>
      </v-dialog>
    </v-layout>


  </div>

</template>





<script>

export default {

  data () {
    return {
      pagination: {
        sortBy: 'customerName'
      },
       search: '',
       dialog: false,
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
        { text: 'Problem Statement', value: 'problemStatement' },
        { text: 'Solution Provided', value: 'solutionProvided' },
        { text: 'Products', value: 'products' },
        { text: 'References', value: 'references', disableSort: true },
        { text: 'Point Of Contacts', value: 'pointOfContacts' }

      ],
      items: []
    }
  },

  mounted () {
    this.getCustomerData()
      .then(data => {
        setTimeout(() =>{
              this.loading = false
            this.items = data
        },2000);
     })
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
    getCustomerData () {
        this.loading = true
        return this.$http.get("http://localhost:3000/api/customerData").then(result => {
              return result.data;

        }, error => {
            this.loading = false;
            this.items = [];
            console.error(error);
        });
    },
    editCustomerData(data) {
      this.dialog = true;
      this.item = data;

    },
    deleteCustomerData(data) {

    },
    viewCustomerData(data) {

    },
    closeDialog() {
      this.dialog = false;
    }
  }
}
</script>
