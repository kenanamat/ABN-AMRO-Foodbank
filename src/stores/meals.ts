import { defineStore } from "pinia"
import { IMeal } from "../types"
import { computed, ref } from "vue"
import axios from "axios"

export const useMealStore = defineStore("meals", () => {
  const searchedMeals = ref<{ [term: string]: IMeal[] }>({})
  const randomMeals = ref<IMeal[]>([])
  const searchTerm = ref("")

  const fetchSearchMeal = () => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await axios.get("/api/search.php", {
          params: { s: searchTerm.value },
        })
        searchedMeals.value[searchTerm.value] = response.data.meals
        resolve()
      } catch (error) {
        console.log(`Failed to fetch meals: ${error}`)
        reject(error)
      }
    })
  }

  const fetchRandomMeal = () => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await axios.get("/api/random.php")
        randomMeals.value.push(response.data.meals[0])
        resolve()
      } catch (error) {
        console.log(`Failed to fetch random meal: ${error}`)
        reject(error)
      }
    })
  }

  const set3RandomMeals = async () => {
    while (randomMeals.value.length < 3) {
      // No duplicate check since the chance is less than 1.02%
      await fetchRandomMeal()
    }
  }

  const get3RandomMeals = () =>
    computed(() => {
      if (randomMeals.value.length > 0) return randomMeals.value
      set3RandomMeals()
      return randomMeals.value
    })

  return {
    searchedMeals,
    fetchSearchMeal,
    randomMeals,
    fetchRandomMeal,
    set3RandomMeals,
    get3RandomMeals,
    searchTerm,
  }
})
