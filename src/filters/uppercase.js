import Vue from 'vue'
(() => {
Vue.filter('uppercase', function (value) {
  if(!value) return '';
  let value1 = value.split(".");
  value1[0] = value1[0].toString().toUpperCase();
  return value1.join('.')
});
})();
