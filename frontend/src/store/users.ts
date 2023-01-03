// stores/users.js

import { defineStore } from 'pinia'
// Import axios to make HTTP requests
import axios from '~/modules/axios'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
  }),
  getters: {
    getUsers(state) {
      return state.users
    },
  },
  actions: {
    async fetchUsers() {
      try {
        const data = await axios.get('/stock/all')
        this.users = data.data
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
