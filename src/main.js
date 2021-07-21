import Notifications from 'vue-notification'
import Vue from 'vue';
import App from './App.vue';
import proxyConfig from './proxies/_config';
import store from './store/index';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone' 
 

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSpinner, faCog)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueMoment, {
  moment,
})
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


Vue.config.productionTip = false;
 
Vue.use({
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$proxies', {
      value: proxyConfig
    })
  }
});

import router from './router';

Vue.use(Notifications);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
