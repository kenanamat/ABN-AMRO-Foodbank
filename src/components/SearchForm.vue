<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useMealStore } from "../stores/meals"
import Button from "../components/Button.vue"
import {
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/24/outline"

const mealStore = useMealStore()

const props = defineProps<{
  fetch: Function
}>()

const search = ref("")
const emptyResults = ref(false)
const initSearch = async () => {
  mealStore.searchTerm = search.value
  await props.fetch().catch(() => {
    emptyResults.value = true
  })
  if (!emptyResults.value)
    document.getElementById("results")?.scrollIntoView({ behavior: "smooth" })
  search.value = ""
}

// Focus input on mount
const input = ref<HTMLInputElement | null>(null)
onMounted(() => {
  input.value?.focus()
})
</script>

<template>
  <form class="flex gap-4 justify-center" @submit.prevent="initSearch()">
    <label for="search" class="sr-only"> Search for a meal </label>
    <div class="relative w-full max-w-[374px]">
      <input
        type="text"
        name="search"
        id="search"
        ref="input"
        :class="[
          'bg-primary bg-opacity-30 w-full h-full text-white border-none ring-primary ring-1 ring-inset focus:ring-2 focus:ring-inset',
          emptyResults
            ? 'ring-red-300 placeholder:text-red-300 focus:ring-red-500'
            : 'placeholder:text-primary focus:ring-secondary-hover',
        ]"
        placeholder="Find your meal!"
        v-model="search"
        @keydown="emptyResults = false"
        :aria-invalid="emptyResults"
        aria-describedby="no-results"
      />
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <ExclamationCircleIcon
          v-if="emptyResults"
          class="h-5 w-5 text-red-500"
          aria-hidden="true"
        />
        <MagnifyingGlassIcon
          v-else
          aria-hidden="true"
          class="h-5 w-5 text-black-green"
        />
      </div>
      <p
        v-if="emptyResults"
        class="mt-4 text-sm text-red-600 absolute -bottom-5"
        id="no-results"
      >
        No meals found!
      </p>
    </div>
    <Button type="submit" class="!rounded-full" arrow />
  </form>
</template>
