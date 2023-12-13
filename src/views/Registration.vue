<script>
import HeaderComponent from "@/components/Header.vue";
import {createToast} from "mosha-vue-toastify";
import axios from "axios";

export default {
  name: "RegistrationView",
  components: {HeaderComponent},
  data(){
    return{
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
      birthday: ""
    }
  },

  methods: {
    createUser(){
      const config = {
      };

      const date = new Date(this.birthday);

      axios.post(`http://localhost:8081/user/register`, {
        "username": this.username,
        "password": this.password,
        "email": this.email,
        "name": this.name,
        "surname": this.surname,
        "birthday": date.toLocaleDateString(undefined, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      }, config)
          .then(response => {
            createToast({
                  title: 'Rejestracja przebiegła pomyślnie!',
                  description: 'Za chwilę zostaniesz przekierowany do strony logowania.'
                },
                {
                  timeout: 2000,
                  type: 'success',
                  position: 'top-center',
                })
            setTimeout(() => this.$router.push('/login'), 2000)
            console.log(response)
          }).catch(error => {
        createToast({
              title: 'Niepoprawne dane!',
              description: error.response.data.join("</br>")
            },
            {
              timeout: 2000,
              type: 'danger',
              position: 'top-center',
            })
        console.log(error)
      })
    }
  }
}
</script>

<template>
  <div>
    <img src="../assets/logo.png" alt="..." style="max-width: 150px; max-height: 150px"/>
    <header-component class="mt-3" title="Rejestracja" icon="pi pi-user-plus"></header-component>
  </div>
  <div style="width:300px" class="mx-auto my-auto">
  <div class="d-flex">
    <span class="p-float-label mt-4 mb-4">
      <InputText id="name" class="w-100" v-model="name"/>
      <label for="name">Imię</label>
  </span>
    <span class="p-float-label mt-4 mb-4 ms-3">
      <InputText id="surname" class="w-100" v-model="surname"/>
      <label for="surname">Nazwisko</label>
  </span>
  </div>
  <span class="p-float-label mb-4">
    <Calendar :class="$style.myinput"  v-model="birthday" inputId="birth_date" />
    <label for="birth_date">Data urodzenia</label>
</span>
  <span class="p-float-label mb-4">
      <InputText id="username" class="w-100" v-model="username"/>
      <label for="username">Username</label>
  </span>
  <span class="p-float-label mt-4 mb-4">
      <InputText id="email" class="w-100" v-model="email"/>
      <label for="username">Adres e-mail</label>
  </span>
  <span class="p-float-label mt-4 mb-4">
      <InputText id="password" class="w-100" v-model="password"/>
      <label for="password">Hasło</label>
  </span>
  <Button label="Zarejestruj się"  @click="createUser" raised style="border-radius: 10px"/>
  </div>
</template>

<style module>
.myinput {
  width: 100%;
}
</style>