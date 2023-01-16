import { defineStore } from 'pinia'
import { directus } from '@/services/directus'

export const useGeneralStore = defineStore('general', {
  state: () => ({
    authenticated: false,
    data: [],
    complete: false
  }),

  getters: {
    getData() {
      return this.data
    }
  },

  actions: {
    async fetchData() {
      try {
        const response = await directus.items('general').readByQuery({
          fields: ['*.*'],
        })
        this.data = response.data
      } catch (err) {
        throw err
      } finally {
        console.log(`Store loaded`)
        this.complete = true
      }
    }
  }
})
