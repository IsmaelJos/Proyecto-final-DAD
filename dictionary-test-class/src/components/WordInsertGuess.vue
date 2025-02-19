<template>
  <!-- Main section displaying buttons and feedback for the game -->
  <section class="flex flex-col justify-center items-center">
    <!-- Button to check the user's guess, visible only if the game is in the "Playing" state -->
    <button v-if="gameStatus == GameStatus.Playing" @click="checkGuess">Check Guess</button>
    <!-- Disabled button shown when the game is not in the "Playing" state -->
    <button v-else class="cursor-not-allowed">Check Guess</button>
    <!-- Feedback section shown only if there is feedback, with color dynamically set -->
    <div v-if="feedback" class="feedback" :style="{ color: feedbackColor }">{{ feedback }}</div>
  </section>
</template>

<script setup lang="ts">
import { GameStatus } from '@/modules/dictionary-test/interfaces'

/**
 * @typedef {Object} Props
 * @property {Function} checkGuess
 * @property {string | null} feedback
 * @property {string} feedbackColor
 * @property {GameStatus} gameStatus
 */

/**
 * The props for the component that are passed from the parent.
 * This component renders buttons and feedback based on the game status and user input.
 */
interface Props {
  /**
   * Function to handle the user's guess verification.
   */
  checkGuess: () => void
  /**
   * The feedback message to display to the user.
   */
  feedback: string | null
  /**
   * The color of the feedback message text.
   */
  feedbackColor: string
  /**
   * The current status of the game (Playing, Won, etc.).
   */
  gameStatus: GameStatus
}
// Define the props to be passed into the component
defineProps<Props>()
</script>
<style scoped>
/**
 * Styles for the feedback message.
 * It sets the font size and adds margin at the top.
 */
.feedback {
  font-size: 18px;
  margin-top: 20px;
}
/**
 * Styles for the button elements.
 * It sets the font size and applies bold text.
 */
button {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
