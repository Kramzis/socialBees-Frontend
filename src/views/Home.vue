<script>
import HeaderComponent from "@/components/Header.vue";
import axios from 'axios';
import decodeToken from "@/tokenDecoder";

export default {
  name: "HomeView",
  components: {HeaderComponent},
  data() {
    return {
      worksByFollowed: [],
      worksByNotFollowed: []
    }
  },

  methods: {
    getRecentWorks() {
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      };

      const decodeData = decodeToken(localStorage.getItem("token"))
      let userId = decodeData.userId

      axios.get(`http://localhost:8081/work/recent`, config)
          .then(recentWorksResponse => {
            axios.get(`http://localhost:8081/follow/following/${userId}`, config)
                .then(followedUsersResponse => {
                  const follwedUsersIds = followedUsersResponse.data.map(user => user.id)
                  this.worksByFollowed = recentWorksResponse.data.filter(work => follwedUsersIds.includes(work.user.id))
                  this.worksByNotFollowed = recentWorksResponse.data.filter(work => !follwedUsersIds.includes(work.user.id))
                }).catch(error => {
              console.log(error)
            })
          }).catch(error => {
        console.log(error)
      })
    },

    onUserClick(userId){
      this.$router.push(`/profile/${userId}`);
    },

    onTitleClick(workId){
      this.$router.push(`/work/${workId}`);
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

    goToAddComment(workId) {
      this.$router.push(`/addComment/${workId}`);
    }
  },
  beforeMount() {
    this.getRecentWorks()
  }
}
</script>

<template>
  <div>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Abril+Fatface|Poppins">
    <div>
      <header-component title="Strona główna" icon="pi pi-home"></header-component>
    </div>
    <div class="align-left">
      <h3>Sprawdź</h3>
    </div>
    <div class="mt-5 mx-auto" style="margin-bottom: 100px; max-width: 400px">
      <div v-if="worksByFollowed.length !== 0">
        <div v-for="work in worksByFollowed" :key="work.id">
          <div>
            <div class="flex">
              <i class=" pi pi-clock mx-2" style="font-size:16px"></i> {{ work.date }}
              <div class="flex" style="padding: 0; margin-left: 5px" @click="onUserClick(work.user.id)">
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
                <div @click="onTitleClick(work.id)"><h4>{{ work.title }}</h4></div>
                <div class="body">{{ work.content }}</div>
              </div>
            </div>

            <div class="flex">
              <i class=" pi pi-comment mx-1" style="font-size:16px" @click="goToAddComment(work.id)"></i>
              {{ work.comments.length }}
            </div>

          </div>

          <div v-if="work.fileDB">
            <Button icon="pi pi-download" @click="downloadFile(work.fileDB)" raised
                    style="font-size: 12px; border-radius: 10px"/>
          </div>
          <div v-if="work.id !== worksByFollowed[worksByFollowed.length-1].id">
            <Divider></Divider>
          </div>
        </div>
      </div>
      <div v-else>Brak prac</div>
      <Divider align="center" type="dotted">
        <b>Poznaj prace innych</b>
      </Divider>
      <div v-if="worksByNotFollowed.length !== 0">
        <div v-for="work in worksByNotFollowed" :key="work.id">
          <div>
            <div class="flex">
              <i class=" pi pi-clock mx-2" style="font-size:16px"></i> {{ work.date }}
              <div class="flex" style="padding: 0; margin-left: 5px" @click="onUserClick(work.user.id)">
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
                <div @click="onTitleClick(work.id)"><h4>{{ work.title }}</h4></div>
                <div class="body">{{ work.content }}</div>
              </div>
            </div>

            <div class="flex">
              <i class=" pi pi-comment mx-1" style="font-size:16px" @click="goToAddComment(work.id)"></i>
              {{ work.comments.length }}
            </div>

          </div>

          <div v-if="work.fileDB">
            <Button icon="pi pi-download" @click="downloadFile(work.fileDB)" raised
                    style="font-size: 12px; border-radius: 10px"/>
          </div>
          <div v-if="work.id !== worksByNotFollowed[worksByNotFollowed.length-1].id">
            <Divider></Divider>
          </div>
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