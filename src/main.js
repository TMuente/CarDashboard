import { createApp } from "vue";
import { createPinia } from 'pinia'
import './registerServiceWorker'

import router from "./router";

import App from "./App.vue";

const app = createApp(App)
const pinia = createPinia()

app.use(router).use(pinia)
app.mount("#app");
