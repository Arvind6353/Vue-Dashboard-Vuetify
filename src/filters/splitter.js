import Vue from 'vue'
(() => {
Vue.filter('splitter', function (value) {
  if(!value) return '';
  return value.join(', ')
});
})();
