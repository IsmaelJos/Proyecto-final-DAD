import axios from 'axios'

/**
 * A class to interact with the dictionary API to retrieve word definitions.
 */

export class dictionaryWordApi {
  /**
   * Fetches the definition of a random word from the dictionary API.
   *
   * @param {string} randomWord The word to be fetched from the dictionary.
   * @returns {Promise} A promise that resolves to the response object from the API call.
   *
   * @example
   * const api = new dictionaryWordApi();
   * api.get('hello').then(response => {
   *   console.log(response.data);
   * });
   */

  async get(randomWord: string) {
    console.log(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`)
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`,
    )
    return response
  }
}
