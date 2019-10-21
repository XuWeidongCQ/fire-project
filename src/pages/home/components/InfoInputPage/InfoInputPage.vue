<template>
    <div class="page-wrapper container-fluid">
      <div class="info-input-wrapper">
        <div class="form-wrapper">
          <add-new-project-form :project="project"></add-new-project-form>
        </div>

        <div class="map-wrapper">
          <add-new-project-map :project="project"></add-new-project-map>
        </div>

        <div class="project-result-wrapper xubox">
          <div class="xubox-title">
            <span>项目概况</span>
          </div>
          <div class="xubox-content" style="height: 435px">
            <div class="no-projects" v-if="projectInfos.length === 0">
              <span class="no-projects-info">数据库中暂无项目或请求项目数据失败</span>
            </div>
            <projects-detail-table :project-infos="projectInfos" v-if="projectInfos.length !== 0"></projects-detail-table>
          </div>
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
  import XuModal from "@/pages/share_components/XuModal";
  import AddNewProjectForm from "@/pages/home/components/InfoInputPage/components/AddNewProjectForm";
  import AddNewProjectMap from "@/pages/home/components/InfoInputPage/components/AddNewProjectMap";
  import ProjectsDetailTable from "@/pages/home/components/InfoInputPage/components/ProjectsDetailTable";
  export default {
    name: "InfoInputPage",
    components:{
      XuModal,
      AddNewProjectForm,
      AddNewProjectMap,
      ProjectsDetailTable
    },
    data:function () {
      return {
        project:{
          name:'',
          province:'重庆',
          location:'',
          longitude:'',
          latitude:'',
          remark:'',
        },
        projectInfos:[
          // {projectId:12,location:'上海市公交集团',deviceNumber:480,longitude:123.2345,latitude:23.3467},
        ],
      }
    },
    created() {
      this.$axios.get(this.api.getAllProjects)
        .then(res => {
          const { code,msg} = res.data;
          if(code === 200) {
            msg.forEach(project => {
              const { projectId,location,longitude,latitude,deviceNumber } = project;
              this.projectInfos.push({projectId,location,longitude,latitude,deviceNumber})
            })
          }
        })
    }
  }
</script>

<style scoped>
  .info-input-wrapper {
    outline: 1px solid black;
    height: 1150px;
    width: 1400px;
    margin: 0 auto;
  }
  .form-wrapper {
    height: 650px;
    width: 400px;
    outline: 1px solid black;
    margin-right: 20px;
    display: inline-block;
  }
  .map-wrapper {
    width: 980px;
    height: 650px;
    outline: 1px solid black;
    float: right;
    z-index: 2;
  }
  .project-result-wrapper {
    margin-top: 15px;
    width: 1400px;
  }
  .no-projects {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 420px;
  }
  .no-projects-info {
    font-size: 50px;
    color: #cccccc;
    line-height: 1;
  }
</style>
