<script setup lang="ts">
import { IMeal } from "../types"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue"
import Button from "../components/Button.vue"

defineProps<{ meal: IMeal }>()
</script>

<template>
  <TabGroup as="div" class="mx-auto mt-12 w-full max-w-2xl lg:col-span-4 lg:-mt-2 lg:max-w-none order-3 p-6">
    <div class="border-b border-black-green">
      <TabList class="flex">
        <Tab as="template" v-slot="{ selected }">
          <Button
            :class="[
              selected ? '!bg-opacity-30' : '!bg-opacity-10',
              '!shadow-none',
            ]"
          >
            Instructions
          </Button>
        </Tab>
        <Tab as="template" v-slot="{ selected }" v-if="meal.strYoutube">
          <Button
            :class="[
              selected ? '!bg-opacity-30' : '!bg-opacity-10',
              '!shadow-none',
            ]"
          >
            Video instructions
          </Button>
        </Tab>
      </TabList>
    </div>
    <TabPanels as="template">
      <TabPanel class="">
        <h3 class="sr-only">Instructions</h3>
        <p
          class="whitespace-pre-wrap text-white bg-primary bg-opacity-10 shadow-lg p-6"
          v-html="meal.strInstructions"
        />
      </TabPanel>

      <TabPanel class="relative" v-if="meal.strYoutube">
        <h3 class="sr-only">Video instructions</h3>
        <!-- Fake loader -->
        <div
          class="animate-pulse z-0 absolute bg-black-green w-full h-96 inset-0"
        />
        <iframe
          class="relative z-10 w-full h-96"
          :src="`https://www.youtube.com/embed/${
            meal.strYoutube.split('=')[1]
          }`"
        />
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>
