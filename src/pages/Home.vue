<script setup lang="ts">
import { ref } from "vue"

const searchRes = ref("")
</script>

<template>
  <main>
    <h1 class="text-primary font-bold text-2xl">ABN AMRO's FOODBANK</h1>
    <input type="text" v-model="searchRes" />
  </main>
</template>
