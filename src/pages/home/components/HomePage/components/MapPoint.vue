<template>
  <div>
    <baidu-map
      class="xubox mb-integer map-wrapper"
      :scroll-wheel-zoom="true"
      :center="mapCenter">
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <bm-marker v-for="(projectLocation,index) in projectLocations"
                 :position="projectLocation.loc"
                 @click="showDevListsModal(projectLocation.name)"
                 :key="index">
      </bm-marker>
    </baidu-map>

    <xu-modal
      :shown="isDevListModalShown"
      :header-shown="true"
      :footer-shown="false"
      @close="isDevListModalShown = false"
      >
      <div slot="header" class="dev-list-header"><span class="fa fa-calendar"></span>&nbsp;{{devListModalTitle}}的设备详情</div>
      <div slot="content">
        <table class="table table-sm text-center dev-list-table">
          <thead class="thead-light thead-font-style">
          <tr>
            <th><span class="fa fa-circle-thin"></span>&nbsp;设备编号</th>
            <th><span class="fa fa-cloud"></span>&nbsp;温度</th>
            <th><span class="fa fa-bullseye"></span>&nbsp;压强</th>
            <th><span class="fa fa-circle"></span>&nbsp;状态</th>
            <th><span class="fa fa-circle"></span>&nbsp;失效原因</th>
          </tr>
          </thead>
          <tbody class="tbody-font-style">
          <tr v-for="(info,index) in devListModalInfos" :key="index">
            <th><span class="dev-id-toggle" @click="showDevLineChartModal(info.devID)">{{ info.devID }}</span></th>
            <th>{{ info.temperature }}</th>
            <th>{{ info.pressure }}</th>
            <th>{{ info.status }}</th>
            <th>{{ info.failureReason }}</th>
          </tr>
          </tbody>
        </table>
      </div>
    </xu-modal>

    <xu-modal
      :shown="isDevLineChartModalShown"
      @close="isDevLineChartModalShown = false"
      >
      <div slot="content" class="dev-list-header">
        <h1>ddd</h1>
        <h1>ddd</h1>
        <h1>ddd</h1>
        <h1>ddd</h1>
        <h1>ddd</h1>
        <h1>ddd</h1>
        <h1>ddd</h1>
      </div>
    </xu-modal>
  </div>
</template>

<script>
    import XuModal from "@/pages/share_components/XuModal";
    export default {
        name: "MapPoint",
        data:function () {
          return {
            projectLocations:[
              {name:'project01',loc:{lng:120.15,lat:30.28}},
              {name:'project02',loc:{lng:120.17,lat:30.29}},
              {name:'project03',loc:{lng:120.19,lat:30.31}},
              {name:'project04',loc:{lng:120.21,lat:30.26}}
            ],
            map:null,
            mapCenter:'杭州',
            isDevListModalShown:false,
            isDevLineChartModalShown:false,
            devListModalTitle:'',
            devListModalInfos:[
              {devID:'12345',temperature:27,pressure:1.2,status:'占位符',failureReason:'没有粉末了'},
              {devID:'12345',temperature:27,pressure:1.2,status:'占位符',failureReason:'没有粉末了'},
              {devID:'12345',temperature:27,pressure:1.2,status:'占位符',failureReason:'没有粉末了'},
              {devID:'12345',temperature:27,pressure:1.2,status:'占位符',failureReason:'没有粉末了'},
              {devID:'12345',temperature:27,pressure:1.2,status:'占位符',failureReason:'没有粉末了'},
              {devID:'12345',temperature:27,pressure:1.2,status:'占位符',failureReason:'没有粉末了'},
            ]
          }
        },
        components:{
          XuModal
        },
        methods:{
          showDevListsModal:function (projectName) {
            this.isDevListModalShown = true;
            this.devListModalTitle = projectName
          },
          showDevLineChartModal:function (devID) {
            this.isDevLineChartModalShown  = true
          }
        },
        mounted(){

        }
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
