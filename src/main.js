import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './routing'

createApp(App).use(router).mount('#app')
