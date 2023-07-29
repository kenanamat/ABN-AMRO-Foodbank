<script setup lang="ts">
import { useRoute } from "vue-router"

const route = useRoute()

const mealId = (route.params.id ?? "") as string
</script>

<template>
  wat
  {{ mealId != '' ? mealId : 'wat' }}
</template>
