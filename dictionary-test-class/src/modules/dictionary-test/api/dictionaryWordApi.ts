import axios from 'axios'

/**
 * A class to interact with the dictionary API to retrieve word definitions.
 */
export class dictionaryWordApi {
  async get(randomWord: string) {
    console.log(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`)
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`,
    )
    return response
  }
}
