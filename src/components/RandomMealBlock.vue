<script setup lang="ts">
import { IMeal } from "../types"

defineProps<{ meal: IMeal }>()
</script>

<template>
  <Transition
    :appear="true"
    enter-active-class="ease-out duration-500"
    enter-from-class="translate-y-4 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <li
      class="group relative h-96 rounded-lg shadow-xl sm:aspect-h-5 sm:aspect-w-4 sm:h-auto randomMeal"
    >
      <div
        aria-hidden="true"
        class="absolute inset-0 overflow-hidden rounded-lg group-hover:rotate-1 border-primary border"
      >
        <div class="absolute inset-0 overflow-hidden">
          <img
            v-if="meal.strMealThumb"
            :src="meal.strMealThumb"
            :alt="`Image of ${meal.strMeal}`"
            class="h-full w-full object-cover object-center group-hover:scale-[1.01] transition-all ease-in-out group-hover:brightness-110 filter"
          />
        </div>
        <!-- Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black-green transition-all group-hover:opacity-90 ease-in-out duration-300"
        />
      </div>
      <!-- Bottom text -->
      <div class="absolute inset-0 flex items-end rounded-lg p-6">
        <div>
          <p aria-hidden="true" class="text-sm text-white">Check the recipe</p>
          <h3 class="mt-1 font-semibold text-white">
            <router-link :to="`/meal/${meal.idMeal}`">
              <div class="absolute inset-0" />
              {{ meal.strMeal }}
            </router-link>
          </h3>
        </div>
      </div>
    </li>
  </Transition>
</template>
