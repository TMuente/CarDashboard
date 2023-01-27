<template>
  <div class="dashboard container">

    <section class="selected-section">
      <SelectedCar v-if="carStore.cars.length > 0" />
    </section>

    <Transition name="rollup">
      <div class="dashboard-content" v-if="carStore.repair.length > 0">
        <section class="repair-section"><RepairTable /></section>
        <section class="kmgraph-section">
          <KilometerChart />
        </section>
      </div>

      <section v-else class="no-repairs">Sie haben noch keine Reparaturen für dieses Fahrzeug eingetragen</section>
    </Transition>

  </div>
</template>

<script>
import { onMounted, watch } from 'vue'
import { useCarStore } from '@/stores/carStore'
import { storeToRefs } from 'pinia'

import SelectedCar from '@/components/dashboard/SelectedCar.vue'
import RepairTable from '@/components/dashboard/RepairTable.vue'
import KilometerChart from '@/components/dashboard/KilometerChart.vue'

export default {
  name: 'DashboardHome',

  components: {
    SelectedCar,
    RepairTable,
    KilometerChart
  },

  setup() {
    const carStore = useCarStore()
    const { selectedCar } = storeToRefs(carStore)

    watch(selectedCar, (newCar, oldCar) => {
      carStore.fetchRepair()
    })

    onMounted(() => {
      carStore.fetchRepair()
    })

    return {
      carStore,
      selectedCar
    }
  }
}
</script>

<style lang="scss">
.dashboard {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.selected-section,
.repair-section {
  margin-bottom: 2rem;
}
.no-repairs {
  padding: 2rem;
}
</style>
