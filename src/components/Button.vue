<template>
  <component
    :is="getTag"
    v-bind="getProps"
    class="bg-primary group flex items-center justify-between gap-4 rounded p-4 font-bold text-white shadow-md transition-all hover:bg-primary-hover hover:text-white"
  >
    <slot></slot>
    <ArrowRightIcon
      v-if="arrow"
      class="h-7 w-7 rounded-full p-1 ring-2 ring-white !ring-opacity-25"
    />
  </component>
</template>

<script lang="ts" setup>
import { computed } from "@vue/reactivity"
import { ArrowRightIcon } from "@heroicons/vue/20/solid"

interface Props {
  arrow?: boolean
  href?: string
  tag?: string
  to?: string | object
}

const props = withDefaults(defineProps<Props>(), {
  arrow: true,
  tag: "button",
})

const getTag = computed(() => {
  if (props.href) return "a"
  if (props.to) return "router-link"

  return props.tag
})

const getProps = computed(() => {
  if (getTag.value === "a") return { href: props.href }
  else if (getTag.value === "router-link") return { to: props.to }
  return {}
})
</script>
