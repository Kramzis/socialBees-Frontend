<script>
import HeaderComponent from "@/components/Header.vue";
import axios from "axios";
import FollowerComponent from "@/views/Follower.vue";

export default {
  name: "FollowersListView",
  components: {FollowerComponent, HeaderComponent},

  data(){
    return {
      followings: []
    }
  },

  methods: {
    getFollowings(){
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      };
      const userId = this.$route.params.userId;
      axios.get(`http://localhost:8081/follow/following/${userId}`, config)
          .then(response => {
            this.followings = response.data
            console.log(response)
          }).catch(error => {
        console.log(error)
      })
    },
    goToProfile(userId){
      this.$router.push(`/profile/${userId}`)
    }
  },

  beforeMount() {
    this.getFollowings()
  }
}
</script>

<template>
  <div>
    <header-component title="Obserwowani" icon=" pi pi-users" style="align-items: center"></header-component>
  </div>
  <div v-if="followings.length !== 0">
    <div v-for="following in followings" :key="following.id">
      <follower-component :user-id="following.id" @click="goToProfile(following.id)"></follower-component>
      <Divider></Divider>
    </div>
  </div>
  <div v-else>Brak obserwowanych</div>
</template>

<style scoped>

</style>