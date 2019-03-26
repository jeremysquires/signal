import Vue from 'vue';
import Router from 'vue-router';
import MenuGuide from './components/MenuGuide';
import Menu from './components/Menu';
import User from './components/User';
import store from './store'
import { find } from 'lodash';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'menuguide',
      component: MenuGuide,
    },
    {
      path: '/menu',
      name: 'randommenu',
      component: Menu,
      beforeEnter: (to, from, next) => {
        if (!store.state.user) {
          next('/users');
        } else {
          next();
        }
      },
    },
    {
      path: '/menu/:login',
      name: 'usermenu',
      component: Menu,
      beforeEnter: (to, from, next) => {
        if (!store.state.user || (!to.params.login === !store.state.user.login)) {
          // get user from users, if it exists, or route to users
          const user = find(store.state.users, { 'login': to.params.login });
          if (!user) {
            next('/users');
          } else {
            store.commit('setUser', user);
          }
        }
        next();
      },
    },
    {
      path: '/user/:login',
      name: 'userprofile',
      component: User,
      beforeEnter: (to, from, next) => {
        if (!store.state.user || (!to.params.login === !store.state.user.login)) {
          // get user from users, if it exists, or route to users
          const user = find(store.state.users, { 'login': to.params.login });
          if (!user) {
            next('/users');
          } else {
            store.commit('setUser', user);
            console.log(`commit ${store.state.user}`); // eslint-disable-line no-console
          }
        }
        next();
      },
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      beforeEnter: (to, from, next) => {
        console.log(store.state.user); // eslint-disable-line no-console
        if (!store.state.user) {
          next('/users');
        } else {
          next();
        }
      },
    },
    {
      path: '/users',
      name: 'users',
      component: User,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/About.vue')
    },
  ],
});

export default router;