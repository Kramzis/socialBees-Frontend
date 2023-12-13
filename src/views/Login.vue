<script>
import HeaderComponent from "@/components/Header.vue";
import axios from 'axios';
import {createToast} from "mosha-vue-toastify";

export default {
  name: "LoginView",
  components: {HeaderComponent},

  data(){
    return {
      email: "",
      password: ""
    }
  },

  methods: {
    login(){
      axios.post("http://localhost:8081/login", {
        "email": this.email,
        "password": this.password
      }).then(response => {
        createToast({
              title: 'Logowanie przebiegło pomyślnie!',
              description: 'Za chwilę zostaniesz przekierowany do strony głównej.'
            },
            {
              timeout: 2000,
              type: 'success',
              position: 'top-center',
            })
        setTimeout(() => this.$router.push('/home'), 2000);
        localStorage.setItem("token", response.data)
      }).catch(error => {console.log(error)})
    }
  }
}
</script>

<template>
<div>
  <img src="../assets/logo.png" alt="..." style="max-width: 150px; max-height: 150px"/>
  <header-component class="mt-3" title="Panel logowania" icon="pi pi-user"></header-component>
</div>
<div style="width:300px" class="mx-auto my-auto">
  <span class="p-float-label mt-4 mb-4">
      <InputText id="email" class="w-100" v-model="email"/>
      <label for="email">Adres e-mail</label>
  </span>
  <span style="width:300px" class="p-float-label mt-4 mb-4">
    <Password v-model="password" :feedback="false" toggleMask inputStyle="width:300px"/>
    <label for="password">Hasło</label>
  </span>
  <Button label="Zaloguj się" @click="login" raised style="border-radius: 10px"/>
</div>
</template>

<style scoped>
.p-password-panel{
  width: 350px;
}
</style>