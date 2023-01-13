// stores/users.js

import { defineStore } from 'pinia'
// Import axios to make HTTP requests
import axios from '~/modules/axios'

export const useStocksStore = defineStore('users', {
  state: () => ({
    stocks: [],
  }),
  getters: {
    getStocks(state) {
      return state.stocks
    },
  },
  actions: {
    async fetchStocks() {
      try {
        const res = await axios.get('/stock/all')
        this.stocks = res.data.stock.data
      }
      catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },

  },
})
