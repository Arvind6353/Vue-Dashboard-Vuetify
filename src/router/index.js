import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Search from '@/components/Search'
import Add from '@/components/Add'
import ViewDetail from '@/components/ViewDetail'
import Del from '@/components/Del'


Vue.component("Add",Add);
Vue.component("Search", Search);
Vue.component("ViewDetail",ViewDetail);
Vue.component("Del",Del);
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/add',
      name: 'Add',
      component: Add
    }
  ]
})
