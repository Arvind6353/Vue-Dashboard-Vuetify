import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Search from '@/components/Search'
import Add from '@/components/Add'


Vue.component("Add",Add);
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
