import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Field from '@/components/Field'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: __dirname,
  routes: [
    {
      path: '/field',
      name: 'field',
      component: Field
    }
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
  ]
})
