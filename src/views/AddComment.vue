<script>
import HeaderComponent from "@/components/Header.vue";
import decodeToken from "@/tokenDecoder";
import axios from "axios";

export default {
  name: "AddCommentView",
  components: {HeaderComponent},

  data(){
    return {
      content: ""
    }
  },

  methods: {
    addComment() {
      const workId = this.$route.params.workId;
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      };
      const decodeData = decodeToken(localStorage.getItem("token"))

      const formData = new FormData();
      formData.append('userId', decodeData.userId)
      formData.append('workId', workId)
      formData.append('content', this.content)

      console.log(formData)
      axios.post(`http://localhost:8081/comment`, formData, config)
          .then(response => {
            console.log(response)
          }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<template>
  <div>
    <header-component title="Dodaj komentarz" icon=" pi pi-comment" style="align-items: center"></header-component>
    <div style="width:300px" class="mx-auto my-auto mt-3">
      <span class="p-float-label">
      <Textarea v-model="content" rows="5" cols="35" style="width:300px"/>
      <label>Treść</label>
    </span>
    </div>

    <div class="mx-auto my-auto mt-3">
      <Button label="Dodaj komentarz" @click="addComment" raised style="border-radius: 10px"/>
    </div>

  </div>
</template>

<style scoped>

</style>