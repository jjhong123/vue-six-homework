import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap';
import { check } from '@/api/user';
import './bus';
import currencyFilter from './filter/currency';
import dateFilter from './filter/date';
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
import {ValidationObserver, ValidationProvider, localize, extend } from 'vee-validate';
import zh_TW from 'vee-validate/dist/locale/zh_TW';
import * as rules from 'vee-validate/dist/rules';

// Install English and Arabic locales.
localize(
  'zh_TW', zh_TW
);

// install rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

Vue.config.productionTip = true //要設定才可以使用Cookie
Vue.filter('currency', currencyFilter); // Filter for currency
Vue.filter('date', dateFilter); // Filter for date
Vue.component('Loading', Loading);// Loading

// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver',ValidationObserver);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//檢查用戶是否登入
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // 確認登入
    check().then(response => {
      console.log(response)

      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login'
        });
      }
    })
  } else {
    next();
  }

});

