// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueResource from 'vue-resource';

Vue.use(VueResource);

Vue.use(Vuetify)
// import Vuetable from 'vuetable-2/src/components/Vuetable.vue';
// import VueTablePagination from 'vuetable-2/src/components/VuetablePagination.vue';
// import VueTablePaginationDropDown  from 'vuetable-2/src/components/VuetablePaginationDropdown.vue';
// import VueTablePaginationInfo  from 'vuetable-2/src/components/VueTablePaginationInfo.vue';


Vue.use(BootstrapVue);
//Vue.use(Vuetable);
// Vue.component("vuetable", Vuetable);
// Vue.component("vuetable-pagination", VueTablePagination);
// Vue.component("vuetable-pagination-dropdown", VueTablePaginationDropDown);
// Vue.component("vuetable-pagination-info", VueTablePaginationInfo);



Vue.config.productionTip = false
Vue.use(router);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
