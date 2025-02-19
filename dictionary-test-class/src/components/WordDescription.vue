<template>
  <!-- Section to display the list of word definitions -->
  <section class="mt-[10px] flex flex-col justify-center items-center">
    <h2>Definitions:</h2>
    <!-- Unordered list displaying the word definitions up to the current fail count -->
    <ul class="w-[600px]">
      <!-- Iterates over the definitions array and displays each definition until failCount is reached -->
      <li
        class="mb-[20px]"
        v-for="(definition, index) in definitions.slice(0, failCount + 1)"
        :key="index"
      >
        {{ definition }}
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
/**
 * @typedef {Object} Props
 * @property {string[]} definitions - An array of word definitions.
 * @property {number} failCount - The number of failed guesses, which determines how many definitions to show.
 */
/**
 * The props for the component that are passed from the parent.
 * This component renders the list of word definitions based on the fail count.
 */
interface Props {
  definitions: string[]
  failCount: number
}
// Define the props to be passed into the component
defineProps<Props>()
</script>

<style scoped>
/* No scoped styles defined for this component */
</style>
