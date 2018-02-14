import Vue from 'vue'
import Vuex from 'vuex'
import counter from './counter'

Vue.use(Vuex);
export const store = new Vuex.Store({

  modules:{
    counter
  }

  // state : {
  //   count : 1,

  // },
  // getters: {
  //   counter : function(state){
  //     return state.count * 2;
  //   }
  // },
  // mutations : {
  //   increment : function(state){
  //     state.count ++;
  //   }
  // },
  // actions : {
  //   incrementAsync : function({ commit }){
  //     setTimeout(()=>{
  //       commit("increment");
  //     },5000)
  //   }
  // }

})
