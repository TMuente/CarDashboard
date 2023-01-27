<template>
  <header class="main-header">
    <TheNav />
    <div class="main-header-text container">
      <h2 v-if="carStore.complete" class="main-header-text-name">Hallo {{ carStore.getUserName }}</h2>
      <p class="accent h4">Willkommen in deinem Bereich</p>
    </div>
  </header>
</template>

<script>
import TheNav from '@/components/TheNav.vue'

import { useCarStore } from '@/stores/carStore'

export default {
  name: 'Header',

  components: {
    TheNav
  },

  setup() {
    const carStore = useCarStore()

    return {
      carStore
    }
  }
}
</script>

<style scoped lang="scss">
.main-header {
  background-color: $dark;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 400px;
  padding-bottom: 1rem;

  &-text {
    color: $light;
  }
  &-text-name {
    margin-bottom: 1rem;
  }
}
</style>
