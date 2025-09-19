import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/components/Dashboard.vue') // المسار الصحيح
  },
  {
    path: '/reports',
    name: 'Reports', 
    component: () => import('@/components/Reports.vue') // المسار الصحيح
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router