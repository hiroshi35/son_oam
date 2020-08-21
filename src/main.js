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
// import Quasar from 'quasar'
import Quasar from 'quasar-framework/dist/quasar.mat.esm'
import 'quasar-framework/dist/umd/quasar.mat.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(Quasar)
// Vue.use(axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
