import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: require('@/components/Home').default
    },
    {
      path: '/info',
      name: 'Info',
      component: require('@/components/Info').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/edit/:id',
      props: true,
      name: 'Edit',
      component: require('@/components/Edit').default
    }
  ]
})
