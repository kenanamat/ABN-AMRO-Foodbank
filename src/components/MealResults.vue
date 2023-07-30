<script setup lang="ts">
import { useMealStore } from "../stores/meals"

const mealStore = useMealStore()
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div
      v-for="meal in mealStore.searchedMeals[mealStore.searchTerm]"
      :key="meal.idMeal"
      class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
    >
      <div class="flex-shrink-0">
        <!-- Render in lower quality with /preview -->
        <img
          v-if="meal.strMealThumb"
          class="h-10 w-10 rounded-full"
          :src="meal.strMealThumb + '/preview'" 
          alt=""
        />
      </div>
      <div class="min-w-0 flex-1">
        <router-link :to="`/meal/${meal.idMeal}`" class="focus:outline-none">
          <span class="absolute inset-0" aria-hidden="true" />
          <p class="text-sm font-medium text-gray-900">{{ meal.strMeal }}</p>
          <p class="truncate text-sm text-gray-500">{{ meal.strCategory }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
