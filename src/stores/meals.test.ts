import { mealsMockArray } from "../data/mockMealsArray"
import { useMealStore } from "./meals"
import { createPinia, setActivePinia } from "pinia"
import MockAdapter from "axios-mock-adapter"
import axios from "axios"
import { describe, beforeEach, it, expect, afterEach, vi } from "vitest"
import flushPromises from "flush-promises"

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
})
