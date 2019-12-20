<template>
  <div class="page-wrapper">
    <div class="xu-row">
      <div class="xu-col-2">
        <!--各个月份的增量组件图-->
        <new-dev-per-month></new-dev-per-month>
      </div>
      <div class="xu-col-10">
        <map-and-project-register></map-and-project-register>
      </div>
    </div>
    <div class="xu-row">
      <div class="xu-col-7">
        <!--报警组件-->
        <warning-table></warning-table>
      </div>
      <div class="xu-col-5">
        <!--有线有效统计-->
        <online-using-statistics></online-using-statistics>
      </div>
    </div>
    <div class="xu-row">
      <div class="xu-col-12 text-center">
        <small class="text-muted">重庆大学微系统研究中心©2019</small>
      </div>
    </div>
  </div>
</template>

<script>
    import WarningTable from './components/WarningTable'
    import NewDevPerMonth from './components/NewDevPerMonth'
    import OnlineUsingStatistics from "./components/OnlineUsingStatistics";
    import MapAndProjectRegister from "@/pages/home/components/HomePage/components/MapAndProjectRegister";

    export default {
        name: "HomePage",
        components:{
          MapAndProjectRegister,
          WarningTable,
          NewDevPerMonth,
          OnlineUsingStatistics
        },
        data:function(){
          return {
            project:{},//接收来自project-register组件的项目实例
            clickCount:0,//接收来自project-register组件的点击计数
            projects:[],//接收来自project-register组件的搜索项目
          }
        },
        methods:{
          chooseOneProject:function (project,clickCount) {
            this.clickCount = clickCount;
            this.project = project;
          },
          searchDone:function (projects) {
            this.projects = projects;
          }
        }
    }
</script>

<style scoped>
  .page-wrapper {
    padding: 60px 15px 0;
    min-width: 1900px;
  }
</style>
