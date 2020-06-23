import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Field from '@/components/Field'

// import Mdt from '@/components/Mdt'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: __dirname,
  routes: [
    {
      path: '/field',
      name: 'field',
      component: Field
      // children: [
      //   {
      //     path: 'mdt',
      //     name: 'Mdt',
      //     component: Mdt
      //   }
      // ]
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
