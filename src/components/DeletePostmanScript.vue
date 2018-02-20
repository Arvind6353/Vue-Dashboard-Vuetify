<template>
  <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title class="display-1">{{postmanData.productName}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>

          </v-btn>
        </v-toolbar>

          <v-card-title class="headline">Are you sure you want to delete this postman information?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="closeDeleteDialog">No</v-btn>
            <v-btn color="green darken-1" flat @click="deleteData">Yes</v-btn>
          </v-card-actions>


        <v-divider></v-divider>
      </v-card>
</template>

<script>
export default {
  name: 'delPostmanScript',
  props: ["delData"],
  watch: {
    'delData':{
      handler: function (val, oldVal) {
        console.log('watch', val)
        let obj = val;
        this.postmanData = Object.assign({},obj);
      },
      deep: true
    }
  },
  data () {
    return {
      postmanData :{},
    }
  },
  filters: {
    upperCase: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.toUpperCase()
    }
  },
  methods : {
    closeDeleteDialog() {
      this.$emit("close-delete-postman-dialog");
    },
    deleteData(){
      this.$emit("do-postman-delete", this.postmanData._id);
    }
  }
}
window.setTimeout(()=>{
  window.scrollTo(0,0);
},1000);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
