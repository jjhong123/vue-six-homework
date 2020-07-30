import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../components/HelloWorld'
import Login from '../views/Login';
import Dashboard from '../components/dashboard';
import Products from '../components/pages/Products';
import Orders from '../components/pages/Orders';
import Coupons from '../components/pages/Coupons';
import CustomerOrder from '../components/pages/CustomerOrders';
import CustomerCheckout from '../components/pages/CustomerCheckout';

Vue.use(VueRouter)

const routes = [
  {
    //避免用戶進入不存在頁面
    path: '*',
    redirect: 'login'
  },
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home,
  //   meta:{
  //     requiresAuth: true,
  //   }
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/admin',
    name: 'Dashboards',
    component: Dashboard,
    children: [
      {
        path: 'products',
        name: 'Products',
        component: Products,
        meta: { requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: Orders,
        meta: { requiresAuth: true }
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: Coupons,
        meta: { requiresAuth: true }
      }
    ],
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: 'coustomer_order',
        name: 'CustomerOrder',
        component: CustomerOrder,
      },
      {
        path: 'customer_checkout/:orderId',
        name: 'CustomerCheckout',
        component: CustomerCheckout,
      },
    ],
  },
]

const router = new VueRouter({
  routes
});


export default router
