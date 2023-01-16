<template>
  <div class="car-select dropdown d-grid">
    <a class="btn btn-default dropdown-toggle d-flex justify-content-between align-items-center text-start p-3 mb-4" href="#car-select-collapse" role="button" data-bs-toggle="collapse" aria-expanded="false">
      <div class="d-inline-block text-start">
        <h3 class="mb-0">Aktuelles Fahrzeug</h3>
        <span class="opacity-50">Fahrzeug auswählen</span>
      </div>
    </a>

    <div class="car-select-collapse collapse w-100 rounded-3" id="car-select-collapse">
      <CarSelectForm />
    </div>
  </div>
</template>

<script>
import { useCarStore } from '@/stores/carStore'
import { storeToRefs } from 'pinia'

import CarSelectForm from '@/components/dashboard/CarSelectForm.vue'

export default {
  name: 'CarSelect',

  components: {
    CarSelectForm
  },  

  setup() {
    const carStore = useCarStore()
    const { cars } = storeToRefs(carStore)

    return { cars }
  }
}
</script>

<style scoped lang="scss">

</style>
