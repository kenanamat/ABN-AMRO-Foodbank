import { defineStore } from "pinia"
import { ISearchResponse } from "../types"
import { computed, ref } from "vue"
import axios from "axios"

export const useMealStore = defineStore("meals", () => {
  const searchedMeals = ref<{ [searchTerm: string]: ISearchResponse }>({})

  // const fetchSearchMeal = async (searchTerm: string) => {
  //   try {
  //     const response = await axios.get(`/api/search.php?s=${searchTerm}`)
  //     searchedMeals.value[searchTerm] = response.data
  //   } catch (error) {
  //     console.log(`Failed to fetch meals: ${error}`)
  //   }
  // }

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

  return {
    searchMeal,
    searchedMeals,
    fetchSearchMeal,
  }
})
