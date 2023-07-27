import "./style.css"
import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import { router } from "./router/main"

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(router)
app.mount("#app")
