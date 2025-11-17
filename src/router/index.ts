import { createRouter, createWebHistory } from 'vue-router'

// Seiten-Komponenten direkt verwenden
import LandingPage from '@/components/LandingPage.vue'
import RegisterPage from '@/components/RegisterPage.vue'
import PasswortPage from '@/components/PasswortPage.vue'
import HomePage from '@/components/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: PasswortPage,
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage,
    },
  ],
})

export default router
