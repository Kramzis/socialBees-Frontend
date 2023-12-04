<script>
import HeaderComponent from "@/components/Header.vue";
import axios from "axios";
import decodeToken from "@/tokenDecoder";

export default {
  name: "EditWorkView",
  components: {HeaderComponent},

  data(){
    return {
      title: "",
      content: "",
      selectedTags: [],
      files: [],
      tags: []
    }
  },

  methods: {
    getTags(){
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      };
      axios.get(`http://localhost:8081/tags`, config)
          .then(response => {
            this.tags = response.data
            console.log(this.tags)
          }).catch(error => {
        console.log(error)

      })
    },

    getWork(){
      const workId = this.$route.params.workId;
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      };
      axios.get(`http://localhost:8081/work/${workId}`, config)
          .then(response => {
            this.title = response.data.title
            this.content = response.data.content
            this.selectedTags = response.data.tags
            this.files = response.data.filesDB
          }).catch(error => {
        console.log(error)

      })
    },

    editWork(){
      const workId = this.$route.params.workId;
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      };
      const decodeData = decodeToken(localStorage.getItem("token"))

      const formData = new FormData();
      formData.append('userId', decodeData.userId)
      formData.append('title', this.title)
      formData.append('content', this.content)
      formData.append('tags', this.selectedTags)

      for (let i = 0; i < this.files.length; i++) {
        formData.append('files', this.files[i]);
      }

      axios.put(`http://localhost:8081/work/${workId}`, formData, config)
          .then(response => {
            console.log(response)
          }).catch(error => {
        console.log(error)

      })
    },
    myUploader(event) {
      this.files = event.files
      event.files = null
    }
  },

  beforeMount() {
    this.getTags()
    this.getWork()
  }
}
</script>

<template>
  <div>
    <header-component title="Edytor pracy" icon=" pi pi-pencil" style="align-items: center"></header-component>

    <div style="width:300px" class="mx-auto my-auto">
    <span class="p-float-label mt-4 mb-4">
      <InputText id="title" class="w-100" v-model="title"/>
      <label for="title">Tytuł</label>
    </span>
      <span class="p-float-label">
      <Textarea v-model="content" rows="5" cols="35" style="width:300px"/>
      <label>Treść</label>
    </span>
      <MultiSelect v-model="selectedTags" :options="tags" optionLabel="name" placeholder="Wybierz tagi"
                   :maxSelectedLabels="3" class="w-full md:w-19rem mt-2" style="width:200px"/>
    </div>
    <div style="width:300px" class="mx-auto my-auto mt-3">
      <FileUpload name="files" :customUpload="true" @uploader="myUploader" :multiple="true" accept="image/*,audio/*,video/*" :maxFileSize="1000000">
        <template #empty>
          <p>Przeciągnij i upuść pliki tutaj, by dodać.</p>
        </template>
      </FileUpload>
    </div>

    <div class="mx-auto my-auto mt-3">
      <Button label="Edytuj pracę" @click="editWork" raised style="border-radius: 10px"/>
    </div>

  </div>
</template>

<style scoped>

</style>