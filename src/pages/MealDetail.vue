<script setup lang="ts">
import { useRoute } from "vue-router"
import { useMealStore } from "../stores/meals"
import { ref } from "vue"
import { StarIcon } from "@heroicons/vue/20/solid"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue"
import { generalDescriptions } from "../data/generalDescriptions"
import { IMeal } from "../types"
import { CubeTransparentIcon } from "@heroicons/vue/24/outline"

// Fetch the meal with id from route
const route = useRoute()
const mealId = (route.params.id ?? "") as string
const mealStore = useMealStore()
const meal = ref<IMeal>()
mealStore.fetchMealDetail(mealId).then((data) => (meal.value = data))

// Get a random description for the meal
const randomDescription =
  generalDescriptions[Math.floor(Math.random() * generalDescriptions.length)]

const reviews = {
  average: 4,
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!</p>
      `,
      date: "July 16, 2021",
      datetime: "2021-07-16",
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 2,
      rating: 5,
      content: `
        <p>Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.</p>
      `,
      date: "July 12, 2021",
      datetime: "2021-07-12",
      author: "Hector Gibbons",
      avatarSrc:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
}
const faqs = [
  {
    question: "What format are these icons?",
    answer:
      "The icons are in SVG (Scalable Vector Graphic) format. They can be imported into your design tool of choice and used directly in code.",
  },
  {
    question: "Can I use the icons at different sizes?",
    answer:
      "Yes. The icons are drawn on a 24 x 24 pixel grid, but the icons can be scaled to different sizes as needed. We don't recommend going smaller than 20 x 20 or larger than 64 x 64 to retain legibility and visual balance.",
  },
  // More FAQs...
]
</script>

<template>
  <main class="">
    <section v-if="meal" class="">
      <div class="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-y-10">
        <!-- Meal ingredients -->
        <div
          class="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none"
        >
          <!-- Header -->
          <div class="bg-black-green lg:pt-12 p-6">
            <h1 class="text-2xl font-bold text-white sm:text-3xl">
              {{ meal.strMeal }}
            </h1>

            <div class="mt-2">
              <p class="text-lg text-gray-400">
                {{ meal.strCategory }}
              </p>
              <p v-if="meal.strTags" class="text-xs text-gray-400">
                Tags: {{ meal.strTags }}
              </p>
            </div>
          </div>

          <!-- Description and ingredients -->
          <div class="p-6 border-black-green border-r-4">
            <p class="text-white">{{ randomDescription }}</p>
            <hr class="-mx-6 my-8 border-primary" />
            <h2 class="flex gap-4 items-center">
              <CubeTransparentIcon class="h-12   text-white " />
              <span class="text-white font-bold text-2xl">Ingredients</span>
            </h2>
            <ul class="bg-primary p-4">
              
            </ul>
          </div>
        </div>
        <!-- Meal image -->
        <div class="lg:col-span-4 lg:row-end-1">
          <div class="aspect-h-3 aspect-w-4 overflow-hidden">
            <img
              v-if="meal.strMealThumb"
              :src="meal.strMealThumb"
              :alt="`Image of ${meal.strMeal}`"
              class="object-cover object-center"
            />
          </div>
        </div>
        <!-- Meal instructions -->
        <div
          class="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none"
        >
          <TabGroup as="div">
            <div class="border-b border-gray-200">
              <TabList class="-mb-px flex space-x-8">
                <Tab as="template" v-slot="{ selected }">
                  <button
                    :class="[
                      selected
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                      'whitespace-nowrap border-b-2 py-6 text-sm font-medium',
                    ]"
                  >
                    Customer Reviews
                  </button>
                </Tab>
                <Tab as="template" v-slot="{ selected }">
                  <button
                    :class="[
                      selected
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                      'whitespace-nowrap border-b-2 py-6 text-sm font-medium',
                    ]"
                  >
                    FAQ
                  </button>
                </Tab>
                <Tab as="template" v-slot="{ selected }">
                  <button
                    :class="[
                      selected
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                      'whitespace-nowrap border-b-2 py-6 text-sm font-medium',
                    ]"
                  >
                    License
                  </button>
                </Tab>
              </TabList>
            </div>
            <TabPanels as="template">
              <TabPanel class="-mb-10">
                <h3 class="sr-only">Customer Reviews</h3>

                <div
                  v-for="(review, reviewIdx) in reviews.featured"
                  :key="review.id"
                  class="flex space-x-4 text-sm text-gray-500"
                >
                  <div class="flex-none py-10">
                    <img
                      :src="review.avatarSrc"
                      alt=""
                      class="h-10 w-10 rounded-full bg-gray-100"
                    />
                  </div>
                  <div
                    :class="[
                      reviewIdx === 0 ? '' : 'border-t border-gray-200',
                      'py-10',
                    ]"
                  >
                    <h3 class="font-medium text-gray-900">
                      {{ review.author }}
                    </h3>
                    <p>
                      <time :datetime="review.datetime">{{ review.date }}</time>
                    </p>

                    <div class="mt-4 flex items-center">
                      <StarIcon
                        v-for="rating in [0, 1, 2, 3, 4]"
                        :key="rating"
                        :class="[
                          review.rating > rating
                            ? 'text-yellow-400'
                            : 'text-gray-300',
                          'h-5 w-5 flex-shrink-0',
                        ]"
                        aria-hidden="true"
                      />
                    </div>
                    <p class="sr-only">{{ review.rating }} out of 5 stars</p>

                    <div
                      class="prose prose-sm mt-4 max-w-none text-gray-500"
                      v-html="review.content"
                    />
                  </div>
                </div>
              </TabPanel>

              <TabPanel class="text-sm text-gray-500">
                <h3 class="sr-only">Frequently Asked Questions</h3>

                <dl>
                  <template v-for="faq in faqs" :key="faq.question">
                    <dt class="mt-10 font-medium text-gray-900">
                      {{ faq.question }}
                    </dt>
                    <dd class="prose prose-sm mt-2 max-w-none text-gray-500">
                      <p>{{ faq.answer }}</p>
                    </dd>
                  </template>
                </dl>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </section>
  </main>
</template>
