<template>
  <div id="app">
  <div id="responseContent" style="display:none"></div>
    <v-card>

      <v-data-table
          v-model="selected"
          v-bind:headers="headers"
          v-bind:items="items"
          v-bind:pagination.sync="pagination"
          item-key="customerName"
          class="elevation-1"
          :loading="loading"
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
             style="width:33.3%"
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

              <td>{{ props.item.text }}</td>
              <td v-html="props.item.description"></td>
              <td>{{ props.item.href}}</td>
            </tr>
          </template>

          <template slot="no-data">
            <!-- <v-alert :value="true" :color="loadingColor" :icon="loadingIcon"> -->
            <span :class="loadingColor"> <v-icon :class="loadingColor">{{loadingIcon}}</v-icon>
            &nbsp;&nbsp; {{loadingMsg}} </span>
            <!-- </v-alert> -->
          </template>

        <template slot="no-results">
            <!-- <v-alert :value="true" color="red" icon="warning"> -->
            <span class="red--text text--darken-4">
              <v-icon class="red--text text--darken-4">warning</v-icon>
              &nbsp;&nbsp; No matching Records Found</span>
            <!-- </v-alert> -->
          </template>

      </v-data-table>
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
        sortBy: 'customerName'
      },
      loadingMsg: 'Please input the search string',
      loadingColor: 'green-text text--darken-4',
      loadingIcon: 'warning',
      search: '',
      selected: [],
      loading: false,
      item: {},
      cusData:{},
      headers: [
        {
          text: 'Title',
          align: 'left',
          value: 'text'
        },
        { text: 'Description', value: 'description' },
        { text: 'Link', value: 'href' }
      ],
      items: []
    }
  },

  mounted () {
   this.search = this.$store.getters.getsearch;
   //this.loadData({});
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
        if(!this.search) {
          this.lastPromise = null;
          this.loading = false;
        }
        this.loadData({});
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
    loadData : debounce(function(event) {
      this.items = [];
      if(!this.search || this.search == ''){
        this.loadingColor ="green--text text--darken-4";
        this.loadingIcon = "warning";
        this.loadingMsg = "Please input the search string";
        return;
      } else {
          this.loadingColor ="green--text text--darken-4";
          this.loadingIcon = "info";
          this.loadingMsg = "Loading Data";
          const promise = this.getCustomerData();
          this.lastPromise = promise;
          promise.then(data => {
            if(this.lastPromise == promise){
            this.lastPromise = null;
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
            }
        })
      }
    },1000),
    getCustomerData () {
        this.loading = true
        return this.$http.get("http://localhost:9000/developer?q="+this.search).then(result => {
              $("#responseContent").html(result.bodyText);

              var items = [];

              var links = $("#responseContent").find(".dx-search-result");

              links.toArray().forEach(function(element) {

                var aLink = $(element).find('a')[0];
                var description = $(element).find("p")[0].innerHTML

                var obj = {
                  href : aLink.href,
                  text : aLink.innerHTML,
                  description
                };
                items.push(obj);
  console.log("o")
});
              console.log("done")
              return items;

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
