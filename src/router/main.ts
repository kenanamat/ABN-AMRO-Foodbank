import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { useMealStore } from "../stores/meals"

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
    path: "/area",
    name: "Search by area",
    component: () => import(`../pages/SearchBy.vue`),
  },
  {
    path: "/categories",
    name: "Search by categories",
    component: () => import(`../pages/SearchBy.vue`),
  },
  {
    path: "/ingredients",
    name: "Search by ingredients",
    component: () => import(`../pages/SearchBy.vue`),
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
  const mealStore = useMealStore()
  mealStore.tempSearch = ""
  mealStore.emptyResults = false
  return next()
})
