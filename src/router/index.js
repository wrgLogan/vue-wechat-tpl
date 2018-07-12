import Vue from 'vue'
import Router from 'vue-router'
import init from '../initPlugin';

const Index = () => import('@/page/indexPage/index.vue');
const Sub = () => import('@/page/subPage/index.vue');

Vue.use(Router);

var routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/sub',
    name: 'Sub',
    component: Sub
  }
];

export default new Router({
  routes: routes
});