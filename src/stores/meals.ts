import { defineStore } from "pinia"
import { ISearchResponse } from "../types"
import { computed, ref } from "vue"

export const useMealStore = defineStore("meals", () => {
  const searchedMeals = ref<{ [searchTerm: string]: ISearchResponse }>({})

  const fetchSearchMeal = async (searchTerm: string) => {
    return fetch(`/api/search.php?s=${searchTerm}`)
      .then((response) => {
        response.json().then((data) => (searchedMeals.value[searchTerm] = data))
      })
      .catch((error) => {
        console.log(`Failed to fetch meals: ${error}`)
      })
  }

  const searchMeal = (searchTerm: string) =>
    computed(() => {
      if (searchedMeals.value[searchTerm] !== undefined)
        return searchedMeals.value[searchTerm]
      fetchSearchMeal(searchTerm)
      return searchedMeals.value[searchTerm]
    })

  return {
    searchMeal,
  }
})
