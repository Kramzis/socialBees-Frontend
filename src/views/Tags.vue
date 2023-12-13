<script>
import HeaderComponent from "@/components/Header.vue";
import decodeToken from "@/tokenDecoder";
import axios from "axios";

export default {
  name: "TagsView",
  components: {HeaderComponent},

  data() {
    return {
      followedTags: [],
      otherTags: [],
      worksByFollowedTags: []
    }
  },

  methods: {
    getFollowedTags() {
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      };
      const decodeData = decodeToken(localStorage.getItem("token"))
      let userId = decodeData.userId
      axios.get(`http://localhost:8081/user/${userId}/tags`, config)
          .then(followedTagsResponse => {
            this.followedTags = followedTagsResponse.data

            axios.get(`http://localhost:8081/tags`, config)
                .then(otherTagsResponse => {
                  const followedTagsIds = followedTagsResponse.data.map(tag => tag.id)

                  this.otherTags = otherTagsResponse.data.filter(tag => !followedTagsIds.includes(tag.id))
                  console.log(otherTagsResponse)
                }).catch(error => {
              console.log(error)
            })

            console.log(followedTagsResponse)
          }).catch(error => {
        console.log(error)
      })
    },

    followTag(tagId) {
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      };
      const decodeData = decodeToken(localStorage.getItem("token"))
      let userId = decodeData.userId
      axios.post(`http://localhost:8081/user/${userId}/follow-tag/${tagId}`, {}, config)
          .then(response => {
            const tagToFollow = this.otherTags.filter(tag => tag.id === tagId)[0]
            this.otherTags = this.otherTags.filter(tag => tag.id !== tagId)
            this.followedTags = [...this.followedTags, tagToFollow]
            console.log(response)
          }).catch(error => {
        console.log(error)
      })
    },

    unfollowTag(tagId) {
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      };
      const decodeData = decodeToken(localStorage.getItem("token"))
      let userId = decodeData.userId
      axios.delete(`http://localhost:8081/user/${userId}/unfollow-tag/${tagId}`, config)
          .then(response => {
            const tagToUnfollow = this.followedTags.filter(tag => tag.id === tagId)[0]
            this.followedTags = this.followedTags.filter(tag => tag.id !== tagId)
            this.otherTags = [...this.otherTags, tagToUnfollow]
            console.log(response)
          }).catch(error => {
        console.log(error)
      })
    },

    getWorksByFollowedTags() {
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      };
      const decodeData = decodeToken(localStorage.getItem("token"))
      let userId = decodeData.userId
      axios.get(`http://localhost:8081/work/${userId}/worksByFollowedTags`, config)
          .then(worksByFollowedTagsResponse => {
            this.worksByFollowedTags = worksByFollowedTagsResponse.data
          }).catch(error => {
        console.log(error)
      })
    },

    downloadFile(fileDB) {
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
        responseType: 'blob'
      };

      axios.get(`http://localhost:8081/file/${fileDB.id}`, config)
          .then(response => {
            console.log(response)
            const contentDisposition = response.headers['content-disposition'];
            const match = contentDisposition && contentDisposition.match(/filename="(.+)"$/);
            const fileName = match ? match[1] : 'downloaded-file';

            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
          }).catch(error => {
        console.log(error)

      })
    },

    goToAddComment(workId){
      this.$router.push(`/addComment/${workId}`);
    }
  },

  beforeMount() {
    this.getFollowedTags();
    this.getWorksByFollowedTags();
  }
}
</script>

<template>
  <div>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Abril+Fatface|Poppins">
    <header-component title="Tagi" icon=" pi pi-tag" style="align-items: center"></header-component>

    <div>
      <h3 class="mt-5">Obserwowane tagi</h3>
      <h5>Kliknij, by przestać obserwować</h5>
      <div v-if="followedTags && followedTags.length !== 0">
        <div class="flex">
          <div v-for="followedTag in followedTags.toSorted((a, b) => a.name > b.name? 1 : -1)" :key="followedTag.name">
            <Tag class="mx-1 my-1" :value="followedTag.name" @click="unfollowTag(followedTag.id)"/>
          </div>
        </div>
      </div>
      <div v-else>Brak tagów</div>

      <h3 class="mt-5">Zaobserwuj</h3>
      <h5>Kliknij, by zaobserwować</h5>
      <div v-if="otherTags && otherTags.length !== 0">
        <div class="flex mx-auto my-auto">
          <div v-for="tag in otherTags.toSorted((a, b) => a.name > b.name? 1 : -1)" :key="tag.name">
            <Tag class="mx-1 my-1" :value="tag.name" @click="followTag(tag.id)"/>
          </div>
        </div>
      </div>
      <div v-else>Obserwujesz już wszystko! :)</div>
    </div>

    <h3 class="mt-4">Sprawdź te prace, skoro obserwujesz</h3>
    <div v-if="worksByFollowedTags.length !== 0" class="mt-4 mx-auto" style="margin-bottom: 100px; max-width: 400px">
      <div v-for="work in worksByFollowedTags" :key="work.name">
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
            <img v-if="work.fileDB !== null && work.fileDB.type.includes('image')" src="../assets/image-template.jpeg"
                 alt="..." style="max-width: 80px; max-height: 80px; border-radius:25px"/>
            <img v-if="work.fileDB !== null && work.fileDB.type.includes('video')" src="../assets/video-template.jpeg"
                 alt="..." style="max-width: 80px; max-height: 80px; border-radius:25px"/>
            <img v-if="work.fileDB !== null && work.fileDB.type.includes('audio')" src="../assets/audio-template.jpeg"
                 alt="..." style="max-width: 80px; max-height: 80px; border-radius:25px"/>
            <img v-if="work.fileDB === null" src="../assets/nofile-template.jpeg" alt="..."
                 style="max-width: 80px; max-height: 80px; border-radius:25px"/>
            <div class="ml-3" style="text-align: left">
              <div><h4>{{ work.title }}</h4></div>
              <div class="body">{{ work.content }}</div>
            </div>
          </div>

          <div class="flex">
            <i class=" pi pi-comment mx-1 my-auto" style="font-size:16px" @click="goToAddComment(work.id)"></i>
            <div class="my-auto"> {{ work.comments.length }} </div>
          </div>

        </div>

        <div v-if="work.fileDB">
          <Button icon="pi pi-download" @click="downloadFile(work.fileDB)" raised style="border-radius: 10px"/>
        </div>

        <div v-else></div>
        <Divider></Divider>
      </div>
    </div>
    <div v-else>Nie obserwujesz żadnych tagów</div>


  </div>
</template>

<style scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
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

.username{
  font-family: Poppins, sans-serif;
}
</style>