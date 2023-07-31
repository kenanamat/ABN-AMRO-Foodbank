<script setup lang="ts">
import { useMealStore } from "../stores/meals"

const mealStore = useMealStore()
</script>

<template>
  <ul class="grid grid-cols-1 sm:grid-cols-2 gap-[1px] pb-20">
    <li
      v-for="meal in mealStore.searchedMeals[mealStore.searchTerm]"
      :key="meal.idMeal"
      class="relative flex items-center space-x-3 bg-primary bg-opacity-20 focus-within:ring-1 focus-within:ring-secondary-hover hover:bg-opacity-30 transition-all"
    >
      <div
        class="bg-primary bg-opacity-10 p-3 shadow-[1px_0px_10px_0px_rgba(0,0,0,0.1)]"
      >
        <!-- Render in lower quality with /preview -->
        <img
          v-if="meal.strMealThumb"
          class="h-20 w-20 rounded-lg"
          :src="meal.strMealThumb + '/preview'"
          alt=""
        />
      </div>
      <div class="min-w-0 flex-1">
        <router-link :to="`/meal/${meal.idMeal}`" class="focus:outline-none">
          <span class="absolute inset-0" aria-hidden="true" />
          <p class="text-lg tracking-wide font-bold text-white">{{ meal.strMeal }}</p>
          <p class="truncate text-sm text-gray-300">{{ meal.strCategory }}</p>
        </router-link>
      </div>
    </li>
  </ul>
</template>
