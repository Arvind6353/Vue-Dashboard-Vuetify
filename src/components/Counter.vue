<template>
<div>
  <h1> Counter is {{counting}}</h1>

  <h1> Counter is {{counterComputed}}</h1>
  <button @click="increment">Increment </button>
  <button @click="incrementAsync">IncrementAsync </button>
  <!-- <button @click="incrementAsyncWithoutMapping">IncrementAsyncWithoutMapping</button> -->

</div>
</template>

<script>
import {mapMutations , mapGetters , mapActions} from 'vuex';
import * as types from '../store/types'

console.log("types",types)

export default {

  data(){
    return {

    }
  },
  methods : {
    ...mapMutations({
      "increment": types.INCREMENT
    }),
    ...mapActions({
      "incrementAsync": types.INCREMENT
    })
    // incrementAsyncWithoutMapping : function(){
    //   this.$store.dispatch('incrementAsync')
    // }
  },
  computed :{
    ...mapGetters({
      counterComputed : types.DOUBLECOUNTER
    }),
    counting : function(){
      return this.$store.getters.doublecounter;
    }
  }
}

</script>

<style>

</style>
