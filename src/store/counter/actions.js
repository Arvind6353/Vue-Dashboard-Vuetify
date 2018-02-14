import * as types from "../types";

export default {
  [types.INCREMENT] : ({commit}) => {
   console.log( this.$http)
    commit(types.INCREMENT)
  }

}
