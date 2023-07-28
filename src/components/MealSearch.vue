<script setup lang="ts">
import { useMealStore } from "../stores/meals"

const props = withDefaults(
  defineProps<{
    search?: string
  }>(),
  {
    search: "",
  }
)

const mealStore = useMealStore()
const meals = mealStore.searchMeal(props.search)
</script>

<template>
  <div
    v-if="!meals"
    class="h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
    role="status"
  >
    <span class="sr-only"> Loading... </span>
  </div>
  <div v-else>
    <span class="sr-only">Search results for "{{ search }}"</span>
    <slot v-bind="{ meals }"></slot>
  </div>
</template>
