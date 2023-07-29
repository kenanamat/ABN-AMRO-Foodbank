<script setup lang="ts">
import Hero from "../components/Hero.vue"
import MealResults from "../components/MealResults.vue"
import { useMealStore } from "../stores/meals"

const mealStore = useMealStore()
</script>

<template>
  <main>
    <Hero />
    <section id="results" class="">
      <template v-if="mealStore.searchedMeals[mealStore.searchTerm]">
        <h2 class="text-4xl font-bold text-white">Search results:</h2>
        <hr class="my-4" />
        <MealResults />
      </template>
    </section>
  </main>
</template>
