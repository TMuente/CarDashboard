import { defineStore } from 'pinia'
import { directus } from '@/services/directus'
import { formatRelativeTime } from '@/utils/format-relative-time'

export const useCarStore = defineStore('car', {
  state: () => ({
    user: [],
    cars: [],
    repair: [],
    selectedCarId: null,
    complete: false
  }),

  getters: {
    getUser() {
      return this.user
    },
    getUserName() {
      return this.user.first_name + ' ' + this.user.last_name
    },
    getCars() {
      return this.cars
    },
    getSelectedCarId() {
      return this.selectedCarId
    }
  },

  actions: {
    async fetchUser() {
      try {
        this.user = await directus.users.me.read()
      } catch (err) {
        console.log(err)
      }
    },

    async fetchCars() {
      try {
        const cars = directus.items('car')
        const selectedCarCookie = window.sessionStorage.getItem('selected-car')

        const response = await cars.readByQuery({
          fields: ['*'],
          filter: {
            user_created: {
              _eq: '$CURRENT_USER'
            }
          },
          limit: -1
        })

        this.cars = response.data

        if (selectedCarCookie) {
          this.selectedCarId = parseInt(selectedCarCookie)
        } else {
          this.selectedCarId = parseInt(response.data[0].id)
        }
      } catch (err) {
        console.log(err)
      }
    },

    async fetchRepair() {
      try {
        const repair = directus.items('repair')

        const response = await repair.readByQuery({
          fields: ['*'],
          filter: {
            _and: [
              { user_created: { _eq: '$CURRENT_USER' } },
              { car: { _eq: this.selectedCarId } },
            ]
          },
          limit: -1
        })

        this.repair = response.data

      } catch (err) {
        console.log(err)
      } finally {

      }
    }
  }
})
