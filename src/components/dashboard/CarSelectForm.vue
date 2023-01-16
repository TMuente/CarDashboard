<template>
  <form ref="form" class="car-select-form rounded overflow-hidden mb-4">
    <label v-for="car in cars" class="car-select-dropdown-item d-flex align-items-center justify-content-between p-3" :for="'car-select-form-checkbox-' + car.id" :key="car.id">
      <div class="car-select-dropdown-item-content">
        <h3 class="car-select-dropdown-item-name m-0">{{ car.name }}</h3>
        <p class="car-select-dropdown-item-license m-0">{{ car.licenseplate }}</p>
      </div>
      <input type="checkbox" :id="'car-select-form-checkbox-' + car.id" :value="car.id" />
    </label>
  </form>
</template>

<script>
import { useCarStore } from '@/stores/carStore'
import { storeToRefs } from 'pinia'
import { getAssetURL } from '@/utils/get-asset-url'
import { ref, onMounted, watch } from 'vue'

export default {
  name: 'CarSelectForm',

  setup() {
    const carStore = useCarStore()

    const { cars } = storeToRefs(carStore)
    const { selectedCarId } = storeToRefs(carStore)
    
    const form = ref('')

    function setCar(event) {
      // console.log(event, this)
      const checkboxes = this.querySelectorAll('input[type="checkbox"]')
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false
      })
      carStore.selectedCarId = parseInt(event.target.value)
      window.sessionStorage.setItem('selected-car', parseInt(event.target.value))
      setCheckbox(form.value, selectedCarId.value)
    }

    function setCheckbox(form, car) {
      form.querySelectorAll('input').forEach((checkbox) => {
        if (checkbox.value == car) { 
          checkbox.checked = true
        }
      })
    }
  

    onMounted(() => {
      setCheckbox(form.value, selectedCarId.value)
      form.value.addEventListener('change', setCar, false)      
    })

    return { cars, form, selectedCarId, getAssetURL }
  }
}
</script>

<style scoped lang="scss">
.car-select-dropdown-item {
  display: block;
  cursor: pointer;

  &:nth-child(even) {
    background-color: var(--bs-btn-bg);
  }
}
</style>
