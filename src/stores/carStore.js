import { defineStore } from 'pinia'
import { directus } from '@/services/directus'
import { formatRelativeTime } from '@/utils/format-relative-time'

export const useCarStore = defineStore('car', {
  state: () => ({
    user: [],
    cars: [],
    repair: [],
    selectedCar: '',
    complete: false
  }),

  getters: {
    getUser() {
      return this.user
    },
    getUserName() {
      return this.user.first_name + ' ' + this.user.last_name
    },
    getSelectedCar() {
      return this.selectedCar
    },
    getCars() {
      return this.cars
    },
    getRepair() {
      return this.repair
    },
    getTotal() {
      return this.repair.reduce((partialSum, repair) => partialSum + repair.price, 0);
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
          this.selectedCar = response.data.find((car) => car.id === parseInt(selectedCarCookie))
        } else {
          this.selectedCar = response.data.find((car) => car.id === parseInt(response.data[0].id))
        }
      } catch (err) {
        console.log(err)
      }
    },

    async fetchRepair() {
      try {
        const repair = directus.items('repair')
        if (this.selectedCar.id) {
          const response = await repair.readByQuery({
            fields: ['*'],
            filter: {
              _and: [{ user_created: { _eq: '$CURRENT_USER' } }, { car: { _eq: this.selectedCar.id } }]
            },
            limit: -1
          })
          this.repair = response.data
        }
        this.complete = true
      } catch (err) {
        console.log(err)
        this.repair = []
      } finally {
      }
    },

    setSelectedCar(event) {
      // Repair items are getting fetched with a watcher in DashboardHomeViews
      this.selectedCar = this.cars.find((car) => car.id === parseInt(event.target.value))
      window.sessionStorage.setItem('selected-car', parseInt(event.target.value))
    }
  }
})
