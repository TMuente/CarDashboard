<template>
  <div class="repair-table p-4">
    <div class="row">
      <div class="col-12"><h2>Liste aller Reparaturen</h2></div>
      <div class="col-12 table table-striped-columns">
        <div class="row p-3 border-bottom fw-bold d-none d-lg-flex">
          <div class="col-2">Datum</div>
          <div class="col">Arbeiten</div>
          <div class="col-2">Kilometerstand</div>
          <div class="col-1">Preis</div>
          <div class="col-1">Rechnung</div>
        </div>
        <div class="row table-row p-3" v-for="(item, count) in repair">
          <div class="col-4 d-lg-none">Datum:</div>
          <div class="col-8 col-lg-2">{{ formatRelativeTime(item.date) }}</div>
          <div class="col-4 d-lg-none">Name:</div>
          <div class="col-8 col-lg">
            {{ item.items }}
          </div>

          <div class="col-4 d-lg-none">Kilometerstand:</div>
          <div class="col-8 col-lg-2">{{ item.km }} km</div>
          <div class="col-4 d-lg-none">Preis:</div>
          <div class="col-8 col-lg-1">{{ (Math.round(item.price * 100) / 100).toFixed(2) }} €</div>
          <div class="col-4 d-lg-none">Rechnung:</div>
          <div class="col-8 col-lg-1">
            <a v-if="item.invoice" class="" :href="getAssetURL(item.invoice.filename_disk)" target="_blank"><i class="bi bi-download"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAssetURL } from '@/utils/get-asset-url'
import { formatRelativeTime } from '@/utils/format-relative-time'
import { useCarStore } from '@/stores/carStore'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

export default {
  name: 'RepairTable',

  setup() {
    const carStore = useCarStore()
    const { repair } = storeToRefs(carStore)

    return { carStore, repair, getAssetURL, formatRelativeTime }
  }
}
</script>

<style scoped lang="scss">
.table-row {
  &:hover {
    cursor: pointer;
  }
}

.col-count {
  flex: 0 0 auto;
  width: 40px;
}
.col-date {
  flex: 0 0 auto;
  width: 100px;
}
.col-download {
  flex: 0 0 auto;
  width: 100px;
  text-align: center;
}
</style>
