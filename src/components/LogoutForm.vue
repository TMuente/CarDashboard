<template>
    <button ref="submitButton" type="button" class="btn btn-primary btn-wide"><span class="me-3">Abmelden</span> <i class="bi bi-door-open-fill"></i></button>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'LogoutForm',

  setup() {
    const router = useRouter()
    const submitButton = ref('')

    async function logout(event) {
      event.preventDefault()
      const refresh_token = localStorage.getItem('auth_refresh_token')

      const data = {
        refresh_token: refresh_token,
        mode: 'json'
      }

      fetch(import.meta.env.VITE_DIRECTUS_URL + '/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .catch((error) => {
          console.error('Error:', error)
        })
        .finally(() => {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('auth_refresh_token')
          localStorage.removeItem('auth_expires')
          localStorage.removeItem('auth_expires_at')
          router.push({ name: 'login' })
        })
    }

    onMounted(() => {
      submitButton.value.addEventListener('click', logout)
    })

    return { submitButton, logout }
  }
}
</script>

<style lang="scss">

</style>
