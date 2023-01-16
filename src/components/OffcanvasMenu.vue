<template>
  <div class="offcanvas offcanvas-start px-6 py-4" tabindex="-1" id="offcanvasMenu" aria-labelledby="offcanvasMenuLabel">
    <div class="offcanvas-header px-0">
      <h5 class="offcanvas-title" id="offcanvasMenuLabel"><TheLogo size="medium" /></h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body px-0 d-flex flex-column">
      <div class="greetings h3 mb-0">Hallo {{ name }}</div>
      <div class="logout d-grid gap-2 border-top pt-5 mt-5">
        <LogoutForm data-bs-dismiss="offcanvas"/>
      </div>
    </div>
    <div class="offcanvas-footer px-0 border-top">
      <div class="mt-4"><ThemeSwitcher /></div>
    </div>
  </div>
</template>

<script>
import { useCarStore } from '@/stores/carStore'
import { computed } from 'vue'

import TheLogo from '@/components/TheLogo.vue'
import LogoutForm from './LogoutForm.vue'
import ThemeSwitcher from './ThemeSwitcher.vue'

export default {
  name: 'OffcanvasMenu',

  components: {
    TheLogo,
    LogoutForm,
    ThemeSwitcher
  },

  setup() {
    const carStore = useCarStore()

    const name = computed(() => {
      return carStore.getUserName
    })

    return { name }
  }
}
</script>

<style scoped lang="scss"></style>
