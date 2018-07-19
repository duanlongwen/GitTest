import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import pcpay from '@/views/pcpay/pcpay'
import login from '@/views/login/index'


/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {
    path: '/',
    redirect: '/pcpay',
    component: Layout,
    hidden: true
  },
  {
    path: '/login',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        name: 'login',
        component: login,//() => import('@/views/login/index'),
        meta: { title: '登录', icon: 'table', channel: '' }
      }]
  },
  {
    path: '/pcpay',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        name: 'pcpay',
        component: pcpay,
        meta: { title: '唐小僧', icon: 'table', channel: '' }
      }]
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  { path: '*', redirect: '/404', hidden: true }
]
