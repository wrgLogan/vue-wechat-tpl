import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/indexPage/index.vue'
import About from '@/page/aboutPage/index.vue'

Vue.use(Router);

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

initPages(routes);

export default new Router({
  routes: routes
});


function initPages(pageList) {
  for (var i = 0, len = pageList.length; i < len; i++) {
    var page = pageList[i];

    page.component.type = 'page';
  }
}