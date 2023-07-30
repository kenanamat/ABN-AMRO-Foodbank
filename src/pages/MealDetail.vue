<script setup lang="ts">
import { useRoute } from "vue-router"
import { useMealStore } from "../stores/meals"
import { ref } from "vue"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue"
import { generalDescriptions } from "../data/generalDescriptions"
import { IMeal } from "../types"
import { CubeTransparentIcon } from "@heroicons/vue/24/outline"
import Button from "../components/Button.vue"

// Fetch the meal with id from route
const route = useRoute()
const mealId = (route.params.id ?? "") as string
const mealStore = useMealStore()
const meal = ref<IMeal>()
mealStore.fetchMealDetail(mealId).then((data) => (meal.value = data))

// Get a random description for the meal
const randomDescription =
  generalDescriptions[Math.floor(Math.random() * generalDescriptions.length)]
</script>

<template>
  <main class="">
    <section v-if="meal" class="grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-y-10">
      <!-- Meal ingredients -->
      <div
        class="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none order-2 lg:!order-1"
      >
        <!-- Header -->
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
          <ul
            class="bg-opacity-10 bg-primary mt-6 shadow-2xl rounded divide-y divide-black-green"
          >
            <li
              v-for="ingredient in mealStore.getIngredientsList(meal)"
              class="text-gray-100 flex items-center pl-4 pr-6 py-2 gap-4 transition-all hover:bg-primary hover:bg-opacity-10 first-of-type:pt-2 last-of-type:pb-2"
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
              <img
                class="h-12 filter sepia-[60%] opacity-90 ml-auto"
                :src="`https://www.themealdb.com/images/ingredients/${ingredient.ingredient}-Small.png`"
                :alt="`Image of ${ingredient.ingredient}`"
              />
            </li>
          </ul>
        </div>
      </div>
      <!-- Meal image -->
      <div class="lg:col-span-4 lg:row-end-1 order-1 lg:!order-2">
        <div class="aspect-h-3 aspect-w-4 overflow-hidden max-lg:-mx-6">
          <img
            v-if="meal.strMealThumb"
            :src="meal.strMealThumb"
            :alt="`Image of ${meal.strMeal}`"
            class="object-cover object-center"
          />
        </div>
      </div>

      <!-- Meal instructions -->
      <div
        class="mx-auto mt-12 w-full max-w-2xl lg:col-span-4 lg:-mt-2 lg:max-w-none order-3 p-6"
      >
        <TabGroup as="div">
          <div class="border-b border-black-green">
            <TabList class="flex">
              <Tab as="template" v-slot="{ selected }">
                <Button
                  :class="[
                    selected ? '!bg-opacity-30' : '!bg-opacity-10',
                    '!shadow-none',
                  ]"
                >
                  Instructions
                </Button>
              </Tab>
              <Tab as="template" v-slot="{ selected }" v-if="meal.strYoutube">
                <Button
                  :class="[
                    selected ? '!bg-opacity-30' : '!bg-opacity-10',
                    '!shadow-none',
                  ]"
                >
                  Video instructions
                </Button>
              </Tab>
            </TabList>
          </div>
          <TabPanels as="template">
            <TabPanel class="">
              <h3 class="sr-only">Instructions</h3>
              <p
                class="whitespace-pre-wrap text-white bg-primary bg-opacity-10 shadow-lg p-6"
                v-html="meal.strInstructions"
              />
            </TabPanel>

            <TabPanel class="relative" v-if="meal.strYoutube">
              <h3 class="sr-only">Video instructions</h3>
              <!-- Fake loader -->
              <div
                class="animate-pulse z-0 absolute bg-black-green w-full h-96 inset-0"
              />
              <iframe
                class="relative z-10 w-full h-96"
                :src="`https://www.youtube.com/embed/${
                  meal.strYoutube.split('=')[1]
                }`"
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </section>
  </main>
</template>
