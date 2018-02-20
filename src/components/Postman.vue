<template>
<div id="app">

  <v-card style="box-shadow: rgba(0, 0, 0, 0.3) -20px -5px 38px, rgba(0, 0, 0, 0.22) 10px 15px 12px;">
    <v-layout row class="pt-2">
    <v-flex xs10 offset-xs1 >
      <v-text-field
            append-icon="search"
            label="Search for Postman scripts"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
      </v-flex>
    </v-layout>
    <br/>
    <v-layout row>
      <v-flex offset-xs10>

        <v-btn icon  color="primary" @click="showAddDialog()" title="Add Postman Data"
              style="box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22) !important">
            <v-icon>add</v-icon>
        </v-btn>

        <v-btn icon  color="success" @click="loadData()" title="Refresh Content"
          style="box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22) !important"
        >
          <v-icon>refresh</v-icon>
          </v-btn>

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

          <td>{{ props.item.productName }}</td>
          <td v-html="formatUrl(props.item.url)"></td>
          <td>
            <v-btn icon color="info" @click="editPostmanData(props.item)">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn icon color="error" @click="deletePostmanData(props.item)">
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


    <v-layout row justify-center>
        <v-dialog v-model="addPostmanScriptDialog"
        fullscreen transition="dialog-bottom-transition"
        >
        <AddPostmanScript :item="item"
          @close-add-postman-dialog="closeAddDialog"
          @dismiss-add-postman-dialog="dismissAddDialog"></AddPostmanScript>
        </v-dialog>
    </v-layout>

    <v-layout row justify-center>
        <v-dialog v-model="editPostmanScriptDialog"
        fullscreen transition="dialog-bottom-transition"
        >
        <AddPostmanScript :item="item" :is-edit="true"
          @close-edit-postman-dialog="closeEditDialog"
          @dismiss-edit-postman-dialog="dismissEditDialog"></AddPostmanScript>
        </v-dialog>
    </v-layout>

    <v-layout row justify-center>
        <v-dialog v-model="deletePostmanScriptDialog" max-width="500px">
        <DeletePostmanScript :delData="delData"
        @close-delete-postman-dialog="closeDeleteDialog"
        @do-postman-delete="deleteData"
        ></DeletePostmanScript>
        </v-dialog>
    </v-layout>


 </div>


</template>


<script>
  import config from '../config'

  export default {
    name:'postman',
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
        delData: null,
        loading: false,
        addPostmanScriptDialog: false,
        editPostmanScriptDialog: false,
        deletePostmanScriptDialog: false,
        item: {},
        headers: [
          {
            text: 'Product Name',
            align: 'left',
            value: 'productName'
          },
          { text: 'Postman Link', value: 'url' }

        ],
        items: []
      }
    },

    mounted () {
      this.loadData();
    },
    methods: {
      formatUrl (value) {
          if(!value) return '';
          return "<a href='"+value+"' target='_blank'>"+value+"</a>"
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
        this.getPostmanData()
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
      getPostmanData () {
          this.loading = true
          return this.$http.get(config.serverUrl+"/postman").then(result => {
                return result.data;

          }, error => {
              this.loading = false;
              this.items = [];
              this.loadingMsg = "Some Error Occurred . Please try again!";
              this.loadingColor = "red--text text--darken-4";
              this.loadingIcon = "warning";
              console.error(error);

          });
      },
      deleteData(id) {
        this.loading = true
        this.$http.delete(config.serverUrl+"/postman/"+id).then(result => {
            console.log("deleted successfully")
            this.deletePostmanScriptDialog = false;
            this.loading = false;
            this.loadData();
        }, error => {
            this.loading = false;
            this.deletePostmanScriptDialog = false;
            this.items = [];
            this.loadingMsg = "Some Error Occurred . Please try again!";
            this.loadingColor = "red--text text--darken-4";
            this.loadingIcon = "warning";
            console.error(error);
      });
    },
      showAddDialog(){
        this.addPostmanScriptDialog = true;
        this.item = {};
      },
      closeAddDialog() {
        this.addPostmanScriptDialog = false;
        this.item = {};
        this.loadData();
      },
      dismissAddDialog() {
        this.item = {};
        this.addPostmanScriptDialog = false;
      },
      editPostmanData(data) {
        this.editPostmanScriptDialog = true;
        this.item = Object.assign({},data);
      },
      closeEditDialog() {
        this.editPostmanScriptDialog = false;
        this.loadData();
      },
      dismissEditDialog() {
        this.editPostmanScriptDialog = false;
      },
      deletePostmanData(data) {
        this.deletePostmanScriptDialog = true;
        this.delData = Object.assign({},data);
      },
      closeDeleteDialog() {
        this.deletePostmanScriptDialog = false;
      }
    }
  }

</script>
