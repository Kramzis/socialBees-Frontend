<script>
import HeaderComponent from "@/components/Header.vue";

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
  <Button label="Zarejestruj się" raised style="border-radius: 10px"/>
  </div>
</template>

<style module>
.myinput {
  width: 100%;
}
</style>