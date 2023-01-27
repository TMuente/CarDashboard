<template>
  <div class="repair-table">
    <h3 class="title">Reparaturliste</h3>
    <div class="repair-table-title">
      <div class="repair-table-title-date">Datum</div>
      <div class="repair-table-title-work">Arbeiten</div>
      <div class="repair-table-title-km">Kilometerstand</div>
      <div class="repair-table-title-location">Ort</div>
      <div class="repair-table-title-price">Preis</div>
      <div class="repair-table-title-invoice">Rechnung</div>
    </div>
    <div v-for="item in repair" class="repair-table-row">
      <div class="repair-table-row-date"><span class="repair-table-row-mobiletitle">Datum:</span> {{ formatRelativeTime(item.date) }}</div>
      <div class="repair-table-row-work"><span class="repair-table-row-mobiletitle">Arbeiten:</span> {{ item.items }}</div>
      <div class="repair-table-row-km"><span class="repair-table-row-mobiletitle">Kilometerstand:</span> {{ item.km }} km</div>
      <div class="repair-table-row-location"><span class="repair-table-row-mobiletitle">Ort:</span> {{ item.location }}</div>
      <div class="repair-table-row-price"><span class="repair-table-row-mobiletitle">Preis:</span> {{ item.price }} €</div>
      <div class="repair-table-row-invoice"><span class="repair-table-row-mobiletitle">Rechnung:</span> {{ item.invoice }}</div>
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
.repair-table {
  padding: 2rem;

  &-title {
    display: none;
  }

  &-row {
    padding: 1rem 0;
    border-top: 1px solid #eee;

    & > div {
      padding: 0.25rem 0;
    }

    &-mobiletitle {
      width: 40%;
      display: inline-block;
    }
  }
}

@media (min-width: $large-width) {
  .repair-table {
    &-title {
      display: flex;
      padding: 1rem 0;
    }
    &-row {
      display: flex;
    }

    .repair-table-title-work, .repair-table-row-work {
      flex: 1;
    }
    .repair-table-title-date, .repair-table-row-date {
      flex: 0 0 100px
    }
    .repair-table-title-km, .repair-table-row-km {
      flex: 0 0 150px
    }
    .repair-table-title-location, .repair-table-row-location {
      flex: 0 0 100px
    }
    .repair-table-title-price, .repair-table-row-price {
      flex: 0 0 100px
    }
    .repair-table-title-invoice, .repair-table-row-invoice {
      flex: 0 0 100px
    }


    .repair-table-row-mobiletitle {
      display: none;
    }
  }
}
</style>
