<script setup lang="ts">
import { useMealStore } from "../stores/meals"
import { IMeal } from "../types"

const props = defineProps<{ meal: IMeal }>()
const mealStore = useMealStore()
const ingredientsList = mealStore.getIngredientsList(props.meal)
</script>

<template>
  <ul
    class="bg-opacity-10 bg-primary mt-6 shadow-2xl rounded divide-y divide-black-green"
  >
    <li
      v-for="ingredient in ingredientsList"
      class="text-gray-100 flex max-sm:text-sm items-center pl-4 py-2 gap-4 transition-all hover:bg-primary hover:bg-opacity-10 first-of-type:pt-2 last-of-type:pb-2"
    >
      <label :for="ingredient.ingredient" class="sr-only">
        Checkbox for {{ ingredient.measure }}
        {{ ingredient.ingredient }}
      </label>
      <input
        type="checkbox"
        class="h-7 w-7 bg-transparent border border-primary cursor-pointer checked:bg-transparent checked:border checked:border-primary"
        :id="ingredient.ingredient"
      />
      <span class="font-bold">
        {{ ingredient.measure }} {{ ingredient.ingredient }}
      </span>
      <div
        class="ml-auto flex items-center -my-2 py-2 shadow-[1px_0px_10px_0px_rgba(0,0,0,0.1)_inset]"
      >
        <img
          class="h-10 sm:h-14 filter sepia-[60%] opacity-90 px-2"
          :src="`https://www.themealdb.com/images/ingredients/${ingredient.ingredient}-Small.png`"
          :alt="`Image of ${ingredient.ingredient}`"
        />
      </div>
    </li>
  </ul>
</template>
