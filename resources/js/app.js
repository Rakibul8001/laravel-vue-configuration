import 'primeicons/primeicons.css'
import App from './components/App.vue';
import { createApp } from 'vue';
import router from './router';

const app = createApp(App);
app.use(router);
// app.use(Toast);
app.mount('#app')