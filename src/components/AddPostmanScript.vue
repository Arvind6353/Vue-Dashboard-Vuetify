<template>
<div id="app">

   <v-card  style="height: -webkit-fill-available;">
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
        label="Product Name"
        v-model.lazy="postmanData.productName"
        :rules="nameRules"
        :counter="90"
        required
      ></v-text-field>

      <v-text-field
        v-model="postmanData.url"
        label="Postman Script url"
        :auto-grow="true"
        multi-line
        rows="2"
        required
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
        if(!obj){
            obj.productName = '';
            obj.url='';
        }
        this.postmanData = Object.assign({}, obj);
        if(document.getElementsByClassName('dialog dialog--active') && document.getElementsByClassName('dialog dialog--active')[0])
          document.getElementsByClassName('dialog dialog--active')[0].scrollTop = 0
      },
      deep: true
    }
  },
  data: () => ({
    valid: false,
    isError: false,
    postmanData: {
      productName: "",
      url: ""
    },
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 90) || "Name must be less than 90 characters"
    ],
    referencesRules :[
          v =>{
          if(!v) return true;
          if (!/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(v.trim()))
            return "Not a valid url format";
          return true;
          }
    ],
    modal: false
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        let postmanDatum = Object.assign({},this.postmanData);
        if (!this.isEdit) {
          this.$http
            .post(config.serverUrl+"/postman", postmanDatum, {
              headers: { "content-type": "application/json" }
            })
            .then(
              result => {
                console.log("data from server ", result.data);
                this.isError = false;
                this.postmanData = null;
                if (this.isEdit) {
                  this.$emit("close-edit-postman-dialog");
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
            .put(config.serverUrl+"/postman", postmanDatum, {
              headers: { "content-type": "application/json" }
            })
            .then(
              result => {
                console.log("data from server ", result.data);
                if (this.isEdit) {
                  this.$emit("close-edit-postman-dialog");
                } else {
                  this.$emit("close-add-postman-dialog");
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
      this.$emit("dismiss-edit-postman-dialog");
    },
    cancel() {
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
