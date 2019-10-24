<template>
  <div>
    <baidu-map
      class="xubox mb-integer map-wrapper"
      :scroll-wheel-zoom="true"
      :zoom="8"
      @ready="getLocationMark"
      :center="mapCenter">
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <bm-marker v-for="(projectLocation,index) in projectLocations"
                 :position="projectLocation.loc"
                 @click="showSensorDataModal(projectLocation)"
                 :key="index">
      </bm-marker>
    </baidu-map>

    <sensor-data-in-one-project-pop-up
      v-if="isSensorModalShown"
      :project="project"
      @close="isSensorModalShown = false"
      :modal-shown="isSensorModalShown">
    </sensor-data-in-one-project-pop-up>

<!--    <xu-modal-->
<!--      :shown="isDevLineChartModalShown"-->
<!--      @close="isDevLineChartModalShown = false"-->
<!--      >-->
<!--      <div slot="content" class="dev-list-header">-->
<!--        <h1>ddd</h1>-->
<!--        <h1>ddd</h1>-->
<!--        <h1>ddd</h1>-->
<!--        <h1>ddd</h1>-->
<!--        <h1>ddd</h1>-->
<!--        <h1>ddd</h1>-->
<!--        <h1>ddd</h1>-->
<!--      </div>-->
<!--    </xu-modal>-->
  </div>
</template>

<script>
    import XuModal from "@/pages/share_components/XuModal";
    import SensorDataInOneProjectPopUp from "@/popup/HomePage/SensorDataInOneProjectPopUp";
    export default {
        name: "MapPoint",
        // props:{
        //   projectInfos:{
        //     type:Array
        //   }
        // },
        data:function () {
          return {
            projectLocations:[ //用来存放项目的名称和经纬度
              // {name:'project01',projectId:'',loc:{lng:105.8,lat:29.4}},
            ],
            project:null,//被选中的项目实例
            map:null,
            mapCenter:'重庆',
            refreshMap:0,
            isSensorModalShown:false,
            isDevLineChartModalShown:false,
            // devListModalInfos:[
            //   {devID:'12345',temperature:27,pressure:1.2,status:'占位符',failureReason:'没有粉末了'},
            //   {devID:'12345',temperature:27,pressure:1.2,status:'占位符',failureReason:'没有粉末了'},
            //   {devID:'12345',temperature:27,pressure:1.2,status:'占位符',failureReason:'没有粉末了'},
            //   {devID:'12345',temperature:27,pressure:1.2,status:'占位符',failureReason:'没有粉末了'},
            //   {devID:'12345',temperature:27,pressure:1.2,status:'占位符',failureReason:'没有粉末了'},
            //   {devID:'12345',temperature:27,pressure:1.2,status:'占位符',failureReason:'没有粉末了'},
            // ]
          }
        },
        components:{
          XuModal,
          SensorDataInOneProjectPopUp
        },
        methods:{
          //只能将这个函数放到地图的ready事件中才能加载地图
          getLocationMark:function(){
            this.$axios.get(this.api.getAllProjects)
              .then(res => {
                const { code,msg} = res.data;
                if(code === 200) {
                  msg.forEach(project => {
                    const { projectId,location,longitude,latitude,deviceNumber,projectName } = project;
                    this.projectLocations.push({projectName,projectId,deviceNumber,loc:{lng:longitude,lat:latitude}})
                  });
                }
              })
          },
          showSensorDataModal:function (project) {
            console.log(`获取项目id为${project.projectId}的监测数据`);
            this.project = project;
            this.isSensorModalShown = true;
            // this.devListModalTitle = projectName
          },
          showDevLineChartModal:function (devID) {
            this.isDevLineChartModalShown  = true
          }
        },
    }
</script>

<style scoped>
  .map-wrapper {
    height: 585px;
    border: 2px solid #ffffff;
  }
  .dev-list-table {
    width: 800px;
  }
  .dev-list-header{
    font-size: 18px;
    color: #4d5875;
  }
  .dev-id-toggle {
    cursor: pointer;
    color: #3f91f1;
  }
  .dev-id-toggle:hover {
    color: #3c9eff;
    text-decoration: underline;
  }
</style>
