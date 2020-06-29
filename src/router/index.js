import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Field from '@/components/Field'
import FieldList from '@/components/FieldList'
// import Modal from '@/components/Modal'

// import Mdt from '@/components/Mdt'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: __dirname,
  routes: [
    {
      path: '/field/:id',
      name: 'Field',
      component: Field
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/fieldList',
      name: 'fieldList',
      component: FieldList
    }
    // {
    //   path: '/modal',
    //   name: 'modal',
    //   component: Modal
    // }
  ]
})
