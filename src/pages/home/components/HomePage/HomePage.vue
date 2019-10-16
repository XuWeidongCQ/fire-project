<template>
  <div class="container-fluid page-wrapper" >
    <div class="row">
      <div class="col-xl-2 col-lg-3 col-md-12 col-sm-12">
        <!--左边的组件-->
        <project-register></project-register>
      </div>
      <div class="col-xl-5 col-lg-9 col-md-12 col-sm-12">
        <!--地图组件-->
        <map-point></map-point>
        <!--中间的报警表格组件-->
        <warning-table></warning-table>

      </div>
      <div class="col-xl-5 col-lg-12 col-md-12 col-sm-12">
        <div class="row">
          <div class="col-12">
            <!--各个月份的增量组件图-->
            <new-dev-per-month></new-dev-per-month>

          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <!--在线和离线饼图组件-->
            <online-offline-dev></online-offline-dev>
          </div>
          <div class="col-4">
            <!--有效和无效饼图组件-->
            <using-used-dev></using-used-dev>

          </div>
          <div class="col-4">
            <!--平均有效和离线饼图组件-->
            <dev-using-online-rate></dev-using-online-rate>

          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-12 text-center">
        <small class="text-muted">重庆大学微系统研究中心©2019</small>
      </div>
    </div>

    <!--模态框：显示表格-->
    <!--<loc-modal-table-component></loc-modal-table-component>-->

    <!--模态框：显示某一个设备的数据动态详情-->
    <!--<line_modal_component></line_modal_component>-->

  </div>
</template>

<script>
    import ProjectRegister from './components/ProjectRegister'
    import MapPoint from './components/MapPoint'
    import WarningTable from './components/WarningTable'
    import NewDevPerMonth from './components/NewDevPerMonth'
    import OnlineOfflineDev from './components/OnlineOfflineDev'
    import UsingUsedDev from './components/UsingUsedDev'
    import DevUsingOnlineRate from './components/DevUsingOnlineRate'
    export default {
        name: "HomePage",
        components:{
          ProjectRegister,
          MapPoint,
          WarningTable,
          NewDevPerMonth,
          OnlineOfflineDev,
          UsingUsedDev,
          DevUsingOnlineRate
        }
    }
</script>

<style scoped>

</style>
