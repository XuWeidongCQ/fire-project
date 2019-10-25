<template>
  <div>
    <baidu-map
      class="xubox mb-integer map-wrapper"
      :scroll-wheel-zoom="true"
      :zoom="10"
      :center="mapCenter || '重庆'">
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <bm-marker v-for="(project,index) in projects"
                 @mouseover="showInfoWindow(project)"
                 @mouseout="closeInfoWindow"
                 :position="project.loc"
                 :key="index">
      </bm-marker>
      <bm-info-window
        :position="chooseProject.loc || {lng: 106.5584, lat: 29.5745}"
        :show="infoWindowShown"
        title="项目概览"
        @open="infoWindowShown = true"
        @close="infoWindowShown = false">
        <div class="info-window">
          <p><span class="info-window-item"></span>项目名称：{{chooseProject.projectName}}</p>
          <p><span class="info-window-item"></span>项目位置：{{chooseProject.location}}</p>
          <p><span class="info-window-item"></span>产品数量：{{chooseProject.deviceNumber}}</p>
          <p><span class="info-window-item"></span>完工日期：{{chooseProject.projectFinishDate}}</p>
        </div>
      </bm-info-window>
    </baidu-map>


  </div>
</template>

<script>
    import XuModal from "@/pages/share_components/XuModal";
    export default {
      name: "MapPoint",
      props:{
        project:{//接收被点击的实例
          type:Object
        },
        clickCount:{
          type:Number
        },
        projects:{//接收被搜索出来的所有设备
          type:Array
        }
      },
      data:function () {
        return {
          // projectLocations:[ //用来存放项目的名称和经纬度
          //   // {name:'project01',projectId:'',loc:{lng:105.8,lat:29.4}},
          // ],
          map:null,
          mapCenter:null,
          infoWindowShown:false,
          chooseProject:{},
        }
      },
      components:{
        XuModal,
      },
      watch:{
        clickCount:function () {
          this.infoWindowShown = true;
          this.mapCenter = this.project.loc;
          this.chooseProject = this.project;
        }
      },
      methods:{
        showInfoWindow:function (projectInstance) {
          this.infoWindowShown = true;
          this.chooseProject = projectInstance;
        },
        closeInfoWindow:function () {
          this.infoWindowShown = false;
        }
        //只能将这个函数放到地图的ready事件中才能加载地图
        // getLocationMark:function(){
        //   this.projectLocations = this.projects
          // this.$axios.get(this.api.getAllProjects)
          //   .then(res => {
          //     const { code,msg} = res.data;
          //     if(code === 200) {
          //       msg.forEach(project => {
          //         const { projectId,location,longitude,latitude,deviceNumber,projectName } = project;
          //         this.projectLocations.push({projectName,projectId,deviceNumber,loc:{lng:longitude,lat:latitude}})
          //       });
          //     }
          //   })
        // },
      },
    }
</script>

<style scoped>
  .map-wrapper {
    height: 585px;
    border: 2px solid #ffffff;
  }
  .info-window {
    border-radius: 5px;
    font-size: 14px;
    color: #3a4460;
    margin-bottom: 5px;
  }
  .info-window > p {
    line-height: 1.5;
  }
  .info-window-item {
    display: inline-block;
    margin-right: 5px;
    height: 12px;
    width: 12px;
    border-radius: 5px;
    background-color: #019b4c;
  }
</style>
