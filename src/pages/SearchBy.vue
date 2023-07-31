<script setup lang="ts">
import SearchForm from "../components/SearchForm.vue"
import { useMealStore } from "../stores/meals"
import MealResults from "../components/MealResults.vue"
import { useRoute } from "vue-router"
import Button from "../components/Button.vue"
import { computed } from "vue"
import AreaSelection from "../components/AreaSelection.vue"
import Loader from "../components/Loader.vue"
import { ILists } from "../types"

const mealStore = useMealStore()

mealStore.filterList = []
const searchBy = useRoute().path.split("/")[1] as keyof ILists
mealStore.setFilterList(searchBy as keyof ILists)

const list = computed(() => {
  return mealStore.filterList.filter((item) =>
    item.toLowerCase().includes(mealStore.tempSearch.toLowerCase())
  )
})
const listByLetter = (letter: string) => {
  if (!list.value) return []
  return list.value.filter((item) => item[0].toLowerCase() == letter) ?? []
}
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
</script>

<template>
  <main>
    <div class="pb-6 pt-12 bg-black-green">
      <section class="flex gap-4 justify-between items-center flex-wrap">
        <h1 class="text-white text-4xl">Search by {{ searchBy }}:</h1>
        <SearchForm
          :forced-search-term="list.length == 1 ? list[0] : undefined"
          :search-by="searchBy"
        />
      </section>
    </div>
    <div class="bg-primary bg-opacity-20">
      <Transition
        v-if="list?.length > 0"
        :appear="true"
        enter-active-class="ease-out duration-500"
        enter-from-class="-translate-y-4 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <!-- List -->
        <section class="pt-6 pb-12">
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
                      @click="mealStore.initSearch(searchBy, item)"
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
      </Transition>

      <section class="py-12" v-else-if="mealStore.filterList.length == 0">
        <Loader />
      </section>

      <section class="py-12" v-else>
        <h2 class="text-white font-bold text-2xl">No results</h2>
      </section>
    </div>
    <!-- Selection map -->
    <Transition
      :appear="true"
      enter-active-class="ease-out duration-500"
      enter-from-class=" opacity-0"
      enter-to-class="opacity-100"
    >
      <div
        v-if="searchBy == 'area' && list?.length > 0"
        class="relative max-h-[70vh] mx-auto max-md:hidden my-12"
      >
        <img
          src="../assets/area/world.png"
          alt="World map"
          class="max-h-[70vh] filter contrast-50 mx-auto"
        />
        <AreaSelection
          :areas="mealStore.filterList"
          :key="mealStore.searchTerm"
        />
      </div>
    </Transition>
    <!-- Search results -->
    <MealResults
      :meals="mealStore.filterMeals[searchBy + mealStore.searchTerm]"
    />
  </main>
</template>
