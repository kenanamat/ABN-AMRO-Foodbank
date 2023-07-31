<script setup lang="ts">
import SearchForm from "./SearchForm.vue"
import { useMealStore } from "../stores/meals"
import MealResults from "./MealResults.vue"

const mealStore = useMealStore()
</script>

<template>
  <div class="pb-6 pt-12 bg-black-green">
    <section class="flex gap-4 justify-between items-center flex-wrap">
      <h1 class="text-white text-4xl">Search by area:</h1>
      <SearchForm :fetch="mealStore.fetchByArea" />
    </section>
  </div>
  <div class="py-12 bg-primary bg-opacity-20">
    <section class="">
      
    </section>
  </div>
  <slot></slot>
  <MealResults :meals="mealStore.areaMeals['area' + mealStore.searchTerm]" />
</template>
