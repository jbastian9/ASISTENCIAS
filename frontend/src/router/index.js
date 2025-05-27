import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '../layouts/DashboardLayout.vue'

// Vistas del dashboard
import Dashboard from '../views/Dashboard.vue'
import Fuentes from '../views/personalizar/Fuentes.vue'
import Colores from '../views/personalizar/Colores.vue'
import Estructura from '../views/personalizar/Estructura.vue'

// Vistas públicas (auth)
import IngresoView from '../views/IngresoView.vue'
import RegistroView from '../views/RegistroView.vue'
import RecuperarContrasenaView from '../views/RecuperarContrasenaView.vue'

const routes = [
  // Rutas públicas
  {
    path: '/ingreso',
    name: 'Ingreso',
    component: IngresoView,
  },
  {
    path: '/registro',
    name: 'Registro',
    component: RegistroView,
  },
  {
    path: '/recuperar-contrasena',
    name: 'RecuperarContrasena',
    component: RecuperarContrasenaView,
  },

  // Rutas protegidas con layout
  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: 'personalizar/fuentes',
        name: 'Fuentes',
        component: Fuentes,
      },
      {
        path: 'personalizar/colores',
        name: 'Colores',
        component: Colores,
      },
      {
        path: 'personalizar/estructura',
        name: 'Estructura',
        component: Estructura,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router