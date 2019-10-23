<template>
  <div class="container-fluid page-wrapper" >
    <div class="row">
      <div class="col-xl-2 col-lg-3 col-md-12 col-sm-12">
        <!--各个月份的增量组件图-->
        <new-dev-per-month></new-dev-per-month>
      </div>
      <div class="col-xl-5 col-lg-9 col-md-12 col-sm-12">
        <!--地图组件-->
        <map-point></map-point>
      </div>
      <div class="col-xl-5 col-lg-12 col-md-12 col-sm-12">
        <!--注册项目表格-->
        <project-register></project-register>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-6 col-lg-5 col-md-12 col-sm-12">
        <!--报警组件-->
        <warning-table></warning-table>
      </div>
      <div class="col-xl-6 col-lg-7 col-md-12 col-sm-12">
        <!--有线有效统计-->
        <online-using-statistics></online-using-statistics>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-12 text-center">
        <small class="text-muted">重庆大学微系统研究中心©2019</small>
      </div>
    </div>
  </div>
</template>

<script>
    import ProjectRegister from './components/ProjectRegister'
    import MapPoint from './components/MapPoint'
    import WarningTable from './components/WarningTable'
    import NewDevPerMonth from './components/NewDevPerMonth'
    import OnlineUsingStatistics from "./components/OnlineUsingStatistics";
    export default {
        name: "HomePage",
        components:{
          ProjectRegister,
          MapPoint,
          WarningTable,
          NewDevPerMonth,
          OnlineUsingStatistics
        }
    }
</script>

<style scoped>

</style>
