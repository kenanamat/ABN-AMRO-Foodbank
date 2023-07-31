<script setup lang="ts">
import { useMealStore } from "../stores/meals"
import SearchBy from "../components/SearchBy.vue"
import AreaSelection from "../components/AreaSelection.vue"

const mealStore = useMealStore()
mealStore.setAreaList()
</script>

<template>
  <SearchBy>
    <!-- Selection map -->
    <div class="relative max-h-[70vh] mx-auto max-md:hidden my-12">
      <img
        src="../assets/area/world.png"
        alt="World map"
        class="max-h-[70vh] filter contrast-50 mx-auto"
      />
      <AreaSelection :areas="mealStore.areaList" :key="mealStore.searchTerm" />
    </div>
  </SearchBy>
</template>
