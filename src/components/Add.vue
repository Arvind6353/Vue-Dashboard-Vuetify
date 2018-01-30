<template>
<div id="app">
 <span v-if ="isEdit!=true">
  <customer-nav></customer-nav>
</span>
   <v-card>
          <v-toolbar dark color="primary" v-if="isEdit == true">
            <v-toolbar-title class="display-1">Edit Customer Data</v-toolbar-title>
            <v-spacer></v-spacer>
             <v-btn icon @click="dismiss">
                <v-icon>close</v-icon>
              </v-btn>
        </v-toolbar>
<br/>
 <v-alert color="error" icon="danger" dismissible v-model="isError">
        Some Error Occurred. Please try again!
 </v-alert>

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
      ></v-select>
<!--      :rules="[v => !!v || 'Region is required']"
 -->
       <v-select
        label="Country"
        :items="countries"
        v-model="customerData.country"
         multiple
        chips
      ></v-select>
<!--    :rules="[v => v.length>0 || 'Country is required']"
    -->


      <v-text-field
        label="Problem Statement"
        :auto-grow="true"
        v-model="customerData.problemStatement"
        multi-line
        rows="2"
        :counter="600"
      ></v-text-field>
<!--  :rules="[v => !!v || 'Problem Statement is required',
          v => (v && v.length <= 600) || 'Must be less than 600 characters'
        ]"
      -->

      <v-text-field
        label="Solution Provided"
        :auto-grow="true"
        v-model="customerData.solutionProvided"
        multi-line
        rows="2"
        :counter="600"
        >
       </v-text-field>
<!--:rules="[v => !!v || 'Solution Provided is required',
          v => (v && v.length <= 600) || 'Must be less than 600 characters']"
        -->

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
<!--  :rules="[v => !!v || 'Launch Date is required']"
          -->

      <v-select
        label="Products"
        :items="productsArr"
        v-model="customerData.products"
        multiple
        chips
        hint="What are the Products Used?"
      ></v-select>
<!--       :rules="[v => v.length>0 || 'Products is required']"
 -->

      <v-text-field
        v-model="customerData.references"
        label="References(comma separated valid urls)"
        :auto-grow="true"
        multi-line
        rows="2"
        :rules="referencesRules"
        :counter="1000"
      ></v-text-field>

      <v-text-field
        v-model="customerData.pointOfContacts"
        :auto-grow="true"
        label="Point Of Contacts(comma separated)"
        multi-line
        :counter="600"
        rows="2"
      ></v-text-field>
<!--    :rules="[v => !!v || 'Point of Contacts is required',
          v => (v && v.length <= 600) || 'Must be less than 600 characters']"
    -->
       <v-text-field
        label="Notes"
        v-model="customerData.notes"
        :counter="600"
      ></v-text-field>
<!-- :rules="[v => !!v || 'Notes is required',
          v => (v && v.length <= 600) || 'Must be less than 600 characters']"
       -->
       <v-text-field
        label="Lessons Learned"
        :auto-grow="true"
        multi-line
        v-model="customerData.lessonLearned"
        :counter="600"
         rows="2"
      ></v-text-field>
<!-- :rules="[v => !!v || 'Lessons Learned is required',
          v => (v && v.length <= 600) || 'Must be less than 600 characters']"
        -->
      <v-btn
        @click="submit"
        :disabled="!valid"
      >
        Submit
      </v-btn>
     <!-- <v-btn @click="clear">Clear</v-btn> -->
      <v-btn @click="dismiss" v-if="isEdit==true">Dismiss</v-btn>
      <v-btn @click="cancel" v-else>Cancel</v-btn>
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
        let obj = Object.assign({},val.item);
        if(obj.references && obj.references.length > 0){
          obj.references = obj.references.join(",");
        }
        this.customerData = Object.assign({}, obj);
      },
      deep: true
    }
  },
  data: () => ({
    valid: false,
    isError: false,
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
      references: null,
      pointOfContacts: ""
    },
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 30) || "Name must be less than 30 characters"
    ],

//      v => !!v || 'References is required',
 //     v => (v && v.length <= 1000) || 'Must be less than 600 characters',

    referencesRules :[
          v =>{
          if(!v) return true;
          let refs = v.split(",");
          for(var x=0;x<refs.length;x++){
            if (!/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(refs[x].trim()))
              return "Not a valid url format";
          }
          return true;
          }
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
        let cusData = Object.assign({},this.customerData);
        if(cusData.references)
          cusData.references = cusData.references.split(",");

        if (!this.isEdit) {
          this.$http
            .post(config.serverUrl+"/customer", cusData, {
              headers: { "content-type": "application/json" }
            })
            .then(
              result => {
                console.log("data from server ", result.data);
                this.isError = false;
                this.$router.push("search");
              },
              error => {
                console.error(error);
                this.isError = true;
                window.scrollTo(0,0);
               //this.$router.push("errorpage");
              }
            );
        } else {
          {
          this.$http
            .put(config.serverUrl+"/customer", cusData, {
              headers: { "content-type": "application/json" }
            })
            .then(
              result => {
                console.log("data from server ", result.data);
                if (this.isEdit) {
                  this.$emit("close-edit-dialog");
                }
                this.isError = false;
                this.$router.push("search");
              },
              error => {
                console.error(error);
                this.isError = true;
                window.scrollTo(0,0);
              //this.$router.push("errorpage");
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
    },
    cancel() {
      this.$router.push("search");
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
