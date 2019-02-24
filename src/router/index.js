import Vue from 'vue'
import Router from 'vue-router'
import CommonPage from '../components/common/commonPage.vue'
import index from '../views/index.vue'
import jobInfo from '../views/jobInfo.vue'

Vue.use(Router)
const infoCenter = resolve => require(['../views/infoCenter.vue'], resolve)
const login = resolve => require(['../views/login.vue'], resolve)
const register = resolve => require(['../views/register.vue'], resolve)
const userInfo = resolve => require(['../views/userInfo.vue'], resolve)
const companyDetail = resolve => require(['../views/companyDetail.vue'], resolve)
const search = resolve => require(['../views/searchRes.vue'], resolve)
const hrUserInfo = resolve => require(['../views/hrViews/userInfo.vue'], resolve)

export default new Router({
  routes: [
    {
      path: '/',
      component: CommonPage,
      children: [
        {
          path: '/',
          name: 'index',
          component: index
        }
      ]
    },
    {
      path: '/jobInfo',
      component: CommonPage,
      children: [
        {
          path: '/',
          name: 'jobInfo',
          component: jobInfo
        }
      ]
    },
    {
      path: '/infoCenter',
      component: CommonPage,
      children: [
        {
          path: '/',
          name: 'infoCenter',
          component: infoCenter
        }
      ]
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
      path: '/userInfo',
      component: CommonPage,
      children: [
        {
          path: '/',
          name: 'userInfo',
          component: userInfo
        }
      ]
    },
    {
      path: '/companyDetail',
      component: CommonPage,
      children: [
        {
          path: '/',
          name: 'companyDetail',
          component: companyDetail
        }
      ]
    },
    {
      path: '/search',
      component: CommonPage,
      children: [
        {
          path: '',
          name: 'search',
          component: search
        }
      ]
    },
    {
      path: '/hrView',
      component: CommonPage,
      children: [
        {
          path: '/',
          name: 'hrView',
          component: hrUserInfo
        }
      ]
    }
  ]
})
