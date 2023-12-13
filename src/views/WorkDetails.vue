<script>
import HeaderComponent from "@/components/Header.vue";
import axios from "axios";
import {createToast} from "mosha-vue-toastify";
export default {
  name: "WorkDetailsView",
  components: {HeaderComponent},

  data() {
    return {
      work: null,
    }
  },

  methods: {
    getWork(){
      const workId = this.$route.params.workId;
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      };
      axios.get(`http://localhost:8081/work/${workId}`, config)
          .then(response => {
            this.work = response.data
            console.log(response)
          }).catch(error => {
        console.log(error)
      })
    },

    deleteComment(commentId){
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      };
      axios.delete(`http://localhost:8081/comment/${commentId}`, config)
          .then(response => {
            createToast({
                  title: 'Komentarz usunięty!',
                },
                {
                  timeout: 2000,
                  position: 'top-center',
                  type: 'success',
                })
            this.work.comments = this.work.comments.filter(comment => comment.id !== commentId)
            console.log(response)
          }).catch(error => {
        console.log(error)
      })
    },

    goToEdit(commentId){
      const workId = this.$route.params.workId;
      this.$router.push(`/editComment/${workId}/${commentId}`);
    },

    onUserClick(userId){
      this.$router.push(`/profile/${userId}`);
    },

    onAddComment(workId){
      this.$router.push(`/addComment/${workId}`);
    }
  },

  beforeMount(){
    this.getWork();
  }
}
</script>

<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Abril+Fatface|Poppins">
  <div v-if="work">
    <header-component :title="this.work.title" icon="pi pi-bookmark"></header-component>
    <div class="flex justify-content-center mt-2 mb-2">
      <i class=" pi pi-clock mx-2" style="font-size:16px"></i> {{ work.date }}
      <div class="flex" style="padding: 0; margin-left: 5px">
        <i class="pi pi-user mx-1" style="font-size:16px"/>
        <div class="username" @click="onUserClick(work.user.id)">{{ work.user.username }}</div>
      </div>
    </div>

    <div class="flex justify-content-center mb-2" v-if="work.tags.length !== 0">
      <i class="pi pi-tag" style="font-size:16px"/>
      <div v-for="tag in work.tags.toSorted((a, b) => a.name > b.name? 1 : -1)" :key="tag.name">
        <Tag class="mx-1" :value="tag.name"/>
      </div>
    </div>
    <div v-else></div>

    <div class="flex ml-3" style="text-align: left">
      <div class="body">{{ work.content }}</div>
    </div>

    <div class="justify-content-center ml-3" style="justify-content: left">
      <img v-if="work.fileDB !== null && work.fileDB.type.includes('image')"
           src="../assets/image-template.jpeg" alt="..."
           style="max-width: 190px; max-height: 190px; border-radius:25px"/>
      <img v-if="work.fileDB !== null && work.fileDB.type.includes('video')"
           src="../assets/video-template.jpeg" alt="..."
           style="max-width: 190px; max-height: 190px; border-radius:25px"/>
      <img v-if="work.fileDB !== null && work.fileDB.type.includes('audio')"
           src="../assets/audio-template.jpeg" alt="..."
           style="max-width: 190px; max-height: 190px; border-radius:25px"/>
      <img v-if="work.fileDB === null" src="../assets/nofile-template.jpeg" alt="..."
           style="max-width: 190px; max-height: 190px; border-radius:25px"/>
    </div>

    <Divider align="center" type="dotted">
      <b>Komentarze</b>
    </Divider>

    <Button class="mb-2" label="Skomentuj" @click="onAddComment(this.work.id)" raised style="font-size: 14px; border-radius: 10px"/>

    <div v-for="comment in work.comments" :key="comment.id" class="mt-2">
      <div class="flex justify-content-center">
        <i class=" pi pi-clock mx-2" style="font-size:16px"></i> {{comment.date}}
        <div class="flex" style="padding: 0; margin-left: 5px">
          <i class="pi pi-user mx-1" style="font-size:16px"/>
          <div class="username" @click="onUserClick(comment.user.id)">{{ comment.user.username }}</div>
        </div>
      </div>
      <div class="body"> {{comment.content}} </div>

      <div class="flex mx-auto my-auto">
        <div class="mx-2"><Button icon="pi pi-pencil" @click="goToEdit(comment.id)" raised style="font-size: 12px; border-radius: 10px"/> </div>
        <div><Button icon="pi pi-trash" @click="deleteComment(comment.id)" raised style="font-size: 12px; border-radius: 10px"/> </div>
      </div>

      <div v-if="comment.id !== work.comments[work.comments.length-1].id">
        <Divider></Divider>
      </div>

    </div>
  </div>
  <div v-else></div>
</template>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.body {
  font-family: Poppins, sans-serif;
  font-size: 16px;
}

h4 {
  font-family: 'Abril Fatface', serif;
  font-size: 24px;
}

.username {
  font-family: Poppins, sans-serif;
}
</style>