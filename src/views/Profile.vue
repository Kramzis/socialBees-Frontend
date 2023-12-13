<script>
import HeaderComponent from "@/components/Header.vue";
import axios from 'axios';

const decodeToken = require('../tokenDecoder');

export default {
  name: "ProfileView",
  components: {HeaderComponent},

  data() {
    return {
      label: String,
      userInfo: Object,
      userStats: Object,
      userWorks: Array
    }
  },

  methods: {
    getUserInfo() {
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      };
      const decodeData = decodeToken(localStorage.getItem("token"))
      let userId = decodeData.userId
      axios.get(`http://localhost:8081/user/${userId}`, config)
          .then(response => {
            this.userInfo = response.data
            this.label = this.userInfo.username.charAt(0).toUpperCase()
            console.log(this.userInfo)
          }).catch(error => {
        console.log(error)
      })
    },

    getUserStats() {
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      };
      const decodeData = decodeToken(localStorage.getItem("token"))
      let userId = decodeData.userId
      axios.get(`http://localhost:8081/user/${userId}/stats`, config)
          .then(response => {
            this.userStats = response.data
            console.log(this.userStats)
          }).catch(error => {
        console.log(error)
      })
    },

    getUserWorks() {
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      };
      const decodeData = decodeToken(localStorage.getItem("token"))
      let userId = decodeData.userId
      axios.get(`http://localhost:8081/work/${userId}/works`, config)
          .then(response => {
            this.userWorks = response.data
            console.log(this.userWorks)
          }).catch(error => {
        console.log(error)
      })
    },

    goToEdit(workId) {
      this.$router.push(`/editWork/${workId}`)
    },

    deleteWork(workId) {
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      };
      axios.delete(`http://localhost:8081/work/${workId}`, config)
          .then(response => {
            console.log(response)
          }).catch(error => {
        console.log(error)
      })
    },

    goToEditProfile(userId) {
      this.$router.push(`/editProfile/${userId}`)
    },

    goToFollowersList(userId) {
      this.$router.push(`/followers/${userId}`)
    },

    goToFollowingList(userId) {
      this.$router.push(`/following/${userId}`)
    }
  },

  beforeMount() {
    this.getUserInfo()
    this.getUserStats()
    this.getUserWorks()
  }
}
</script>

<template>
  <div>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Abril+Fatface|Poppins">
    <div class="flex">
      <header-component title="Mój profil" icon=" pi pi-user" style="align-items: center"></header-component>
      <div class="mx-2">
        <Button icon="pi pi-user-edit" @click="goToEditProfile(this.userInfo.id)" outlined aria-label="Edit profile"
                style="border-radius: 100%; width: 48px"/>
      </div>
    </div>
    <Avatar :label="label" class="mr-2 my-5" size="xlarge" shape="circle"/>
    <h5>@{{ this.userInfo.username }}</h5>
    <h3>{{ this.userInfo.name }} {{ this.userInfo.surname }}</h3>
    <div class="flex stats font-bold mx-auto mt-3">
      <div class="mx-auto">
        {{ this.userStats.numberOfWorks }}
        <h5>Prace</h5>
      </div>
      <div class="mx-auto">
        {{ this.userStats.numberOfFollowers }}
        <h5 @click="goToFollowersList(this.userInfo.id)">Followers</h5>
      </div>
      <div class="mx-auto">
        {{ this.userStats.numberOfFollowing }}
        <h5 @click="goToFollowingList(this.userInfo.id)">Following</h5>
      </div>
    </div>

    <div class="mt-5 mx-auto" style="margin-bottom: 100px; max-width: 400px">
      <h1>Moje prace</h1>
      <div v-if="userWorks.length > 0">
        <div v-for="work in userWorks" :key="work.id">
          <div>
            <div>
              <div class="flex">
                <i class=" pi pi-clock mx-2" style="font-size:16px"></i> {{ work.date }}
                <div class="flex" style="padding: 0; margin-left: 5px">
                  <i class="pi pi-user mx-1" style="font-size:16px"/>
                  <div class="username">{{ work.user.username }}</div>
                </div>
              </div>
              <div class="flex" v-if="work.tags.length !== 0">
                <i class="pi pi-tag" style="font-size:16px"/>
                <div v-for="tag in work.tags.toSorted((a, b) => a.name > b.name? 1 : -1)" :key="tag.name">
                  <Tag class="mx-1" :value="tag.name"/>
                </div>
              </div>
              <div v-else></div>

              <div class="flex ml-3" style="justify-content: left">
                <img v-if="work.fileDB !== null && work.fileDB.type.includes('image')"
                     src="../assets/image-template.jpeg" alt="..."
                     style="max-width: 80px; max-height: 80px; border-radius:25px"/>
                <img v-if="work.fileDB !== null && work.fileDB.type.includes('video')"
                     src="../assets/video-template.jpeg" alt="..."
                     style="max-width: 80px; max-height: 80px; border-radius:25px"/>
                <img v-if="work.fileDB !== null && work.fileDB.type.includes('audio')"
                     src="../assets/audio-template.jpeg" alt="..."
                     style="max-width: 80px; max-height: 80px; border-radius:25px"/>
                <img v-if="work.fileDB === null" src="../assets/nofile-template.jpeg" alt="..."
                     style="max-width: 80px; max-height: 80px; border-radius:25px"/>
                <div class="ml-3" style="text-align: left">
                  <div><h4>{{ work.title }}</h4></div>
                  <div class="body">{{ work.content }}</div>
                </div>
              </div>

              <div class="flex">
                <i class=" pi pi-comment mx-1" style="font-size:16px" @click="goToAddComment(work.id)"></i>
                {{ work.comments.length }}
              </div>

            </div>
          </div>
          <Divider></Divider>
        </div>
      </div>
      <div v-else>Brak prac</div>
    </div>

  </div>
</template>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.stats {
  font-size: 36px;
  border-radius: 2rem;
  box-shadow: 0 10px 30px 5px grey;
  color: white;
  max-width: 300px;
  background: linear-gradient(to bottom, lightcoral, #d5a019);
}

.body {
  font-family: Poppins, sans-serif;
  font-size: 16px;
}

h4 {
  font-family: 'Abril Fatface', serif;
  font-size: 24px;
}

.username{
  font-family: Poppins, sans-serif;
}

h5 {
  font-size: 18px;
}
</style>