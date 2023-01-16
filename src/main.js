import { createApp } from "vue";
import { createPinia } from 'pinia'
import './registerServiceWorker'

import router from "./router";
import * as bootstrap from 'bootstrap'
import "bootstrap-icons/font/bootstrap-icons.css"

import App from "./App.vue";

window.bootstrap = bootstrap


const app = createApp(App)
const pinia = createPinia()

app.use(router).use(pinia)
app.mount("#app");
