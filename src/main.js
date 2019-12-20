import Vue from 'vue'
import App from './App.vue'
window.axios = require('axios');
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(VueSweetalert2);
//Vue.prototype.$axios  = axios
import './assets/scss/main.scss'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
