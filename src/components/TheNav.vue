<template>
  <nav class="main-navigation container">
    <TheLogo size="medium" />
    <LogoutForm />
  </nav>
</template>

<script>
import TheLogo from '@/components/TheLogo.vue'
import LogoutForm from '@/components/LogoutForm.vue'

export default {
  name: 'TheNav',

  components: {
    TheLogo,
    LogoutForm
  }
}
</script>

<style scoped lang="scss">
.main-navigation.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $light;
  height: 80px;
  border-radius: 0 0 $border-radius $border-radius;
  margin-right: calc(1rem + 2vw);
  margin-left: calc(1rem + 2vw);
  width: calc(100% - calc(2rem + 4vw));
}

@media (min-width: $max-width) {
  .main-navigation.container {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
