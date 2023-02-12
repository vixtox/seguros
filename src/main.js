import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'datatables.net-bs5/css/dataTables.bootstrap5.css'
import 'datatables.net-bs5/js/dataTables.bootstrap5.js'
import 'datatables.net/js/jquery.dataTables.js'

import LoginUser from './components/LoginUser.vue'
import ListarClientes from './components/ListarClientes.vue'
import AltaCliente from './components/AltaCliente.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false //esta linea desactiva mensaje en consola modo produccion o modo dev

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'LoginUser',
      component: LoginUser
    },
    {
      path: '/listarclientes',
      name: 'ListarClientes',
      component: ListarClientes,
      meta: { requiresAuth: true }
    },
    {
      path: '/altacliente',
      name: 'AltaCliente',
      component: AltaCliente,
      meta: { requiresAuth: true }
    }

  ]
})

//let isLoggedIn = false;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('estoyLogueado')) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')