<template>
  <div>
    <baidu-map
      class="xubox map-wrapper"
      :center="project.province"
      @click="getProjectLngAndLat($event)"
      :scroll-wheel-zoom="true">
      <bm-local-search
        :keyword="project.location"
        :page-capacity="4"
        :panel="true"></bm-local-search>
    </baidu-map>
  </div>
</template>

<script>
  export default {
    name: "AddNewProjectMap",
    props:{
      project:{
        type:Object
      }
    },
    methods:{
      getProjectLngAndLat: function (event) {
        // console.log(event);
        this.project.longitude = event.point.lng.toFixed(4);
        this.project.latitude = event.point.lat.toFixed(4);
      },
    }
  }
</script>

<style scoped>
  .map-wrapper {
    width: 980px;
    height: 637px;
    border: 3px solid #ffffff;
    float: right;
    z-index: 2;
  }
</style>
