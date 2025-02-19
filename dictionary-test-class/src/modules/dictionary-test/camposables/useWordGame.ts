import { computed, onMounted, ref } from 'vue'
import { GameStatus } from '../interfaces'
import { dictionaryWordApi } from '../api/dictionaryWordApi'
import confetti from 'canvas-confetti'

/**
 * Custom hook for managing the word game state and logic.
 *
 * This hook manages the game's status, word generation, user input, and feedback.
 * It also fetches word definitions from an external dictionary API and handles
 * the game mechanics like checking guesses and updating the word display.
 *
 * @returns {Object} The game state and methods.
 * @property {Ref<GameStatus>} gameStatus - The current status of the game (Playing, Won, etc.).
 * @property {ComputedRef<boolean>} isLoading - Whether the definitions are still loading.
 * @property {Ref<string>} wordApi - The word to be guessed by the user.
 * @property {Ref<string[]>} definitions - The list of word definitions fetched from the API.
 * @property {Ref<string>} wordDisplay - The display of the word with underscores for unguessed letters.
 * @property {Ref<string>} userGuess - The user's guess for the word.
 * @property {Ref<string | null>} feedback - Feedback for the user after each guess.
 * @property {Ref<string>} feedbackColor - The color of the feedback message (green for correct, red for wrong).
 * @property {Ref<number>} failCount - The count of failed guesses.
 * @property {Function} checkGuess - The function to check if the user's guess is correct.
 */

export const useWordGame = () => {
  /**
   * The current status of the game (e.g., playing, won).
   *
   * @type {Ref<GameStatus>}
   */
  const gameStatus = ref<GameStatus>(GameStatus.Playing)
  /**
   * Determines whether the definitions are still loading based on whether the definitions list is empty.
   *
   * @type {ComputedRef<boolean>}
   */
  const isLoading = computed(() => definitions.value.length === 0)
  /**
   * The list of words used in the game.
   *
   * @type {string[]}
   */
  const words = [
    'abandon',
    'abbreviate',
    'abdomen',
    'ablaze',
    'collab',
    'dirty',
    'disable',
    'disc',
    'graffiti',
    'grain',
    'inexpert',
    'psychic',
    'public',
    'rooster',
    'tax',
    'unrelated',
    'warp',
    'barmen',
    'calm',
    'calories',
    'coagulated',
    'egg',
    'convict',
    'swearword',
    'encyclopedia',
    'unpleasant',
    'marketing',
    'tough',
    'recession',
    'bottom',
    'chaos',
    'humanity',
    'chair',
    'gain',
    'diet',
    'expect',
    'twist',
    'cause',
    'resist',
    'related',
    'admire',
    'emotion',
    'compose',
  ]
  /**
   * A randomly selected word from the list of words.
   *
   * @type {Ref<string>}
   */
  const wordApi = ref<string>(words[Math.floor(Math.random() * words.length)])

  /**
   * The list of definitions fetched for the selected word.
   *
   * @type {Ref<string[]>}
   */
  const definitions = ref<string[]>([])

  /**
   * Fetches the definitions for the selected word from the dictionary API.
   *
   * @async
   * @function
   * @returns {Promise<void>} A promise that resolves when the definitions are fetched.
   */
  const fetchDefinitions = async () => {
    const response = await new dictionaryWordApi().get(wordApi.value)
    const meanings = response.data[0]?.meanings || []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    definitions.value = meanings.flatMap((meaning: any) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      meaning.definitions.map((def: any) => def.definition),
    )
  }

  // GAME

  /**
   * The word displayed in the game, with underscores for unguessed letters.
   *
   * @type {Ref<string>}
   */
  const wordDisplay = ref<string>('')
  /**
   * The user's current guess for the word.
   *
   * @type {Ref<string>}
   */
  const userGuess = ref<string>('')
  /**
   * The feedback message displayed to the user after each guess.
   *
   * @type {Ref<string | null>}
   */
  const feedback = ref<string | null>(null)
  /**
   * The color of the feedback message (e.g., red for wrong, green for correct).
   *
   * @type {Ref<string>}
   */
  const feedbackColor = ref<string>('red')
  /**
   * The count of failed attempts made by the user.
   *
   * @type {Ref<number>}
   */
  const failCount = ref<number>(0)
  /**
   * Updates the word display with underscores representing unguessed letters.
   *
   * @function
   */
  const updateWordDisplay = () => {
    wordDisplay.value = '_ '.repeat(wordApi.value.length)
  }
  /**
   * Checks the user's guess and updates the feedback and game status.
   *
   * @function
   */
  const checkGuess = () => {
    if (userGuess.value.trim().toLowerCase() === wordApi.value.toLowerCase()) {
      feedback.value = 'Congratulations! You guessed the word!'
      feedbackColor.value = 'green'
      gameStatus.value = GameStatus.Won
      confetti({
        particleCount: 200,
        angle: 90,
        spread: 90,
        origin: { x: 0.5, y: 0.7 },
        shapes: ['star', 'square'],
        colors: ['#ff0000', '#00ff00', '#0000ff'],
        gravity: 0.5,
        drift: 0,
        scalar: 0.8,
      })
    } else {
      feedback.value = 'Wrong guess. Try again!'
      feedbackColor.value = 'red'
      failCount.value++
    }

    // Clear the user's guess after checking
    userGuess.value = ''
  }

  /**
   * Lifecycle hook to initialize the game by fetching definitions and updating the word display.
   *
   * @async
   * @function
   */
  onMounted(async () => {
    updateWordDisplay()
    fetchDefinitions()
    console.log(definitions.value)
  })

  return {
    //GAME
    checkGuess,
    userGuess,
    feedback,
    feedbackColor,
    wordDisplay,
    failCount,

    //FUNCTION
    gameStatus,
    isLoading,
    wordApi,
    definitions,
  }
}
