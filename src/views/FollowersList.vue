<script>
import axios from "axios";
import FollowerComponent from "@/views/Follower.vue";
import HeaderComponent from "@/components/Header.vue";

export default {
  name: "FollowersListView",
  components: {HeaderComponent, FollowerComponent},

  data(){
    return{
      followers: []
    }
  },

  methods: {
      getFollowers() {
        const config = {
          headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        };
        const userId = this.$route.params.userId;
        axios.get(`http://localhost:8081/follow/followers/${userId}`, config)
            .then(response => {
              this.followers = response.data
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
      this.getFollowers()
    }
}
</script>

<template>
  <div>
    <header-component title="Obserwujący" icon=" pi pi-users" style="align-items: center"></header-component>
  </div>
  <div v-if="followers.length !== 0">
    <div v-for="follower in followers" :key="follower.id">
        <follower-component :user-id="follower.id" @click="goToProfile(follower.id)"></follower-component>
        <Divider></Divider>
    </div>
  </div>
  <div v-else>Brak obserwujących</div>
</template>

<style scoped>

</style>