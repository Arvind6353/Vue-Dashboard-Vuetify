import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Search from '@/components/Search'
import Add from '@/components/Add'
import ViewDetail from '@/components/ViewDetail'
import Del from '@/components/Del'
import NotFound from '@/components/NotFound'
import ErrorPage from '@/components/ErrorPage'
import Confluence from '@/components/Confluence'

Vue.component("Add",Add);
Vue.component("Search", Search);
Vue.component("ViewDetail",ViewDetail);
Vue.component("Del",Del);
Vue.component("NotFound", NotFound);
Vue.component("ErrorPage",ErrorPage);
Vue.component("Confluence",Confluence);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/search'
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
    },
    {
      path: '/confluence',
      name: 'Confluence',
      component: Confluence
    },
    {
      path: '/errorpage',
      name: 'ErrorPage',
      component: ErrorPage
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
