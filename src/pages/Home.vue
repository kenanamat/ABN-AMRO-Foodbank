<script setup lang="ts">
import MealResults from "../components/MealResults.vue"
import { useMealStore } from "../stores/meals"
import Button from "../components/Button.vue"
import RandomMealBlock from "../components/RandomMealBlock.vue"
import { ArrowPathIcon } from "@heroicons/vue/24/outline"
import SearchForm from "../components/SearchForm.vue"

const mealStore = useMealStore()
mealStore.set3RandomMeals()
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
      <section
        class="flex items-center justify-center text-center min-h-[50vh]"
      >
        <div class="relative py-16 md:py-32">
          <img
            aria-hidden="true"
            src="../assets/abn-amro-logo.png"
            alt="ABN AMRO logo"
            class="h-16 mb-6 mx-auto"
          />
          <h1
            class="text-3xl font-bold text-white sm:text-5xl md:text-6xl tracking-wide mb-6"
          >
            Welcome to FoodBank!
          </h1>
          <p class="text-lg leading-snug max-w-5xl text-white">
            Our ultimate culinary oasis where we serve up a feast of delightful
            recipes for your taste buds to indulge in! <br />
            Here, we're not crunching numbers. We're crunching on some delicious
            veggies instead.
          </p>
          <div class="mt-12">
            <SearchForm search-by="search" />
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
            v-for="meal in mealStore.randomMeals"
            :meal="meal"
            :key="meal.idMeal"
          />
        </ul>
        <Button
          v-show="mealStore.randomMeals.length == 3"
          class="rounded-full mt-12 mb-4 mx-auto transition-all duration-300 !bg-opacity-40 hover:rotate-180 !p-3"
          :class="[
            mealStore.randomMeals.length == 3 ? 'opacity-100' : 'opacity-0',
          ]"
          @click="mealStore.set3RandomMeals()"
        >
          <span class="sr-only">Refresh random meals</span>
          <ArrowPathIcon class="h-6 text-gray-300" />
        </Button>
      </section>
    </div>

    <!-- Search results -->
    <MealResults :meals="mealStore.searchedMeals[mealStore.searchTerm]" />
  </main>
</template>
