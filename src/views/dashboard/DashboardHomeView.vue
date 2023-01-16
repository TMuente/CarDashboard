<template>
  <div class="dashboard container-xxl px-6">
    <CarSelect />

    <div class="repair-section">
      <Transition name="rollup">
        <RepairTable v-if="carStore.repair.length > 0" />
        <div v-else class="alert alert-info">Sie haben noch keine Reparaturen für dieses Fahrzeug eingetragen</div>
      </Transition>
    </div>
  </div>
</template>

<script>
import { onMounted, watch } from 'vue'
import { useCarStore } from '@/stores/carStore'
import { storeToRefs } from 'pinia'

import CarSelect from '@/components/dashboard/CarSelect.vue'
import RepairTable from '@/components/dashboard/RepairTable.vue'

export default {
  name: 'DashboardHome',

  components: {
    CarSelect,
    RepairTable
  },

  setup() {
    const carStore = useCarStore()
    const { selectedCarId } = storeToRefs(carStore)

    watch(selectedCarId, (newCar, oldCar) => {
      carStore.fetchRepair()
    })

    onMounted(() => {
      carStore.fetchRepair()
    })

    return {
      carStore,
      selectedCarId
    }
  }
}
</script>
