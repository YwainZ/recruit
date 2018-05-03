import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index.vue'
import jobInfo from '../views/jobInfo.vue'

Vue.use(Router)
const infoCenter = resolve => require(['../views/infoCenter.vue'], resolve)
const createResume = resolve => require(['../views/createResume.vue'], resolve)
const login = resolve => require(['../views/login.vue'], resolve)
const register = resolve => require(['../views/register.vue'], resolve)
const test = resolve => require(['../views/test.vue'], resolve)
const userInfo = resolve => require(['../views/userInfo.vue'], resolve)
const companyDetail = resolve => require(['../views/companyDetail.vue'], resolve)
const search = resolve => require(['../views/searchRes.vue'], resolve)
const test2 = resolve => require(['../views/test2.vue'], resolve)
const hrUserInfo = resolve => require(['../views/hrViews/userInfo.vue'], resolve)
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
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: userInfo
    },
    {
      path: '/companyDetail',
      name: 'companyDetail',
      component: companyDetail
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/test2',
      name: 'test2',
      component: test2

    },
    {
      path: '/hrView',
      name: 'hrView',
      component: hrUserInfo
    }
  ]
})
