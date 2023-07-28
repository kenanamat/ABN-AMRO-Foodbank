import { mealsMockArray } from "../data/mockMealsArray"
import { useMealStore } from "./meals"
import { createPinia, setActivePinia } from "pinia"
import MockAdapter from "axios-mock-adapter"
import axios from "axios"

var mock = new MockAdapter(axios)

const searchTerm = ""
mock
  .onGet("/api/search.php", {
    params: {
      s: searchTerm,
    },
  })
  .reply(200, mealsMockArray)

afterEach(() => {
  jest.restoreAllMocks()
})

describe("useMealStore", () => {
  beforeEach(() => setActivePinia(createPinia()))

  it("starts searchedMeals as undefined and adds to it", async () => {
    const mealStore = useMealStore()
    expect(mealStore.searchedMeals).toStrictEqual({})
    await mealStore.fetchSearchMeal("")
    expect(mealStore.searchedMeals[""]).toEqual(mealsMockArray)
  })
})
