import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/components/Dashboard.vue')
  },
  {
    path: '/reports',
    name: 'Reports', 
    component: () => import('@/components/Reports.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'production' ? '/fitcode-task/' : '/'),
  routes
})

export default router