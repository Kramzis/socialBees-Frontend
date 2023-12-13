<script>
import HeaderComponent from "@/components/Header.vue";
//import decodeToken from "@/tokenDecoder";
import axios from "axios";
import {createToast} from "mosha-vue-toastify";

export default {
  name: "EditCommentView",
  components: {HeaderComponent},

  data(){
    return {
      content: "",
      workId: null
    }
  },

  methods: {
    getComment() {
      this.workId = this.$route.params.workId;
      const commentId = this.$route.params.commentId;
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      };

      axios.get(`http://localhost:8081/comment/${commentId}`, config)
          .then(response => {
            this.content = response.data.content
            console.log(response)
          }).catch(error => {
        console.log(error)
      })
    },

    editComment(){
      const commentId = this.$route.params.commentId;
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      };

      axios.put(`http://localhost:8081/comment/${commentId}`, {
            "content": this.content
          },
          config)
          .then(response => {
            createToast({
                  title: 'Zapisano zmiany!',
                  description: 'Za chwilę zostaniesz przekierowany do swojego profilu.'
                },
                {
                  timeout: 2000,
                  type: 'success',
                  position: 'top-center',
                })

            setTimeout(() => this.$router.push(`/work/${this.workId}`), 2000)
            console.log(response)
          }).catch(error => {
        createToast({
              title: 'Niepoprawne dane!',
              description: error.response.data.join("</br>")
            },
            {
              timeout: 2000,
              type: 'danger',
              position: 'top-center',
            })
        console.log(error)

      })
    }
  },
  beforeMount() {
    this.getComment()
  }
}
</script>

<template>
  <div>
    <header-component title="Edytor komentarza" icon=" pi pi-comment" style="align-items: center"></header-component>

    <div style="width:300px" class="mx-auto my-auto mt-3">
      <span class="p-float-label">
      <Textarea v-model="content" rows="5" cols="35" style="width:300px"/>
      <label>Treść</label>
    </span>
    </div>

    <div class="mx-auto my-auto mt-3">
      <Button label="Edytuj komentarz" @click="editComment" raised style="border-radius: 10px"/>
    </div>

  </div>
</template>

<style scoped>

</style>