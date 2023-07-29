import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import(`../pages/Home.vue`),
  },
  {
    path: "/meal/:id",
    name: "Meal Detail",
    component: () => import(`../pages/MealDetail.vue`),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Not found",
    component: () => import(`../pages/404.vue`),
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach(async (_, _from, next) => {
  return next()
})
