<template>
<div>
<v-toolbar  app color="primary">
   <v-toolbar-title class="ml-0 pl-3">
      <span class="title google_font hidden-xs-only"></span>
   </v-toolbar-title>
   <v-spacer class="hidden-xs-only"></v-spacer>

      <!-- <v-text-field
         light
         solo
         prepend-icon="search"
         placeholder="Search...">
      </v-text-field> -->

      <v-select
                label="Start typing..."
                autocomplete
                :loading="loading"
                light
                solo
                multiple
                cache-items
                chips
                :items="items"
                :search-input.sync="search"
                v-model="select"
              ></v-select>
</v-toolbar>

</div>
</template>

<script>
export default {
  name: 'confluence',
  data () {
    return {
      loading: false,
      items: [],
      search: null,
      select: [],
      states: [
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District of Columbia",
        "Federated States of Micronesia",
        "Florida",
        "Georgia",
        "Guam",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Marshall Islands",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Northern Mariana Islands",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Palau",
        "Pennsylvania",
        "Puerto Rico",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virgin Island",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
      ]
    }
  },
  watch: {
    search (val) {
      val && this.querySelections(val)
    }
  },
  methods: {
    querySelections (v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
