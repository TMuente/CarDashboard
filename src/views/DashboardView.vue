<template>
  <TheHeader />
  <router-view v-if="carStore.cars.length > 0" style="min-height: 60vh;"/>
  <TheFooter />
  <OffcanvasMenu />
</template>

<script>
import { onMounted } from 'vue'
import { useCarStore } from '@/stores/carStore'

import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import LogoutForm from '@/components/LogoutForm.vue'
import OffcanvasMenu from '@/components/OffcanvasMenu.vue'

export default {
  components: {
    LogoutForm,
    TheHeader,
    TheFooter,
    OffcanvasMenu
  },

  setup() {
    const carStore = useCarStore()

    onMounted(() => {
      carStore.fetchUser()
      carStore.fetchCars()
    })

    return { carStore }
  }
}
</script>
