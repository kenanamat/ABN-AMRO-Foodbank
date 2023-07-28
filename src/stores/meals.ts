import { defineStore } from "pinia"
import { ISearchResponse } from "../types"
import { computed, ref } from "vue"

export const useMealStore = defineStore("meals", () => {
  const meals = ref<ISearchResponse>()

  const fetchSearchMeal = async (searchTerm: string) => {
    const url = new URL("https://www.themealdb.com/api/json/v1/1/search.php")
    url.searchParams.append("s", searchTerm)

    return fetch(url)
      .then((response) => {
        response.json().then((data) => (meals.value = data))
      })
      .catch((error) => {
        console.log(`Failed to fetch meals: ${error}`)
      })
  }

  const searchMeal = (searchTerm: string) =>
    computed(() => {
      if (meals.value !== undefined) return meals.value
      fetchSearchMeal(searchTerm)
      return meals.value
    })

  return {
    meals,
    searchMeal,
  }
})
