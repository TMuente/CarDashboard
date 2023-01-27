<template>
  <div class="car-select">
    <button ref="button" class="btn-light btn-icon">
      Fahrzeug wählen
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
      </svg>
    </button>
    <form ref="form" class="car-select-form">
      <label v-for="car in cars" class="" :for="'car-select-form-checkbox-' + car.id" :key="car.id">
        <div class="car-select-dropdown-item-content">
          <h3 class="car-select-dropdown-item-name">{{ car.name }}</h3>
          <p class="car-select-dropdown-item-license">{{ car.licenseplate }}</p>
        </div>
        <input type="checkbox" class="car-select-form-checkbox" :id="'car-select-form-checkbox-' + car.id" :value="car.id" />
      </label>
    </form>
  </div>
</template>

<script>
import { useCarStore } from '@/stores/carStore'
import { storeToRefs } from 'pinia'
import { getAssetURL } from '@/utils/get-asset-url'
import { ref, onMounted } from 'vue'

export default {
  name: 'CarSelect',

  setup() {
    const carStore = useCarStore()
    const { cars } = storeToRefs(carStore)
    const form = ref('')
    const button = ref('')

    function showForm() {
      const isOpen = form.value.classList.contains('show')

      if (!isOpen) {
        form.value.classList.add('show')
      } else {
        form.value.classList.remove('show')
      }
    }

    // Helper function to remove selected values
    function disableCheckboxes() {
      const checkboxes = form.value.querySelectorAll('.car-select-form-checkbox')
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false
      })
    }

    // Helper function to set Checkbox
    function setCheckbox(form, car) {
      form.querySelectorAll('input').forEach((checkbox) => {
        if (checkbox.value == car) {
          checkbox.checked = true
        }
      })
    }

    // Set car
    function setCar(event) {
      disableCheckboxes()
      carStore.setSelectedCar(event)
      setCheckbox(form.value, parseInt(event.target.value))
    }

    // SetDefaultValues
    function SetDefaultValues() {
      const sessionCarId = window.sessionStorage.getItem('selected-car')
      const id = sessionCarId ? sessionCarId : cars.value[0].id
      setCheckbox(form.value, id)
    }

    onMounted(() => {
      SetDefaultValues()
      form.value.addEventListener('change', setCar, false)
      button.value.addEventListener('click', showForm, false)
    })

    return { cars, form, button, carStore, disableCheckboxes, getAssetURL }
  }
}
</script>

<style scoped lang="scss">
.car-select-form {
  display: none;
  opacity: 0;
  position: absolute;
  background-color: $light;
  padding: 1rem;
  &.show {
    display: block;
    opacity: 1;
  }
}
.car-select-dropdown-item {
  display: block;
  cursor: pointer;

  &:nth-child(even) {
    background-color: unset;
  }
}
</style>
