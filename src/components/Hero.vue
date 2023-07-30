<script setup lang="ts">
// import { useRouter } from "vue-router"
import { useMealStore } from "../stores/meals"
import Button from "./Button.vue"
import { ref } from "vue"

const mealStore = useMealStore()
const randomMeals = mealStore.get3RandomMeals()

// const router = useRouter()

const search = ref("")
const initSearch = async () => {
  mealStore.searchTerm = search.value
  await mealStore.fetchSearchMeal()
  document.getElementById("results")?.scrollIntoView({ behavior: "smooth" })
}
</script>

<template>
  <div class="relative min-h-full">
    <!-- Background image and overlap -->
    <div
      aria-hidden="true"
      class="absolute inset-0 flex flex-col h-4/6 !min-h-[840px]"
    >
      <div class="relative w-full flex-1">
        <div class="absolute inset-0 overflow-hidden opacity-30">
          <img
            src="../assets/background-image.jpg"
            alt="Background image"
            class="h-full w-full object-cover object-center filter blur"
          />
        </div>
      </div>
    </div>

    <!-- Title and search -->
    <section class="flex items-center justify-center text-center h-[50vh]">
      <div class="relative py-32">
        <h1 class="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
          ABN AMRO Foodbank
        </h1>
        <div class="mt-4 sm:mt-6 -ml-4">
          <form
            class="flex gap-4 justify-center"
            @submit.prevent="initSearch()"
          >
            <input type="text" v-model="search" />
            <Button type="submit" class="!rounded-full" />
          </form>
        </div>
      </div>
    </section>

    <!-- Random meal cards -->
    <section class="relative">
      <h2 class="sr-only">Random meals</h2>
      <div
        class="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 sm:px-6 lg:gap-x-8 lg:px-8"
      >
        <div
          v-for="meal in randomMeals"
          :key="meal.idMeal"
          class="group relative h-96 rounded-lg shadow-xl sm:aspect-h-5 sm:aspect-w-4 sm:h-auto border-primary border randomMeal"
        >
          <div
            aria-hidden="true"
            class="absolute inset-0 overflow-hidden rounded-lg"
          >
            <div
              class="absolute inset-0 overflow-hidden group-hover:opacity-75"
            >
              <img
                v-if="meal.strMealThumb"
                :src="meal.strMealThumb"
                :alt="`Image of ${meal.strMeal}`"
                class="h-full w-full object-cover object-center"
              />
            </div>
            <div
              class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"
            />
          </div>
          <div class="absolute inset-0 flex items-end rounded-lg p-6">
            <div>
              <p aria-hidden="true" class="text-sm text-white">Shop the meal</p>
              <h3 class="mt-1 font-semibold text-white">
                <router-link :to="`/meal/${meal.idMeal}`">
                  <span class="absolute inset-0" />
                  {{ meal.strMeal }}
                </router-link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
