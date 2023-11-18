<script>
export default{
  name: "HeaderComponent",

  props:{
    title: String,
    icon: String,
  }
}
</script>

<template>
<div class="flex-container">
  <i :class="icon" style="font-size:32px"></i>
  <h1 class="title ms-2 my-auto" style="font-size:32px">{{title}}</h1>
</div>
</template>

<style scoped>
.flex-container{
  display: flex;
  justify-content: center;
}
.title{
  color: #333;
  font-family: 'Arial', sans-serif;
}
</style>