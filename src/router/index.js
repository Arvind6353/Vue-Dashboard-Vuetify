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
import AllSearch from '@/components/AllSearch'

import Banner from '@/components/Banner'
import TabView from '@/components/TabView'

import Postman from '@/components/Postman'

import Tools from '@/components/Tools'

import ProductCentral from '@/components/ProductCentral'

import MTSFaq from '@/components/MTSFaq'

import DeveloperPortal from '@/components/DeveloperPortal'


Vue.component("Add",Add);
Vue.component("Dashboard", Dashboard);
Vue.component("ViewDetail",ViewDetail);
Vue.component("Del",Del);
Vue.component("NotFound", NotFound);
Vue.component("ErrorPage",ErrorPage);
Vue.component("ContentSearch",ContentSearch);
Vue.component("ConfluenceSearch",ConfluenceSearch);

Vue.component("banner", Banner);
Vue.component("tabview",TabView);

Vue.component("allsearch",AllSearch);
Vue.component("Tools", Tools);
Vue.component("Postman", Postman);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/contentsearch2'
    },
    {
      path : '/contentsearch2',
     // name : 'Allsearch',
      component: AllSearch,
      children : [

        {
          path : 'dashboardSearch',
          component : Dashboard
        },
        {
          path : 'boxcontent',
          component : ContentSearch
        },
        {
          path : 'confluencecontent',
          component : ConfluenceSearch
        },
        {
          path : 'developerportal',
          component : DeveloperPortal
        },
        {
          path : 'mtsfaq',
          component : MTSFaq
        },
        {
          path : 'productcentral',
          component : ProductCentral
        },
        {
          path : 'postmanapitester',
          component : ProductCentral
        },
        {
          path : '',
          redirect: '/contentsearch2/dashboardSearch'
        }
      ]
    },

    {
      path: '/errorpage',
      name: 'ErrorPage',
      component: ErrorPage
    },
    {
      path: '/tools',
      name: 'Tools',
      component: Tools
    },
    {
      path: '/postman',
      name: 'Postman',
      component: Postman
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
