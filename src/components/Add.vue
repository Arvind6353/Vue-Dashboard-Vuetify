<template>
<div id="app">
 <span v-if ="isEdit!=true">
  <customer-nav></customer-nav>
</span>
   <v-card>
      <v-card-title>
        <!-- <h1 class="blue--text text--darken-4">Add Customer Data Form</h1> -->
         </v-card-title>


  <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field
        label="Customer Name"
        v-model.lazy="customerData.customerName"
        :rules="nameRules"
        :counter="30"
        required
      ></v-text-field>

      <v-select
        label="Region"
        v-model="customerData.customerRegion"
        :items="regions"
        :rules="[v => !!v || 'Region is required']"
      ></v-select>

       <v-select
        label="Country"
        :items="countries"
        v-model="customerData.country"
         multiple
        chips
        :rules="[v => v.length>0 || 'Country is required']"
      ></v-select>



      <v-text-field
        label="Problem Statement"
        :auto-grow="true"
        v-model="customerData.problemStatement"
        :rules="[v => !!v || 'Problem Statement is required',
          v => (v && v.length <= 600) || 'Must be less than 600 characters'
        ]"
        multi-line
        rows="2"
        :counter="600"
      ></v-text-field>


      <v-text-field
        label="Solution Provided"
        :auto-grow="true"
        v-model="customerData.solutionProvided"
        :rules="[v => !!v || 'Solution Provided is required',
          v => (v && v.length <= 600) || 'Must be less than 600 characters']"
        multi-line
        rows="2"
        :counter="600"
        >
       </v-text-field>


      <v-dialog
          persistent
          v-model="modal"
          lazy
          full-width
          width="290px"
        >
          <v-text-field
            slot="activator"
            label="Launch Date"
            v-model="customerData.launchDate"
            :rules="[v => !!v || 'Launch Date is required']"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="customerData.launchDate" scrollable actions>
            <template slot-scope="{ save, cancel }">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                <v-btn flat color="primary" @click="save">OK</v-btn>
              </v-card-actions>
            </template>
          </v-date-picker>
        </v-dialog>


      <v-select
        label="Products"
        :items="productsArr"
        v-model="customerData.products"
        multiple
        chips
        hint="What are the Products Used?"
        :rules="[v => v.length>0 || 'Products is required']"
      ></v-select>


      <v-text-field
        v-model="customerData.references"
        label="References(comma separated)"
        :auto-grow="true"
        multi-line
        rows="2"
        :rules="[v => !!v || 'References is required',
          v => (v && v.length <= 600) || 'Must be less than 600 characters']"
        :counter="600"
      ></v-text-field>

      <v-text-field
        v-model="customerData.pointOfContacts"
        :auto-grow="true"
        label="Point Of Contacts(comma separated)"
        :rules="[v => !!v || 'Point of Contacts is required',
          v => (v && v.length <= 600) || 'Must be less than 600 characters']"
        multi-line
        :counter="600"
        rows="2"
      ></v-text-field>

       <v-text-field
        label="Notes"
        v-model="customerData.notes"
        :rules="[v => !!v || 'Notes is required',
          v => (v && v.length <= 600) || 'Must be less than 600 characters']"
        :counter="600"
      ></v-text-field>

       <v-text-field
        label="Lessons Learned"
        :auto-grow="true"
        multi-line
        v-model="customerData.lessonLearned"
        :rules="[v => !!v || 'Lessons Learned is required',
          v => (v && v.length <= 600) || 'Must be less than 600 characters']"
        :counter="600"
         rows="2"
      ></v-text-field>

      <v-btn
        @click="submit"
        :disabled="!valid"
      >
        Submit
      </v-btn>
     <!-- <v-btn @click="clear">Clear</v-btn> -->
      <v-btn @click="dismiss">Dismiss</v-btn>
    </v-form>
    </v-card>
</div>

</template>


<script>
import config from '../config'
import CustomerNav from './CustomerNav.vue'
export default {
  props: ["isEdit", "item"],
  components: {
    "customer-nav": CustomerNav
  },
  watch: {
    $props: {
      handler: function(val, oldVal) {
        console.log("watch", val);
        let obj = val.item;
        this.customerData = Object.assign({}, obj);
      },
      deep: true
    }
  },
  data: () => ({
    valid: false,
    customerData: {
      customerName: "",
      customerRegion: "",
      country: null,
      launchDate: null,
      problemStatement: "",
      lessonLearned: "",
      solutionProvided: "",
      notes: "",
      products: null,
      references: "",
      pointOfContacts: ""
    },
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 30) || "Name must be less than 30 characters"
    ],
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    regions: ["APAC", "NA", "LATAM","EMEA"],
    countries: [
      "India",
      "Australia",
      "United States",
      "United Kingdom",
      "Pakistan",
      "Srilanka",
      "Japan",
      "China",
      "Singapore",
      "Canada",
      "Germany"
    ],
    productsArr: [
      "Express Checkout",
      "Invoicing",
      "Payouts",
      "WPS",
      "Order APIs",
      "Dispute APIs",
      "Integrated Sign Up APIs",
      "Payflow Pro",
      "LIPP",
      "Refund API's"
    ],
    modal: false
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported

        if (!this.isEdit) {
          this.$http
            .post(config.serverUrl+"/customer", this.customerData, {
              headers: { "content-type": "application/json" }
            })
            .then(
              result => {
                console.log("data from server ", result.data);
                this.$router.push("search");
              },
              error => {
                console.error(error);
                this.$router.push("errorpage");
              }
            );
        } else {
          {
          this.$http
            .put(config.serverUrl+"/customer", this.customerData, {
              headers: { "content-type": "application/json" }
            })
            .then(
              result => {
                console.log("data from server ", result.data);
                if (this.isEdit) {
                  this.$emit("close-edit-dialog");
                }
                this.$router.push("search");
              },
              error => {
                console.error(error);
                this.$router.push("errorpage");
              }
            );
        }
        }
      }
    },
    clear() {
      this.$refs.form.reset();
    },
    dismiss() {
       this.$emit("dismiss-edit-dialog");
    }
  }
};
</script>
<style scoped>

form {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
