<script>
import HeaderComponent from "@/components/Header.vue";

export default {
  name: "LoginView",
  components: {HeaderComponent},

  data(){
    return {
      email: "",
      password: ""
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
  <span class="p-float-label mt-4 mb-4">
      <InputText id="password" class="w-100" v-model="password"/>
      <label for="password">Hasło</label>
  </span>
  <Button label="Zaloguj się" raised style="border-radius: 10px"/>
</div>
</template>

<style scoped>

</style>