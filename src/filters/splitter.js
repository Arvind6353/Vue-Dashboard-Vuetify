import Vue from 'vue'
(() => {
Vue.filter('splitter', function (value) {
  return value.join(', ')
});
})();
