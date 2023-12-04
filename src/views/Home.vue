<script>
import HeaderComponent from "@/components/Header.vue";
import axios from 'axios';

export default {
  name: "HomeView",
  components: {HeaderComponent},
  data(){
    return{
      recentWorks: []
    }
  },

  methods: {
    getRecentWorks() {
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      };
      axios.get(`http://localhost:8081/work/recent`, config)
          .then(response => {
            this.recentWorks = response.data
            console.log(response)
          }).catch(error => {
        console.log(error)

      })
    },

    downloadFiles(filesDB) {
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
        responseType: 'blob'
      };

      filesDB.forEach(element => {
        axios.get(`http://localhost:8081/files/${element.id}`, config)
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
      })
    }
  },
  beforeMount() {
    this.getRecentWorks();
  }
}
</script>

<template>
<div>
  <div>
    <header-component title="Strona główna" icon="pi pi-home"></header-component>
  </div>
  <div class="align-left">
    <h3>Sprawdź</h3>
  </div>
  <div class="mt-5 mx-auto" style="margin-bottom: 100px; max-width: 400px">
    <div v-if="recentWorks.length > 0">
      <div v-for="work in recentWorks" :key="work.id">
        <div>
          <div>{{work.title}}</div>
          <div>{{work.content}}</div>

          <div class ="flex">
            <i class=" pi pi-comment mx-1" style="font-size:16px"></i> {{work.comments.length}}
            <i class=" pi pi-clock mx-2" style="font-size:16px"></i> {{work.date}}
          </div>

          <div class="flex mx-2">
            <i class ="pi pi-tag" style="font-size:16px"/>
            <div v-for="tag in work.tags" :key="tag.name">
              <Tag class="mx-1" :value="tag.name"/>
            </div>
          </div>
          <div v-if="work.filesDB.length !== 0">
            <Button icon="pi pi-download" @click="downloadFiles(work.filesDB)" raised style="border-radius: 10px"/>
          </div>
          <div v-else></div>
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
</style>