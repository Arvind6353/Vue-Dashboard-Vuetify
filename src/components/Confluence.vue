<template>
<div>
<v-toolbar  app color="primary">
   <v-toolbar-title class="ml-0 pl-3">
      <span class="title google_font hidden-xs-only"></span>
   </v-toolbar-title>
   <v-spacer class="hidden-xs-only"></v-spacer>


      <!-- <v-select
                label="Start typing..."
                autocomplete
                :loading="loading"
                light
                solo
                cache-items
                chips
                :items="items"
                :search-input.sync="search"
                v-model="select"
              >
              </v-select> -->


               <v-select
                label="Start Typing ..."
                v-bind:items="items"
                :loading="loading"
                v-model="e11"
                light
                solo
                chips
                item-text="name"
                item-value="name"
                max-height="auto"
                autocomplete
                @input.native = "querySelections2"
              >
              <template slot="selection" slot-scope="data">

                  <v-chip
                    @input="data.parent.selectItem(data.item)"
                    :selected="data.selected"
                    class="chip--select-multi"
                    :key="JSON.stringify(data.item)"
                  >
                    {{ data.item.name }}           <v-icon
                    @click="closeThis">close</v-icon>

                  </v-chip>
                </template>

                <template slot="item" slot-scope="data">
                  <template v-if="typeof data.item !== 'object'">
                  </template>
                  <template v-else>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </template>
                </template>
               </v-select>
</v-toolbar>

</div>
</template>

<script>
import debounce from "debounce";

export default {
  name: "confluence",
  data() {
    let srcs = {
      1: "/static/doc-images/lists/1.jpg",
      2: "/static/doc-images/lists/2.jpg",
      3: "/static/doc-images/lists/3.jpg",
      4: "/static/doc-images/lists/4.jpg",
      5: "/static/doc-images/lists/5.jpg"
    };

    return {
      loading: false,
      items: [],
      search: null,
      search1: null,
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
      ],
      e11: [],
      people: [
        { name: "Sandra Adams", group: "Group 1", avatar: srcs[1] },
        { name: "Ali Connors", group: "Group 1", avatar: srcs[2] },
        { name: "Trevor Hansen", group: "Group 1", avatar: srcs[3] },
        { name: "Tucker Smith", group: "Group 1", avatar: srcs[2] },
        { name: "Britta Holt", group: "Group 2", avatar: srcs[4] },
        { name: "Jane Smith ", group: "Group 2", avatar: srcs[5] },
        { name: "John Smith", group: "Group 2", avatar: srcs[1] },
        { name: "Sandra Williams", group: "Group 2", avatar: srcs[3] }
      ]
    };
  },
  watch: {
    search1(val) {
      if (val == "") {
        this.querySelections1(val);
        return;
      } else if (val && val.length > 1) {
        this.querySelections1(val);
      }
    }
  },
  methods: {
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
    querySelections1(v) {
      this.loading = true;
      console.log("v --", v);

      // Simulated ajax query
      setTimeout(() => {
        if (v == "") {
          this.items = this.people.slice(0);
          this.loading = false;
          this.e11 = null;
          return;
        }
        this.items = this.people.filter(e => {
          return (
            ((e && e.name) || "")
              .toLowerCase()
              .indexOf((v || "").toLowerCase()) > -1
          );
        });
        this.loading = false;
      }, 500);
    },

    querySelections2: debounce(function(event) {
      this.loading = true;
      var v = event.target.value;
      console.log("v --", v);
      // Simulated ajax query
      setTimeout(() => {
        if (v == "") {
          this.items = this.people.slice(0);
          this.loading = false;
          this.e11 = null;
          return;
        }
        if (event.target.value.length > 0) {
          this.items = this.people.filter(e => {
            return (
              ((e && e.name) || "")
                .toLowerCase()
                .indexOf((v || "").toLowerCase()) > -1
            );
          });
          this.loading = false;
        }
      }, 500);
    }, 200),
    closeThis() {
      this.items = this.people.splice();
      this.e11 = null;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
