import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
/**
 * 说明：meta里面的auth属性代表进入该页面需不需要先登陆，
 * role代表角色
 */
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '../pages/home'),
      meta: {
        auth: true,
        role: 1,
      },
      children: [
        {
          path: '/admin',
          name: 'admin',
          component: () => import(/* webpackChunkName: "admin" */ '../pages/admin/admin.vue'),
          meta: {
            auth: true,
            role: 2,
          },
        },
        {
          path: '/auth',
          name: 'auth',
          component: () => import(/* webpackChunkName: "auth" */ '../pages/auth/auth.vue'),
          meta: {
            auth: true,
            role: 1,
          },
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../pages/login'),
    },
  ],
});
