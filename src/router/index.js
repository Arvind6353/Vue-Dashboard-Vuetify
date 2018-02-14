import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Add from '@/components/Add'
import ViewDetail from '@/components/ViewDetail'
import Del from '@/components/Del'
import NotFound from '@/components/NotFound'
import ErrorPage from '@/components/ErrorPage'
import ContentSearch from '@/components/ContentSearch'
import ConfluenceSearch from '@/components/ConfluenceSearch'
import ContentSearchNav from '@/components/ContentSearchNav'
import Counter from '@/components/Counter'

Vue.component("Add",Add);
Vue.component("Dashboard", Dashboard);
Vue.component("ViewDetail",ViewDetail);
Vue.component("Del",Del);
Vue.component("NotFound", NotFound);
Vue.component("ErrorPage",ErrorPage);
Vue.component("ContentSearch",ContentSearch);
Vue.component("ConfluenceSearch",ConfluenceSearch);
Vue.component("ContentSearchNav",ContentSearchNav);

Vue.component("Counter",Counter);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/add',
      name: 'Add',
      component: Add
    },
    {
      path: '/contentsearch',
      name: 'ContentSearch',
      component: ContentSearch
    },
    {
      path: '/confluencesearch',
      name: 'ConfluenceSearch',
      component: ConfluenceSearch
    },
    {
      path: '/errorpage',
      name: 'ErrorPage',
      component: ErrorPage
    },
    {
      path: '/counter',
      name: 'counter',
      component: Counter
    },

    {
      path: '*',
      component: NotFound
    }
  ]
})
