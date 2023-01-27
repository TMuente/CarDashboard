<template>
  <div class="selected-car">
    <div class="selected-car-img">
      <img v-if="car.image" :src="getAssetURL(car.image)" class="selected-car-img-item"/></div>
    <div class="selected-car-content">
      <div class="selected-car-content-name">
        <h4>{{ car.name }}</h4>
        <p class="selected-car-content-name-license">{{ car.licenseplate }}</p>
      </div>
      <div class="selected-car-content-price">
        <p>Gesamtkosten</p>
        {{ carStore.getTotal }} €
      </div>
      <div class="selected-car-content-repairs">
        <p>Reparaturen</p>
        {{ carStore.repair.length }}
      </div>
      <div class="selected-car-content-select"><CarSelect /></div>
    </div>
  </div>
</template>

<script>
import { useCarStore } from '@/stores/carStore'
import { storeToRefs } from 'pinia'
import { getAssetURL } from '@/utils/get-asset-url'
import CarSelect from './CarSelect.vue'

export default {
  name: 'SelectedCar',

  components: {
    CarSelect
  },

  setup() {
    const carStore = useCarStore()
    const { selectedCar } = storeToRefs(carStore)

    return { carStore, car: selectedCar, getAssetURL }
  }
}
</script>

<style scoped lang="scss">
.selected-car {
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: space-between;

  &-img {
    max-width: 252px;
    flex: 0 0 30%;
    background-color: $accent;
    border-radius: 0 $border-radius 60px;
    position: relative;

    &-item {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
      border-radius: 0 $border-radius 60px;
      padding-right: 8px;
    }
  }

  &-content {
    padding: 1rem;
    flex: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;

    &-name {
      flex: 1 0 100%;

      &-license {
        font-weight: 500;
        margin-top: 0.25rem;
      }
    }

    &-price,
    &-repairs {
      font-weight: 500;
      flex: 0 0 auto;
    }

    &-select {
      flex: 1 0 100%;
    }
  }
}

@media (min-width: $large-width) {
  .selected-car {
    display: flex;
    gap: 1rem;
    width: 100%;
    justify-content: space-between;
    min-height: 110px;

    &-content {
      justify-content: space-between;
      align-items: center;
      margin-right: 1rem;

      &-name {
        flex: 0 0 auto;
      }

      &-price,
      &-repairs {
        flex: 0 0 auto;
      }

      &-select {
        flex: 0 0 auto;
      }
    }
  }
}
</style>
