<script setup lang="ts">
import { useMealStore } from "../stores/meals"

const mealStore = useMealStore()

defineProps<{ areas: string[] }>()

const getURL = (area: string) => {
  return new URL(`/src/assets/area/${area}.png`, import.meta.url).href
}
</script>

<template>
  <template v-for="area in areas">
    <!-- Shadow effect -->
    <img
      aria-disabled="true"
      v-if="
        mealStore.searchTerm.toLocaleLowerCase() == area.toLocaleLowerCase() &&
        !getURL(area).includes('undefined')
      "
      :src="getURL(area)"
      :alt="`${mealStore.searchTerm} area`"
      class="absolute inset-0 max-h-[70vh] mx-auto filter brightness-[65%] saturate-100"
    />
    <Transition
      :appear="true"
      enter-active-class="ease-out duration-500"
      enter-from-class="translate-y-0 opacity-0"
      enter-to-class="-translate-y-2 opacity-100"
      leave-active-class="ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <img
        v-if="
          mealStore.searchTerm.toLocaleLowerCase() ==
            area.toLocaleLowerCase() && !getURL(area).includes('undefined')
        "
        :src="getURL(area)"
        :alt="`${mealStore.searchTerm} area`"
        class="absolute inset-0 max-h-[70vh] mx-auto filter brightness-0 saturate-100 -translate-y-1.5 -translate-x-1"
        style="
          filter: brightness(0) saturate(100%) invert(69%) sepia(65%)
            saturate(327%) hue-rotate(6deg) brightness(110%) contrast(92%);
        "
      />
    </Transition>
  </template>
</template>
