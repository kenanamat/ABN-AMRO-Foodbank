import { mealsMockArray } from "../data/mockMealsArray"
import { createPinia, setActivePinia } from "pinia"
import MockAdapter from "axios-mock-adapter"
import axios from "axios"
import { mount } from "@vue/test-utils"
import { describe, beforeEach, it, expect, afterEach, vi } from "vitest"
import flushPromises from "flush-promises"
import Home from "../pages/Home.vue"

var mock = new MockAdapter(axios)

afterEach(() => {
  vi.restoreAllMocks()
})

describe("Home", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  mock.onGet("/api/random.php").reply(200, {
    meals: [mealsMockArray[Math.floor(Math.random() * mealsMockArray.length)]],
  })

  it("renders h1 and input", () => {
    const wrapper = mount(Home)
    expect(wrapper.find("h1").exists()).toBeTruthy()
    expect(wrapper.find("input[type=text]").exists()).toBeTruthy()
  })

  it("shows random meals", async () => {
    const wrapper = mount(Home)
    await flushPromises()
    expect(wrapper.findAll(".randomMeal")).toHaveLength(3)
  })
})
