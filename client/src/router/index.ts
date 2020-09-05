import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
 
  {
    path: '/',
    name: 'Images',
    component: () => import(/* webpackChunkName: "Images" */ '../components/imagesList/imagesList.vue'),
  },
];

const router = new VueRouter({
  routes,mode:'history'

});

export default router;
