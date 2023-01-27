<template>
  <div class="login-view">
    <div class="login-form-view container">
      <TheLogo size="big" class="login-logo" />
        <LoginForm class="login-form-container" />
    </div>
    <div class="login-video-container">
      <video ref="video" v-if="getAssetURL(generalStore.data.login_video)" id="intro-video" class="intro-video" autoplay muted loop playsinline :poster="getAssetURL(generalStore.data.login_image.id)">
        <source v-if="getAssetURL(generalStore.data.login_video)" :src="getAssetURL(generalStore.data.login_video.id)" type="video/webm" />
      </video>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useGeneralStore } from '@/stores/general'
import { useThemeStore } from '@/stores/theme'
import { getAssetURL } from '@/utils/get-asset-url'

import TheLogo from '@/components/TheLogo.vue'
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'LoginView',

  components: {
    TheLogo,
    LoginForm
  },

  setup() {
    const themeStore = useThemeStore()
    const generalStore = useGeneralStore()

    onMounted(() => {
      generalStore.fetchData()
      themeStore.setTheme()
    })

    return { generalStore, getAssetURL }
  }
}
</script>

<style lang="scss">
.login-view {
  background-color: $light;
}

.login-logo {
  position: absolute;
  top: 5rem;
}

.login-form-view {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
}
.login-form-container {
  padding: 2rem;
}

.login-video-container {
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  display: none;
  width: 50vw;
}

.intro-video {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

@media only screen and (min-width: $medium-width) {
  .login-video-container {
    display: block;
  }
  .login-form-view.container {
    width: 50vw;
    margin: 0 !important;
  }
}
</style>
