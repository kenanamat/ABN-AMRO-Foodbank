<script setup lang="ts">
import { IMeal } from "../types"
import { generalDescriptions } from "../data/generalDescriptions"
import { CubeTransparentIcon } from "@heroicons/vue/24/outline"
import RequiredIngredients from "../components/RequiredIngredients.vue"

defineProps<{ meal: IMeal }>()

// Get a random description for the meal
const randomDescription =
  generalDescriptions[Math.floor(Math.random() * generalDescriptions.length)]
</script>

<template>
  <div
    class="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none order-2 lg:!order-1"
  >
    <!-- Meal title -->
    <div class="bg-black-green lg:pt-12 p-6">
      <h1 class="text-2xl font-bold text-white sm:text-3xl">
        {{ meal.strMeal }}
      </h1>

      <div class="mt-2">
        <p class="text-lg text-gray-400">
          {{ meal.strCategory }}
        </p>
        <p v-if="meal.strTags" class="text-xs text-gray-400">
          Tags: {{ meal.strTags }}
        </p>
      </div>
    </div>

    <!-- Description and ingredients -->
    <div class="p-6 border-black-green lg:border-r-2">
      <p class="text-white">{{ randomDescription }}</p>
      <hr class="my-8 border-primary" />
      <h2 class="flex gap-4 items-center mt-6">
        <CubeTransparentIcon class="h-12 text-white" />
        <span class="text-white font-bold text-2xl">
          Required ingredients
        </span>
      </h2>
      <RequiredIngredients :meal="meal" />
    </div>
  </div>
</template>
