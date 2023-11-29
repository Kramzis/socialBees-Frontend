<script>
import HeaderComponent from "@/components/Header.vue";

export default {
  name: "UserProfile",
  components: {HeaderComponent}
}
</script>

<template>
<div>
  <div class="flex">
    <header-component title="Mój profil" icon=" pi pi-user" style="align-items: center"></header-component>
    <div class="mx-2">
    <Button icon="pi pi-ellipsis-v" outlined aria-label="Edit profile" style="border-radius: 100%; width: 45px" />
    </div>
  </div>
  <Avatar label="P" class="mr-2 my-5" size="xlarge" shape="circle" />
  <h5>@username</h5>
  <h4>Imię i nazwisko</h4>
</div>
</template>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px; /* Dodaj dowolny margines lub padding, jeśli to konieczne */
}
</style>