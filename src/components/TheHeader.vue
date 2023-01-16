<template>
  <header class="header container-xxl px-6 py-4">
    <div class="row align-items-center justify-content-between">
      <div class="col-auto">
        <TheLogo size="medium" />
      </div>
      <div class="col-auto pe-0">
        <button class="btn" data-bs-toggle="offcanvas" href="#offcanvasMenu" role="button" aria-controls="offcanvasMenu">
          <i class="menu-icon bi bi-list"></i>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import TheLogo from '@/components/TheLogo.vue'

export default {
  name: 'Header',

  components: {
    TheLogo,
  }
}
</script>

<style scoped lang="scss">
.menu-icon {
  font-size: 2rem;
}
</style>
