import Vue from 'vue';
import Router from 'vue-router';
import Accounts from '@/components/Accounts';
import AspspSelection from '@/components/AspspSelection';
import Login from '@/components/Login';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/accounts',
      name: 'Accounts',
      component: Accounts,
    },
    {
      path: '/aspsp-selection',
      name: 'AspspSelection',
      component: AspspSelection,
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const loggedIn = router.app.$store.getters.isLoggedIn();
  if (!loggedIn && to.path !== '/') {
    next({
      path: '/',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});

export default router;
