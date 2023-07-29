import { defineStore } from "pinia"
import { IMeal, ISearchResponse } from "../types"
import { computed, ref } from "vue"
import axios from "axios"

export const useMealStore = defineStore("meals", () => {
  const searchedMeals = ref<{ [searchTerm: string]: ISearchResponse }>({})
  const randomMeals = ref<IMeal[]>([])

  const fetchSearchMeal = (searchTerm: string) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await axios.get("/api/search.php", {
          params: { s: searchTerm },
        })
        searchedMeals.value[searchTerm] = response.data
        resolve()
      } catch (error) {
        console.log(`Failed to fetch meals: ${error}`)
        reject(error)
      }
    })
  }

  const searchMeal = (searchTerm: string) =>
    computed(() => {
      if (searchedMeals.value[searchTerm] !== undefined)
        return searchedMeals.value[searchTerm]
      fetchSearchMeal(searchTerm)
      return searchedMeals.value[searchTerm]
    })

  const fetchRandomMeal = () => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await axios.get("/api/random.php")
        randomMeals.value.push(response.data.meals[0])
        resolve()
      } catch (error) {
        console.log(`Failed to fetch meals: ${error}`)
        reject(error)
      }
    })
  }

  const set3RandomMeals = async () => {
    while (randomMeals.value.length < 2) {
      await fetchRandomMeal()
    }
  }

  const get3RandomMeals = () =>
    computed(() => {
      if (randomMeals.value.length >= 3) return randomMeals.value
      set3RandomMeals()
      return randomMeals.value
    })

  return {
    searchMeal,
    searchedMeals,
    fetchSearchMeal,
    get3RandomMeals,
  }
})
