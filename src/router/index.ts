import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue'),
    },
  ],
})

router.beforeEach((to) => {
  const cartStore = useCartStore()
  const { isCartEmpty } = storeToRefs(cartStore)

  if (to.path === '/checkout' && isCartEmpty.value) {
    return { name: 'home' }
  }
})

export default router
