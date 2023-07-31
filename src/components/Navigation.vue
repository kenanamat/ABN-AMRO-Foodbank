<script setup lang="ts">
import { ref } from "vue"
import { Dialog, DialogPanel } from "@headlessui/vue"
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline"
import NavigationLogo from "./NavigationLogo.vue"

const mobileMenuOpen = ref(false)
</script>

<template>
  <header class="bg-white relative z-10">
    <!-- Desktop menu -->
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-4 pt-6 lg:px-8"
      aria-label="Global"
    >
      <NavigationLogo />
      <!-- Mobile menu button -->
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <!-- Menu items -->
      <div class="hidden lg:flex lg:gap-x-12">
        <router-link
          v-for="item in ['area', 'ingredients', 'categories']"
          :to="'/' + item"
          class="text-sm leading-6 text-primary hover:text-primary-hover font-semibold"
        >
          {{ item.toUpperCase() }}
        </router-link>
      </div>
    </nav>
    <!-- Mobile menu -->
    <Dialog
      as="div"
      class="lg:hidden"
      @close="mobileMenuOpen = false"
      :open="mobileMenuOpen"
    >
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[linear-gradient(135deg,#005e5d_0,#00877d_58%,#00756f_58%,#009185_100%)] sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
        @click="mobileMenuOpen = false"
      >
        <div class="flex items-center justify-between p-4 pt-6 bg-white">
          <NavigationLogo class="sm:hidden" />
          <!-- Close menu -->
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-black-green ml-auto"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <nav class="mt-6 p-6">
          <!-- Menu items -->
          <div class="-my-6">
            <router-link
              v-for="item in ['area', 'ingredients', 'categories']"
              :to="'/' + item"
              class="-mx-3 block rounded-lg px-3 py-2.5 text-base leading-7 text-white"
            >
              {{ item.toUpperCase() }}
            </router-link>
          </div>
        </nav>
      </DialogPanel>
    </Dialog>
  </header>
</template>
