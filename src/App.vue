<template>
  <router-view />
  <div class="toolbar fixed-bottom">
    <Toolbar class="bg-gray-900 shadow-2" style="border-radius: 3rem; background-image: linear-gradient(to right, lightcoral, #d5a019)">
      <template #start>
        <img src="./assets/logo.png" alt="..." style="max-width: 50px; max-height: 50px; border-radius:25px"/>
      </template>

      <template #center>
        <div class="flex flex-wrap align-items-center gap-3">
          <button class="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200"><i class="pi pi-home text-2xl"></i></button>
          <button class="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200"><i class="pi pi-user text-2xl"></i></button>
          <button class="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200"><i class="pi pi-search text-2xl"></i></button>
        </div>
      </template>

      <template #end>
        <div class="flex align-items-center gap-2">
          <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
          <span class="font-bold text-bluegray-50">Username</span>
        </div>
      </template>
    </Toolbar>
  </div>
  <div>
    <footer class="footer" :class="{ 'hidden-footer': windowWidth <= 600 }">
      <div class="mx-auto mt-2">Copyright &copy; {{currentYear}}, Social Bees. All Rights Reserved.</div>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'App',

  data(){
    return {
      appName: 'Social Bees',
      currentYear: new Date().getFullYear(),
      windowWidth: window.innerWidth
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeWindow);
    this.resizeWindow();
  },
  // beforeDestroy() {
  //   window.removeEventListener('resize', this.resizeWindow);
  // },
  methods: {
    resizeWindow() {
      this.windowWidth = window.innerWidth;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.toolbar{
  bottom: 50px;
  margin: auto;
  //display: flex;
  justify-content: center;
}
.hidden-footer {
  display: none;
}
.footer{
  bottom: 0;
  position: fixed;
  background-color: rgba(240, 185, 11, 0.98);
  height: 45px;
  width: 100%;
}
@media only screen and (min-width: 600px){
  .toolbar{
    max-width: 60%;
    margin-bottom: 60px !important;
  }
}
@media only screen and (max-width: 600px){
  .toolbar{
    width: 100%;
    bottom: 0;
    scale: 90%
  }
  .footer{
    height: 0;
  }
}
</style>
