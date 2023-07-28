<script setup lang="ts">
import { ref } from "vue"
import { Dialog, DialogPanel } from "@headlessui/vue"
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline"
import NavigationLogo from "./NavigationLogo.vue"

const mobileMenuOpen = ref(false)
</script>

<template>
  <header class="bg-white">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
      aria-label="Global"
    >
      <NavigationLogo />
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
      <div class="hidden lg:flex lg:gap-x-12">
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900">
          Log in
        </a>
      </div>
    </nav>
    <Dialog
      as="div"
      class="lg:hidden"
      @close="mobileMenuOpen = false"
      :open="mobileMenuOpen"
    >
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[linear-gradient(135deg,#005e5d_0,#00877d_58%,#00756f_58%,#009185_100%)] sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between p-4 bg-white">
          <NavigationLogo class="sm:hidden" />
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700 ml-auto"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <nav class="mt-6 p-6">
          <div class="-my-6 divide-y divide-gray-500/10">
            <a
              href="#"
              class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-dark-green"
            >
              Log in
            </a>
          </div>
        </nav>
      </DialogPanel>
    </Dialog>
  </header>
</template>
