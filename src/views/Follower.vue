<script>
import axios from "axios";

export default {
  name: "FollowerComponent",

  data(){
    return{
      label: String,
      userInfo: Object
    }
  },

  props: {
    userId: Number
  },

  methods: {
    getUserInfo() {
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      };
      axios.get(`http://localhost:8081/user/${this.userId}`, config)
          .then(response => {
            this.username = response.data.username
            this.label = response.data.username.charAt(0).toUpperCase()
            console.log(response)
          }).catch(error => {
        console.log(error)
      })
    }
  },

  beforeMount() {
    this.getUserInfo()
  }
}
</script>

<template>
<div class="flex">
  <Avatar :label="label" class="mr-2 my-1" size="large" shape="circle" />
  <div style="font-size: 28px">@{{this.username}}</div>
</div>
</template>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
</style>