// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import vueaxios from 'vue-axios'
import VueResource from 'vue-resource'
// import axios from 'axios'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueResource)
// Vue.use(vueaxios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
