import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'; // 引入路由
import './assets/js/skrollr.min.js'; // 引入skrollr

createApp(App).use(router).mount('#app')
