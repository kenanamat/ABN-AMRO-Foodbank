import { mealsMockArray } from "../data/mockMealsArray"
import { createPinia, setActivePinia } from "pinia"
import MockAdapter from "axios-mock-adapter"
import axios from "axios"
import { mount } from "@vue/test-utils"
import { describe, beforeEach, it, expect, afterEach, vi } from "vitest"
import SearchForm from "./SearchForm.vue"
import { useMealStore } from "../stores/meals"

var mock = new MockAdapter(axios)

afterEach(() => {
  vi.restoreAllMocks()
})

describe("SearchForm", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  mock.onGet("/api/search.php").reply(200, {
    meals: mealsMockArray,
  })

  it("renders correctly", () => {
    const wrapper = mount(SearchForm, { props: { searchBy: "search" } })
    expect(wrapper.exists()).toBe(true)
  })

  it("calls initSearch and enters value with search", async () => {
    const wrapper = mount(SearchForm, { props: { searchBy: "search" } })
    const mealStore = useMealStore()
    await wrapper.find("input").setValue("Corba")
    await wrapper.find("#searchForm").trigger("submit.prevent")
    expect(mealStore.searchedMeals["Corba"][0]).toEqual(mealsMockArray[0])
  })

  it("calls initSearch and enters value with filter type", async () => {
    mock
      .onGet("/api/filter.php", {
        params: { a: "Turkish" }, // fetchBy[0] because API asks for first letter (a, i, c)
      })
      .reply(200, {
        meals: [
          {
            strMeal: "Corba",
            strMealThumb:
              "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",
            idMeal: "52977",
          },
          {
            strMeal: "Kumpir",
            strMealThumb:
              "https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg",
            idMeal: "52978",
          },
        ],
      })
    const wrapper = mount(SearchForm, { props: { searchBy: "area" } })
    const mealStore = useMealStore()
    await wrapper.find("input").setValue("Turkish")
    await wrapper.find("#searchForm").trigger("submit.prevent")
    console.log(mealStore.filterMeals)

    expect(mealStore.filterMeals["areaTurkish"][0].strMeal).toContain("Corba")
  })

  it("clears tempSearch when icon is clicked", async () => {
    const mealStore = useMealStore()
    const wrapper = mount(SearchForm, { props: { searchBy: "search" } })
    mealStore.emptyResults = true
    await wrapper.find("input").setValue("pizzas")
    await wrapper.find("svg").trigger("click")
    expect(mealStore.tempSearch).toBe("")
  })
})
