import { defineStore } from "pinia"
import { ILists, IMeal, ingredientsListItem } from "../types"
import { ref } from "vue"
import axios from "axios"

export const useMealStore = defineStore("meals", () => {
  const searchedMeals = ref<{
    [term: string]: IMeal[]
  }>({})
  const filterMeals = ref<{
    [term: string]: IMeal[]
  }>({})

  const filterList = ref<string[]>([])

  const randomMeals = ref<IMeal[]>([])
  const searchTerm = ref("")
  const tempSearch = ref("")
  const emptyResults = ref(false)

  const fetchSearchMeal = () => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await axios.get("/api/search.php", {
          params: { s: searchTerm.value },
        })
        if (response.data.meals == null) reject("No results")
        else searchedMeals.value[searchTerm.value] = response.data.meals
        resolve()
      } catch (error) {
        console.log(`Failed to fetch meals: ${error}`)
        reject(error)
      }
    })
  }

  const initSearch = async (
    searchBy: "search" | "area" | "categories" | "ingredients",
    forcedSearchTerm?: string | undefined
  ) => {
    emptyResults.value = false // Reset search error
    searchTerm.value = forcedSearchTerm ?? tempSearch.value // For custom searches
    if (searchBy == "search")
      await fetchSearchMeal().catch(() => {
        emptyResults.value = true
      })
    else
      await fetchFilter(searchBy).catch(() => {
        emptyResults.value = true
      })
    // Scroll to results
    if (!emptyResults.value)
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" })
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
    randomMeals.value = []
    while (randomMeals.value.length < 3) {
      // No duplicate check since the chance is less than 1.02%
      await fetchRandomMeal()
    }
  }

  const fetchMealDetail = (id: string) => {
    return new Promise<IMeal>(async (resolve, reject) => {
      try {
        const response = await axios.get("/api/lookup.php", {
          params: {
            i: id,
          },
        })
        resolve(response.data.meals[0])
      } catch (error) {
        console.log(`Failed to fetch meal detail: ${error}`)
        reject(error)
      }
    })
  }

  // Fetches a list of possible areas, ingredients or categories
  const fetchList = <T extends keyof ILists>(fetchBy: T) => {
    return new Promise<ILists[T]>(async (resolve, reject) => {
      try {
        const response = await axios.get("/api/list.php", {
          params: { [fetchBy[0]]: "list" }, // fetchBy[0] because API asks for first letter (a, i, c)
        })

        resolve(response.data.meals)
      } catch (error) {
        console.log(`Failed to fetch meal detail: ${error}`)
        reject(error)
      }
    })
  }

  // Fetches meals by areas, ingredients or categories
  const fetchFilter = (fetchBy: keyof ILists) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await axios.get("/api/filter.php", {
          params: { [fetchBy[0]]: searchTerm.value }, // fetchBy[0] because API asks for first letter (a, i, c)
        })

        if (response.data.meals == null) reject("No results")
        else filterMeals.value[fetchBy + searchTerm.value] = response.data.meals
        resolve()
      } catch (error) {
        console.log(`Failed to fetch meals: ${error}`)
        reject(error)
      }
    })
  }

  // Set a better formatted list for meals filtered by areas, ingredients or categories
  const setFilterList = async (setBy: keyof ILists) => {
    if (filterList.value.length > 0) return

    await fetchList(setBy).then((data) => {
      if (setBy === "area") {
        data.forEach((item) => {
          if ("strArea" in item) {
            filterList.value.push(item.strArea)
          }
        })
      } else if (setBy === "ingredients") {
        data.forEach((item) => {
          if ("strIngredient" in item) {
            filterList.value.push(item.strIngredient)
          }
        })
      } else if (setBy === "categories") {
        data.forEach((item) => {
          if ("strCategory" in item) {
            filterList.value.push(item.strCategory)
          }
        })
      }
    })

    filterList.value.sort()
  }

  // Create a better formatted list of ingredients
  const getIngredientsList = (meal: IMeal) => {
    let list: ingredientsListItem[] = []
    // API returns no more than 20 ingredients
    for (let index = 1; index < 20; index++) {
      const ingredient = meal[`strIngredient${index}` as keyof IMeal] ?? ""
      if (ingredient == "") break
      else {
        const measure = meal[`strMeasure${index}` as keyof IMeal] ?? ""
        list.push({
          ingredient: ingredient,
          measure: measure,
        })
      }
    }
    return list
  }

  return {
    searchedMeals,
    fetchSearchMeal,
    randomMeals,
    fetchRandomMeal,
    set3RandomMeals,
    searchTerm,
    fetchMealDetail,
    getIngredientsList,
    fetchList,
    fetchFilter,
    filterMeals,
    tempSearch,
    initSearch,
    emptyResults,
    filterList,
    setFilterList,
  }
})
