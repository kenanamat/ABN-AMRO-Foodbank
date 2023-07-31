<script setup lang="ts">
import SearchForm from "./SearchForm.vue"
import { useMealStore } from "../stores/meals"
import MealResults from "./MealResults.vue"
import { useRoute } from "vue-router"
import Button from "./Button.vue"
import { computed } from "vue"

const mealStore = useMealStore()

const searchBy = useRoute().path.split("/")[1]

const list = computed(() => {
  if (searchBy == "area") {
    return mealStore.areaList.filter((item) =>
      item.toLowerCase().includes(mealStore.tempSearch.toLowerCase())
    )
  }
  return []
})
const listByLetter = (letter: string) => {
  if (!list.value) return []
  return list.value.filter((item) => item[0].toLowerCase() == letter) ?? []
}
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
</script>

<template>
  <div class="pb-6 pt-12 bg-black-green">
    <section class="flex gap-4 justify-between items-center flex-wrap">
      <h1 class="text-white text-4xl">Search by {{ searchBy }}:</h1>
      <SearchForm
        :forced-search-term="list.length == 1 ? list[0] : undefined"
        search-by="area"
      />
    </section>
  </div>
  <div class="py-12 bg-primary bg-opacity-20">
    <section class="" v-if="list?.length > 0">
      <ul class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4">
        <template v-for="letter in alphabet">
          <li
            v-if="listByLetter(letter)?.length > 0"
            class="inline-block w-full mt-4"
          >
            <div
              class="bg-primary text-sm leading-6 shadow-lg w-6 h-6 text-center text-white mb-1"
            >
              {{ letter.toUpperCase() }}
            </div>
            <ul>
              <li
                v-for="item in listByLetter(letter)"
                class="relative flex first-of-type:mt-0 mt-2"
              >
                <Button
                  @click="mealStore.initSearch('area', item)"
                  class="min-w-0 rounded-none flex-1 text-sm bg-primary bg-opacity-20 focus-within:ring-1 focus-within:ring-secondary-hover hover:bg-opacity-30 transition-all"
                >
                  {{ item }}
                </Button>
              </li>
            </ul>
          </li>
        </template>
      </ul>
    </section>
    <section v-else>
      <h2 class="text-white font-bold text-2xl">No results</h2>
    </section>
  </div>
  <slot></slot>
  <MealResults :meals="mealStore.areaMeals[searchBy + mealStore.searchTerm]" />
</template>
