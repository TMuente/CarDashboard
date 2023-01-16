<template>
  <div class="value-summary">
    <h2 class="mb-3">Zusammenfassung</h2>
    <div class="row">
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="card p-3 mb-3">
          <p>
            Anzahl Reparaturen:<br />
            {{ count }}
          </p>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="card p-3 mb-3">
          <p>
            Gesamtausgaben:<br />
            {{ total }} €
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { useMainStore } from '@/stores/carStore'
import { computed } from 'vue'

export default {
  name: 'ValueSummary',

  setup() {
    const mainStore = useMainStore()

    const count = computed(() => {
      return mainStore.data.length
    })

    const total = computed(() => {
      let price = 0
      mainStore.getData.forEach((data) => {
        price += data.price
      })
      return price
    })

    return { mainStore, count, total }
  }
}
</script>

<style lang="scss"></style>
