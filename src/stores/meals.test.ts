import { mealsMockArray } from "../data/mockMealsArray"
import { useMealStore } from "./meals"
import { createPinia, setActivePinia } from "pinia"
import MockAdapter from "axios-mock-adapter"
import axios from "axios"
import { describe, beforeEach, it, expect, afterEach, vi } from "vitest"
import { IMeal } from "../types"
import { ref } from "vue"

var mock = new MockAdapter(axios)

afterEach(() => {
  vi.restoreAllMocks()
})

describe("useMealStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("fetches default search result and adds it to searchedMeals", async () => {
    mock
      .onGet("/api/search.php", {
        params: {
          s: "",
        },
      })
      .reply(200, { meals: mealsMockArray })

    const mealStore = useMealStore()
    expect(mealStore.searchedMeals).toStrictEqual({})
    await mealStore.fetchSearchMeal()
    expect(mealStore.searchedMeals[""]).toEqual(mealsMockArray)
  })

  it("fetches a random meal and adds 3 meals to randomMeals", async () => {
    mock.onGet("/api/random.php").reply(200, {
      meals: [
        mealsMockArray[Math.floor(Math.random() * mealsMockArray.length)],
      ],
    })

    const mealStore = useMealStore()
    expect(mealStore.randomMeals).toStrictEqual([])
    await mealStore.fetchRandomMeal()
    expect(mealStore.randomMeals.length).toBe(1)
    await mealStore.set3RandomMeals()
    expect(mealStore.randomMeals.length).toBe(3)
  })

  it("fetches meal by id", async () => {
    mock
      .onGet("/api/lookup.php", {
        params: {
          i: "53065",
        },
      })
      .reply(200, {
        meals: [mealsMockArray[2]],
      })
    const mealStore = useMealStore()
    const meal = ref<IMeal>()
    await mealStore.fetchMealDetail("53065").then((data) => (meal.value = data))
    expect(meal.value).toBeDefined()
    expect(meal.value?.strMeal).toBe("Sushi")
  })

  it("creates a correct ingredients list", () => {
    const meal = mealsMockArray[7]
    const mealStore = useMealStore()

    const ingredientsList = mealStore.getIngredientsList(meal)

    expect(ingredientsList).toHaveLength(15)
    expect(ingredientsList[0]).toBeDefined()
    expect(ingredientsList[0].measure).toBe("1 tblsp ")
    expect(ingredientsList[0].ingredient).toBe("Olive Oil")

    expect(ingredientsList).toStrictEqual([
      { ingredient: "Olive Oil", measure: "1 tblsp " },
      { ingredient: "Bacon", measure: "2" },
      { ingredient: "Onion", measure: "1 finely chopped " },
      { ingredient: "Celery", measure: "1 Stick" },
      { ingredient: "Carrots", measure: "1 medium" },
      { ingredient: "Garlic", measure: "2 cloves chopped" },
      { ingredient: "Minced Beef", measure: "500g" },
      { ingredient: "Tomato Puree", measure: "1 tbls" },
      { ingredient: "Chopped Tomatoes", measure: "800g" },
      { ingredient: "Honey", measure: "1 tblsp " },
      { ingredient: "Lasagne Sheets", measure: "500g" },
      { ingredient: "Creme Fraiche", measure: "400ml" },
      { ingredient: "Mozzarella Balls", measure: "125g" },
      { ingredient: "Parmesan Cheese", measure: "50g" },
      { ingredient: "Basil Leaves", measure: "Topping" },
    ])
  })
})
