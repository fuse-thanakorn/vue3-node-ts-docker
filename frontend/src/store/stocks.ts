// stores/users.js

import { defineStore } from 'pinia'
// Import axios to make HTTP requests
import axios from '~/modules/axios'

export const useStocksStore = defineStore('users', {
  state: () => ({
    stocks: [],
  }),
  getters: {
    getUsers(state) {
      return state.stocks
    },
  },
  actions: {
    async fetchStocks() {
      try {
        const data = await axios.get('/stock/all')
        this.stocks = data.data
      }
      catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },
    test() {
      console.log('x')
    },
  },
})
