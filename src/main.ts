import {createApp} from 'vue'
import {createPinia} from "pinia";

import './assets/tailwind.css';
import router from './router'

import App from './App.vue'
import InitAPI from "./server/InitAPI.ts";

const pinia = createPinia()
const app = createApp(App)
const api = new InitAPI()

api.init().then(async (): Promise<void> => {
  app.use(pinia)
  app.use(router)

  await api.store()
  app.mount('#app')
})
