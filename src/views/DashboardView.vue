<template>
  <TheHeader />
  <router-view />
</template>

<script>
import { onMounted } from 'vue'
import { useCarStore } from '@/stores/carStore'

import TheHeader from '@/components/TheHeader.vue'
import LogoutForm from '@/components/LogoutForm.vue'
import { storeToRefs } from 'pinia'

export default {
  components: {
    LogoutForm,
    TheHeader
  },

  setup() {
    const carStore = useCarStore()
    const { user } = storeToRefs(carStore)

    onMounted(() => {
      carStore.fetchUser()
      carStore.fetchCars()
    })

    return { carStore, user  }
  }
}
</script>

<style lang="scss"></style>
