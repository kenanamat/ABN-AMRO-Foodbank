<script setup lang="ts">
import { useRoute } from "vue-router"
import { useMealStore } from "../stores/meals"
import { ref } from "vue"
import { IMeal } from "../types"
import MealDetailIngredients from "../components/MealDetailIngredients.vue"
import MealDetailInstructions from "../components/MealDetailInstructions.vue"
import Loader from "../components/Loader.vue"

// Fetch the meal with id from route
const route = useRoute()
const mealId = (route.params.id ?? "") as string
const mealStore = useMealStore()
const meal = ref<IMeal>()
mealStore.fetchMealDetail(mealId).then((data) => (meal.value = data))
</script>

<template>
  <main class="">
    <section v-if="meal" class="grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-y-10">
      <!-- Meal ingredients -->
      <MealDetailIngredients :meal="meal" />
      <!-- Meal image -->
      <div class="lg:col-span-4 lg:row-end-1 order-1 lg:!order-2">
        <div
          class="aspect-h-3 sm:aspect-h-2 lg:aspect-h-3 aspect-w-4 overflow-hidden max-lg:-mx-6"
        >
          <img
            v-if="meal.strMealThumb"
            :src="meal.strMealThumb"
            :alt="`Image of ${meal.strMeal}`"
            class="object-cover object-center"
          />
        </div>
      </div>
      <!-- Meal instructions -->
      <MealDetailInstructions :meal="meal" />
    </section>
    <Loader v-else class="mt-20" />
  </main>
</template>
