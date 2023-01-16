import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: 'light'
  }),

  getters: {
    getTheme() {
      return this.theme
    }
  },

  actions: {
    setTheme() {
      const hasDarkPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
      const html = document.querySelector('html')
      const isDark = window.sessionStorage.getItem('theme') === 'dark'

      if (isDark || hasDarkPreference) {
        html.setAttribute('data-bs-theme', 'dark')
        this.theme = 'dark'
        window.sessionStorage.setItem('theme', 'dark')
      } else {
        html.setAttribute('data-bs-theme', 'light')
        this.theme = 'light'
        window.sessionStorage.setItem('theme', 'light')
      }

    }
  }
})
