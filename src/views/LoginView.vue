<template>
  <div class="login container-fluid">
    <div class="row">
      <div class="login-form-col col-12 col-lg-6 px-6">
        <TheLogo size="big" class="login-logo" />
        <LoginForm class="login-form-space" />
      </div>
      <div class="login-video-col col-12 col-lg-6 p-0 d-none d-lg-block">
        <video ref="video" v-if="getAssetURL(generalStore.data.login_video)" id="intro-video" class="intro-video" autoplay muted loop playsinline :poster="getAssetURL(generalStore.data.login_image.id)">
          <source v-if="getAssetURL(generalStore.data.login_video)" :src="getAssetURL(generalStore.data.login_video.id)" type="video/webm" />
        </video>
      </div>
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
.login-logo {
  position: absolute;
  top: 5rem;
}

.login-form-col {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
}

.login-video-col {
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
}

.intro-video {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
