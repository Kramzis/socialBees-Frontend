import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import 'primevue/resources/themes/saga-orange/theme.css'
import InputText from 'primevue/inputtext';
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css'
import "bootstrap"


createApp(App)
    .use(PrimeVue)
    .use(router)
    .component("InputText", InputText)
    .component("Button", Button)
    .mount('#app');
