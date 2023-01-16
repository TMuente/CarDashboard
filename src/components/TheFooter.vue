<template>
  <footer class="header container-xxl p-6">
    <div class="row align-items-center">
      <div class="col-auto"><TheLogo size="medium" /></div>
    </div>
  </footer>
</template>

<script>
import TheLogo from '@/components/TheLogo.vue'

export default {
  name: 'Footer',

  components: {
    TheLogo
  }
}
</script>

<style scoped lang="scss"></style>
