import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
export const store = new Vuex.Store({

  state : {
     count : 1,
     searchParam : ''
   },
   getters: {
     counter : function(state){
       return state.count * 2;
     },
     getsearch : function(state){
       return state.searchParam;
     }
   },
   mutations : {
     increment : function(state){
       state.count ++;
     },
     setsearch : function(state, param) {
        state.searchParam = param
     }
   },
   actions : {
     incrementAsync : function({ commit }){
       setTimeout(()=>{
         commit("increment");
       },5000)
     }
   }

})
