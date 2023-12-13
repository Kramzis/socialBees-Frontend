<script>
import HeaderComponent from "@/components/Header.vue";
import axios from "axios";
import {createToast} from "mosha-vue-toastify";

export default {
  name: "EditProfileView",
  components: {HeaderComponent},

  data() {
    return {
      label: String,
      name: "",
      surname: "",
      username: "",
      email: "",
      birthday: "",
      isDeleted: Boolean,
      visible: false,
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

    editUser() {
      const userId = this.$route.params.userId;
      const date = new Date(this.birthday);
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      };

      axios.put(`http://localhost:8081/user/${userId}`,
          {
            'name': this.name,
            'surname': this.surname,
            'username': this.username,
            'email': this.email,
            "birthday": date.toLocaleDateString(undefined, {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
          }, config)
          .then(response => {
            createToast({
                  title: 'Zapisano zmiany!',
                  description: 'Za chwilę zostaniesz przekierowany do swojego profilu.'
                },
                {
                  timeout: 2000,
                  type: 'success',
                  position: 'top-center',
                })
            setTimeout(() => this.$router.push('/myProfile'), 2000)
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
    },

    deleteUser() {
      const userId = this.$route.params.userId;
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      };
      axios.delete(`http://localhost:8081/user/${userId}`, config)
          .then(response => {
            this.visible = false
            createToast({
                  title: 'Twoje konto zostało usunięte pomyślnie!',
                  description: 'Zaraz nastąpi przekierowanie na stronę logowania.'
                },
                {
                  timeout: 2000,
                  position: 'top-center',
                  type: 'info',
                })
            setTimeout(() => this.$router.push('/login'), 2000);
            this.isDeleted = true
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


    <Button class="mt-4" label="Usuń konto" icon="pi pi-trash" @click="visible = true" raised style="border-radius: 10px" severity="danger"/>

    <template>
      <div class="card flex justify-content-center">
        <Dialog v-model:visible="visible" modal header="Uwaga!" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
          <p>
            Czy na pewno chcesz usunąć swoje konto oraz wszystkie swoje dane?
          </p>
          <div class="flex justify-content-center">
            <Button label="Tak" icon="pi pi-check" @click="deleteUser" autofocus severity="danger"/>
            <Button class="ml-3" label="Anuluj" icon="pi pi-times" @click="visible = false" autofocus />
          </div>
        </Dialog>
      </div>
    </template>

  </div>
</template>

<style scoped>
.myinput {
  width: 100%;
}
</style>