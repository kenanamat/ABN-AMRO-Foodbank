<script setup lang="ts">
const collections = [
  {
    name: "Women's",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-04-collection-01.jpg",
    imageAlt: "Woman wearing a comfortable cotton t-shirt.",
  },
  {
    name: "Men's",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-04-collection-02.jpg",
    imageAlt: "Man wearing a comfortable and casual cotton t-shirt.",
  },
  {
    name: "Desk Accessories",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-04-collection-03.jpg",
    imageAlt:
      "Person sitting at a wooden desk with paper note organizer, pencil and tablet.",
  },
]
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Background image and overlap -->
    <div
      aria-hidden="true"
      class="absolute inset-0 flex flex-col h-4/6 !min-h-[740px]"
    >
      <div class="relative w-full flex-1">
        <div class="absolute inset-0 overflow-hidden opacity-30">
          <img
            src="../assets/background-image.jpg"
            alt="Background image"
            class="h-full w-full object-cover object-center filter blur"
          />
        </div>
      </div>
    </div>

    <!-- Title and search -->
    <section
      class="max-w-7xl flex items-center justify-center mx-auto px-4 text-center h-[50vh] sm:px-6 sm:pb-0 lg:px-8"
    >
      <div class="relative py-32">
        <h1 class="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
          ABN AMRO Foodbank
        </h1>
        <div class="mt-4 sm:mt-6">
          <input type="text" />
        </div>
      </div>
    </section>

    <!-- Random meal cards -->
    <section class="relative">
      <h2 class="sr-only">Random meals</h2>
      <div
        class="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 sm:px-6 lg:gap-x-8 lg:px-8"
      >
        <div
          v-for="collection in collections"
          :key="collection.name"
          class="group relative h-96 rounded-lg bg-white shadow-xl sm:aspect-h-5 sm:aspect-w-4 sm:h-auto"
        >
          <div>
            <div
              aria-hidden="true"
              class="absolute inset-0 overflow-hidden rounded-lg"
            >
              <div
                class="absolute inset-0 overflow-hidden group-hover:opacity-75"
              >
                <img
                  :src="collection.imageSrc"
                  :alt="collection.imageAlt"
                  class="h-full w-full object-cover object-center"
                />
              </div>
              <div
                class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"
              />
            </div>
            <div class="absolute inset-0 flex items-end rounded-lg p-6">
              <div>
                <p aria-hidden="true" class="text-sm text-white">
                  Shop the collection
                </p>
                <h3 class="mt-1 font-semibold text-white">
                  <a :href="collection.href">
                    <span class="absolute inset-0" />
                    {{ collection.name }}
                  </a>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
