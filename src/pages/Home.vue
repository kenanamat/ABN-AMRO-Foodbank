<script setup lang="ts">
import MealResults from "../components/MealResults.vue"
import { useMealStore } from "../stores/meals"
import Button from "../components/Button.vue"
import { ref, onMounted } from "vue"
import RandomMealBlock from "../components/RandomMealBlock.vue"
import {
  ArrowPathIcon,
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/24/outline"

const mealStore = useMealStore()
mealStore.set3RandomMeals()

const search = ref("")
const emptyResults = ref(false)
const initSearch = async () => {
  mealStore.searchTerm = search.value
  await mealStore.fetchSearchMeal().catch(() => {
    emptyResults.value = true
  })
  if (!emptyResults.value)
    document.getElementById("results")?.scrollIntoView({ behavior: "smooth" })
  search.value = ""
}

const input = ref<HTMLInputElement | null>(null)
onMounted(() => {
  input.value?.focus()
})
</script>

<template>
  <main>
    <!-- Hero -->
    <div class="relative min-h-full">
      <!-- Background image and overlap -->
      <div
        aria-hidden="true"
        class="absolute inset-0 flex flex-col h-4/6 !min-h-[840px]"
      >
        <div class="relative w-full flex-1">
          <div class="absolute inset-0 overflow-hidden opacity-30">
            <img
              src="../assets/background-image.jpg"
              alt="Background image"
              class="h-full w-full object-cover object-center filter blur"
            />
          </div>
        </div>
      </div>

      <!-- Title and search -->
      <section
        class="flex items-center justify-center text-center min-h-[50vh]"
      >
        <div class="relative py-16 md:py-32">
          <img
            aria-hidden="true"
            src="../assets/abn-amro-logo.png"
            alt="ABN AMRO logo"
            class="h-16 mb-6 mx-auto"
          />
          <h1
            class="text-3xl font-bold text-white sm:text-5xl md:text-6xl tracking-wide mb-6"
          >
            Welcome to FoodBank!
          </h1>
          <p class="text-lg leading-snug max-w-5xl text-white">
            Our ultimate culinary oasis where we serve up a feast of delightful
            recipes for your taste buds to indulge in! <br />
            Here, we're not crunching numbers. We're crunching on some delicious
            veggies instead.
          </p>
          <div class="mt-12">
            <form
              class="flex gap-4 justify-center"
              @submit.prevent="initSearch()"
            >
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
          </div>
        </div>
      </section>

      <!-- Random meal cards -->
      <section class="relative">
        <h2 class="sr-only">Random meals</h2>
        <ul
          class="mx-auto grid max-w-md grid-cols-1 gap-y-6 sm:max-w-7xl sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 lg:gap-x-14"
        >
          <RandomMealBlock
            v-for="meal in mealStore.randomMeals"
            :meal="meal"
            :key="meal.idMeal"
          />
        </ul>
        <Button
          v-show="mealStore.randomMeals.length == 3"
          class="rounded-full mt-12 mb-4 mx-auto transition-all duration-300 !bg-opacity-40 hover:rotate-180 !p-3"
          :class="[
            mealStore.randomMeals.length == 3 ? 'opacity-100' : 'opacity-0',
          ]"
          @click="mealStore.set3RandomMeals()"
        >
          <span class="sr-only">Refresh random meals</span>
          <ArrowPathIcon class="h-6 text-gray-300" />
        </Button>
      </section>
    </div>

    <!-- Search results -->
    <section id="results" class="">
      <template v-if="mealStore.searchedMeals[mealStore.searchTerm]">
        <h2 class="text-4xl font-bold text-white">Search results:</h2>
        <hr class="my-4" />
        <MealResults />
      </template>
    </section>
  </main>
</template>
