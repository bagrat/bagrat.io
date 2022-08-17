import { createRouter, createWebHistory } from 'vue-router'
import EngView from '../views/EngView.vue'
import V7View from '../views/V7View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'engineer-profile',
    //   component: EngView,
    // },
    {
      path: '/v7',
      name: 'v7-story',
      component: V7View,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
