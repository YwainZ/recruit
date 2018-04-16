import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index.vue'
import jobInfo from '../views/jobInfo.vue'

Vue.use(Router)
const infoCenter = resolve => require(['../views/infoCenter.vue'], resolve)
const createResume = resolve => require(['../views/createResume.vue'], resolve)
const login = resolve => require(['../views/login.vue'], resolve)
const register = resolve => require(['../views/register.vue'], resolve)
const demo = resolve => require(['../views/test.vue'], resolve)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/jobInfo',
      name: 'jobInfo',
      component: jobInfo
    },
    {
      path: '/infoCenter',
      name: 'infoCenter',
      component: infoCenter
    },
    {
      path: '/createResume',
      name: 'createResume',
      component: createResume
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    }
  ]
})
