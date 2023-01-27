<template>
  <div class="login-form">
    <h2 class="title">Anmelden</h2>
    <form ref="form" class="login-form-el">
      <div class="">
        <input type="email" class="input" id="email" placeholder="Email" />
      </div>
      <div class="">
        <input type="password" class="" id="password" placeholder="Passwort" />
      </div>
      <button ref="submitButton" type="submit" class="btn-light">Anmleden</button>
    </form>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { directus } from '@/services/directus'
import { useRouter } from 'vue-router'
import { useCarStore } from '@/stores/carStore'

export default {
  name: 'LoginForm',

  setup() {
    const router = useRouter()
    const form = ref('')
    const carStore = useCarStore()

    async function login(event) {
      try {
        event.preventDefault()
        const mail = this[0]
        const pw = this[1]

        const response = await directus.auth.login({
          email: mail.value,
          password: pw.value,
          mode: 'json'
        })

        if (response) {
          carStore.fetchUser()
          router.replace({ name: 'dashboard' })
        }
      } catch (e) {
        // Error handling
        console.log(e)
      }
    }

    onMounted(() => {
      form.value.addEventListener('submit', login)
    })

    return { form, login }
  }
}
</script>

<style lang="scss">
.login-form {
  width: 350px;
  max-width: 350px;
}
</style>
