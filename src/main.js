import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Toolbar from 'primevue/toolbar';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Textarea from 'primevue/textarea';
import MultiSelect from 'primevue/multiselect';
import FileUpload from 'primevue/fileupload';
import ToggleButton from 'primevue/togglebutton';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Tag from 'primevue/tag';
import Avatar from 'primevue/avatar';
import Divider from 'primevue/divider';
import Dialog from 'primevue/dialog';
import 'primevue/resources/themes/saga-orange/theme.css'
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App)
    .use(PrimeVue)
    .use(router)
    .component("Divider", Divider)
    .component("InputText", InputText)
    .component("Button", Button)
    .component("ToggleButton", ToggleButton)
    .component("Toolbar", Toolbar)
    .component("Calendar", Calendar)
    .component("Textarea", Textarea)
    .component("MultiSelect", MultiSelect)
    .component("FileUpload", FileUpload)
    .component("Avatar", Avatar)
    .component("Password", Password)
    .component("Tag", Tag)
    .component("Dialog", Dialog)

app.mount('#app');
