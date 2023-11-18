import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Toolbar from 'primevue/toolbar';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import 'primevue/resources/themes/saga-orange/theme.css'
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"


createApp(App)
    .use(PrimeVue)
    .use(router)
    .component("InputText", InputText)
    .component("Button", Button)
    .component("Toolbar", Toolbar)
    .component("Calendar", Calendar)
    .mount('#app');
