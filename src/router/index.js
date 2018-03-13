import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/indexPage/index.vue'
import About from '@/page/aboutPage/index.vue'

Vue.use(Router)

var routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

export default new Router({
  routes: routes
})
