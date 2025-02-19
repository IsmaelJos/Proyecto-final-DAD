<script lang="ts">
import { defineComponent } from 'vue'
import TestPage from './views/TestPage.vue'
/**
 * A Vue component that imports and renders the `TestPage` component.
 *
 * @component
 * @name TestComponent
 */
export default defineComponent({
  components: { TestPage },
})
</script>

<template>
  <div>
    <TestPage />
  </div>
</template>

<style scoped></style>
