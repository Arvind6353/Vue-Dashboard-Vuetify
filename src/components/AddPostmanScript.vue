<template>
<div id="app">
 <span v-if ="isEdit!=true">
</span>
   <v-card>
          <v-toolbar dark dense color="primary" >
            <v-toolbar-title class="heading" v-if="isEdit == true">Edit Postman Script Information</v-toolbar-title>
             <v-toolbar-title class="heading" v-else>Add Postman Script Information</v-toolbar-title>

            <v-spacer></v-spacer>
             <v-btn icon @click="dismiss" v-if="isEdit == true">
                <v-icon>close</v-icon>
              </v-btn>
               <v-btn icon @click="cancel" v-else>
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
        label="Products"
        :items="productsArr"
        v-model="customerData.products"
        multiple
        chips
        hint="What are the Products Used?"
      ></v-select>

      <v-text-field
        v-model="customerData.references"
        label="References(comma separated valid urls)"
        :auto-grow="true"
        multi-line
        rows="2"
        :rules="referencesRules"
        :counter="1000"
      ></v-text-field>

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
export default {
  props: ["isEdit", "item"],

  watch: {
    $props: {
      handler: function(val, oldVal) {
        console.log("watch", val);
        let obj = Object.assign({},val.item);
        if(obj.references && obj.references.length > 0){
          obj.references = obj.references.join(",");
        }
        this.customerData = Object.assign({}, obj);
        if(document.getElementsByClassName('dialog dialog--active') && document.getElementsByClassName('dialog dialog--active')[0])
          document.getElementsByClassName('dialog dialog--active')[0].scrollTop = 0
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
                this.customerData = null;
                if (this.isEdit) {
                  this.$emit("close-edit-dialog");
                } else {
                  this.$emit("close-add-postman-dialog");
                }
               // this.$router.push("/contentsearch2/dashboardSearch");
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
                } else {
                  this.$emit("close-add-dialog");
                }
                this.isError = false;
                //this.$router.push("/contentsearch2/dashboardSearch");
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
      this.customerData = null;
       this.$emit("dismiss-edit-dialog");
    },
    cancel() {
      this.customerData = null;
      this.$emit("dismiss-add-postman-dialog");
    }
  }
};
</script>
<style scoped>

form {
  padding-left: 20px;
  padding-right: 20px;
  margin-left:10%;
  margin-right:10%;
}
</style>
