<script setup lang="ts">
import MealResults from "../components/MealResults.vue"
import { useMealStore } from "../stores/meals"
import Button from "../components/Button.vue"
import { ref } from "vue"
import RandomMealBlock from "../components/RandomMealBlock.vue"

const mealStore = useMealStore()
const randomMeals = mealStore.get3RandomMeals()

const search = ref("")
const initSearch = async () => {
  mealStore.searchTerm = search.value
  await mealStore.fetchSearchMeal()
  document.getElementById("results")?.scrollIntoView({ behavior: "smooth" })
}
</script>

<template>
  <main>
    <!-- Hero -->
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
              <Button type="submit" class="!rounded-full" arrow />
            </form>
          </div>
        </div>
      </section>

      <!-- Random meal cards -->
      <section class="relative">
        <h2 class="sr-only">Random meals</h2>
        <ul
          class="mx-auto grid max-w-md grid-cols-1 gap-y-6 sm:max-w-7xl sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 lg:gap-x-14"
        >
          <RandomMealBlock
            v-for="meal in randomMeals"
            :meal="meal"
            :key="meal.idMeal"
          />
        </ul>
      </section>
    </div>

    <!-- Search results -->
    <section id="results" class="">
      <template v-if="mealStore.searchedMeals[mealStore.searchTerm]">
        <h2 class="text-4xl font-bold text-white">Search results:</h2>
        <hr class="my-4" />
        <MealResults />
      </template>
    </section>
  </main>
</template>
