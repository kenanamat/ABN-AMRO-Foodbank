<script setup lang="ts">
import Navigation from "./components/Navigation.vue"
import { useRoute } from "vue-router"

const route = useRoute()
</script>

<template>
  <Navigation />
  <router-view :key="route.name?.toString()" />
</template>
