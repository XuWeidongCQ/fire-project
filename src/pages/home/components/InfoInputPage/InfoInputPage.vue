<template>
    <div class="page-wrapper container-fluid">
      <div class="info-input-wrapper">
        <div class="form-wrapper">
          <!--添加项目表单-->
          <add-new-project-form
            @addProjectSuccess="refreshProjectsDetailTable++"
            :project="project"></add-new-project-form>
        </div>

        <div class="map-wrapper">
          <!--添加项目辅助地图-->
          <add-new-project-map :project="project"></add-new-project-map>
        </div>

        <div class="project-result-wrapper xubox">
          <div class="xubox-title">
            <span>项目概况</span>
          </div>
          <div class="xubox-content" style="height: 435px">
            <!--项目详情列表-->
            <projects-detail-table :key="refreshProjectsDetailTable">
            </projects-detail-table>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-center">
          <small class="text-muted">重庆大学微系统研究中心©2019</small>
        </div>
      </div>
    </div>
</template>

<script>
  import AddNewProjectForm from "@/pages/home/components/InfoInputPage/components/AddNewProjectForm";
  import AddNewProjectMap from "@/pages/home/components/InfoInputPage/components/AddNewProjectMap";
  import ProjectsDetailTable from "@/pages/home/components/InfoInputPage/components/ProjectsDetailTable";
  export default {
    name: "InfoInputPage",
    components:{
      AddNewProjectForm,
      AddNewProjectMap,
      ProjectsDetailTable
    },
    provide:{
      refreshProjectsDetailTable:0,
    },
    data:function () {
      return {
        project:{
          province:'重庆',
          location:'',
          longitude:'',
          latitude:'',
          projectFinishDate:this.$f.getDate().YYYYMMDD,
          remark:'',
        },
        refreshProjectsDetailTable:0,
      }
    },
  }
</script>

<style scoped>
  .info-input-wrapper {
    /*outline: 1px solid black;*/
    height: 1150px;
    width: 1400px;
    margin: 0 auto;
  }
  .form-wrapper {
    height: 650px;
    width: 400px;
    /*outline: 1px solid black;*/
    margin-right: 20px;
    display: inline-block;
  }
  .map-wrapper {
    width: 980px;
    height: 650px;
    /*outline: 1px solid black;*/
    float: right;
    z-index: 2;
  }
  .project-result-wrapper {
    margin-top: 15px;
    width: 1400px;
  }
</style>
