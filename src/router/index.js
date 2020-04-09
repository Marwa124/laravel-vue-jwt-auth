import Vue from "vue";
import VueRouter from "vue-router";
import { Form, HasError, AlertError } from "vform";

import VueSpinners from 'vue-spinners';
Vue.use(VueSpinners);

window.Form = Form;

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

Vue.use(VueRouter);

import {routes, AppUrl} from './routes';
window.AppUrl = AppUrl;

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

import index from '@/store/index';
router.beforeEach((to, from, next) => {
  // let token = localStorage.getItem('token');
  let loggedIn = index.state.loggedIn;
  if(to.matched.some(record => record.meta.secure)) {
    // if(token == null){
    if(!loggedIn){
      next({
        path: '/login'
      })
    }else {
      next()
    }
  }else if (to.matched.some(record => record.meta.guest)){
    // if(token == null){
    if(!loggedIn){
      next()
    }else {
      next({
        path: '/profile'
      })
    }
  }else {
    next()
  }
});

export default router;
