import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { getComponent } from "../utils/getComponent"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => getComponent("Home"),
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})
