<template>
  <div class="bg-lighter min-height">
    <navbar></navbar>
    <router-view></router-view>
  </div>

</template>

<script>
    import Navbar from './components/Navbar'
    export default {
        name: "Main",
        components:{
          Navbar,
        }
    }
</script>

<style scoped>

</style>
