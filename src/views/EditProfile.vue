<script>
import HeaderComponent from "@/components/Header.vue";
import axios from "axios";

export default {
  name: "EditProfileView",
  components: {HeaderComponent},

  data(){
    return {
      label: String,
      name: "",
      surname: "",
      username: "",
      email: "",
      birthday: ""
    }
  },

  methods: {
    getUser() {
      const userId = this.$route.params.userId;
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      };
      axios.get(`http://localhost:8081/user/${userId}`, config)
          .then(response => {
            this.name = response.data.name
            this.surname = response.data.surname
            this.username = response.data.username
            this.email = response.data.email
            this.birthday = response.data.birthday
            this.label = response.data.username.charAt(0).toUpperCase()
            console.log(response)
          }).catch(error => {
        console.log(error)
      })
    },

    editUser(){
      const userId = this.$route.params.userId;
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      };

      axios.put(`http://localhost:8081/user/${userId}`,
          {'name': this.name,
        'surname': this.surname,
        'username': this.username,
        'email': this.email,
        'birthday': this.birthday}, config)
          .then(response => {
            console.log(response)
          }).catch(error => {
        console.log(error)

      })
    }
  },

  beforeMount() {
    this.getUser()
  }
}
</script>

<template>
  <div>
    <div>
      <header-component class="mt-3" title="Edytor profilu" icon=" pi pi-user" style="align-items: center"></header-component>
    </div>
    <Avatar :label="label" class="mr-2 my-5" size="xlarge" shape="circle" />
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
      <Calendar class="myinput"  v-model="birthday" inputId="birth_date" />
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
      <Button label="Zapisz zmiany"  @click="editUser" raised style="border-radius: 10px"/>
    </div>
  </div>
</template>

<style scoped>
.myinput {
  width: 100%;
}
</style>