<script setup lang="ts">
import { useMealStore } from "../stores/meals"

const mealStore = useMealStore()
console.log(mealStore.getAreaList())
</script>

<template>
  <img src="../assets/area/world.png" />
</template>
