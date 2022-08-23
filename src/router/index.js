import { createRouter, createWebHistory } from "vue-router";
import V7View from "@/views/V7View.vue";
// import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: V7View,
    },
    {
      path: "/v7",
      name: "v7-story",
      component: V7View,
    },
  ],
});

export default router;
