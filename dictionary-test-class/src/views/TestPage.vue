<script setup lang="ts">
import WordInsertGuess from '@/components/WordInsertGuess.vue'
import { useWordGame } from '../modules/dictionary-test/camposables/useWordGame'
import WordDescription from '@/components/WordDescription.vue'
import { GameStatus } from '@/modules/dictionary-test/interfaces'

/**
 * A custom hook that handles the game logic, including managing the state and functionality for word guessing.
 *
 * @returns {Object} The game state and methods.
 * @property {ComputedRef<boolean>} isLoading - Indicates whether the game is still loading.
 * @property {Ref<string>} wordApi - The word to be guessed.
 * @property {Ref<GameStatus>} gameStatus - The current game status (e.g., Playing, Won).
 * @property {Ref<string[]>} definitions - The list of definitions for the word.
 * @property {Ref<string>} userGuess - The user's current guess.
 * @property {Function} checkGuess - The function to check the user's guess.
 * @property {Ref<string | null>} feedback - Feedback message for the user.
 * @property {Ref<string>} feedbackColor - The color of the feedback message (green for correct, red for wrong).
 * @property {Ref<string>} wordDisplay - The display of the word with underscores for unguessed letters.
 * @property {Ref<number>} failCount - The number of failed attempts.
 */

const {
  isLoading,
  wordApi,
  gameStatus,
  definitions,
  userGuess,
  checkGuess,
  feedback,
  feedbackColor,
  wordDisplay,
  failCount,
} = useWordGame()
</script>

<template>
  <!-- Section displayed while the game is loading -->
  <section v-if="isLoading" class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-3xl">Please Wait</h1>
    <h3 class="animate-pulse">Loading the Test</h3>
  </section>

  <!-- Section displayed after loading is complete -->
  <section v-else class="flex flex-col justify-center items-center">
    <h1 class="mt-[100px]">Which word is this?</h1>

    <!-- Display word as underscores or the full word based on game status -->
    <div class="word-container" v-if="gameStatus == GameStatus.Playing">{{ wordDisplay }}</div>
    <div class="word-container" v-else>{{ wordApi }}</div>

    <!-- Input field for the user's guess -->
    <input
      type="text"
      v-model="userGuess"
      :maxlength="wordApi.length"
      class="guess-input mb-[40px]"
      placeholder="Enter your guess"
    />
    <!-- WordInsertGuess component to display feedback and allow the user to submit their guess -->
    <WordInsertGuess
      :wordApi="wordApi"
      :wordDisplay="wordDisplay"
      :checkGuess="checkGuess"
      :feedback="feedback"
      :feedbackColor="feedbackColor"
      :gameStatus="gameStatus"
    />
    <!-- WordDescription component to display the definitions and failure count -->
    <WordDescription :definitions="definitions" :failCount="failCount" />
  </section>
</template>

<style scoped>
.word-container {
  font-size: 24px;
  font-family: Arial, sans-serif;
  margin-bottom: 20px;
  text-transform: uppercase;
}
.guess-input {
  font-size: 24px;
  padding: 5px;
  width: 200px;
  text-align: center;
}
</style>
