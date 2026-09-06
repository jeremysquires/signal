import Vue from 'vue';
import BootstrapVueNext from 'bootstrap-vue-next';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

import App from './App.vue';
import store from './store';
import router from './router';

Vue.config.productionTip = false;
Vue.use(BootstrapVueNext);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
