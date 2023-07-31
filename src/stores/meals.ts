import { defineStore } from "pinia"
import { IMeal, ingredientsListItem } from "../types"
import { ref } from "vue"
import axios from "axios"

export const useMealStore = defineStore("meals", () => {
  const searchedMeals = ref<{ [term: string]: IMeal[] }>({})
  const randomMeals = ref<IMeal[]>([])
  const searchTerm = ref("")
  const searchArea = ref("")

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

  const fetchList = (listToFetch: "categories" | "area" | "ingredients") => {
    return new Promise<IMeal[]>(async (resolve, reject) => {
      try {
        let param: { [key: string]: "list" } = {}

        if (listToFetch == "categories") param = { c: "list" }
        else if (listToFetch == "area") param = { a: "list" }
        else if (listToFetch == "ingredients") param = { i: "list" }
        const response = await axios.get("/api/list.php", {
          params: param,
        })

        resolve(response.data.meals)
      } catch (error) {
        console.log(`Failed to fetch meal detail: ${error}`)
        reject(error)
      }
    })
  }

  const getAreaList = async () => {
    const areaList: string[] = []
    await fetchList("area").then((data) => {
      data.forEach((area) => {
        if (area.strArea) areaList.push(area.strArea)
      })
    })
    return areaList
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
    searchArea,
    getAreaList,
  }
})
