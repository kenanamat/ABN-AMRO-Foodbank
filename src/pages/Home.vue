<script setup lang="ts">
import { ref } from "vue"
import MealSearch from "../components/MealSearch.vue"

const searchTerm = ref("")
</script>

<template>
  <main>
    <h1 class="text-primary font-bold text-2xl">ABN AMRO's FOODBANK</h1>
    <input type="text" v-model="searchTerm" />
    <MealSearch :search="searchTerm" #default="{ meals }" :key="searchTerm">
      <ul class="space-y-4 mt-8">
        <li
          v-for="meal in meals.meals"
          :key="meal.idMeal"
          class="font-bold text-white"
        >
          {{ meal.strMeal }}
        </li>
      </ul>
    </MealSearch>
  </main>
</template>
