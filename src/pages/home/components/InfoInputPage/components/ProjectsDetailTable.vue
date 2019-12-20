<template>
  <div class="project-details-wrapper xu-fix-table-wrapper scrollBar-style">

    <table class="xu-table xu-table-center xu-text-white-level1 xu-table-hover">
      <thead class="bg-info">
      <tr>
        <th>#ID</th>
        <th>项目名称</th>
        <th>项目地址</th>
        <th>项目经纬度</th>
        <th>产品数量</th>
        <th>完工日期</th>
        <th>备注</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(project,index) in projectInfos" :key="index">
        <td>{{project.projectId}}</td>
        <td>{{project.projectName}}</td>
        <td>{{project.location}}</td>
        <td>({{project.longitude}}，{{project.latitude}})</td>
        <td>{{project.deviceNumber}}</td>
        <td>{{project.projectFinishDate}}</td>
        <td>{{project.remark }}</td>
        <td>
          <button
            :class="{'btn-delete':project.deviceNumber === 0,'btn-disable':project.deviceNumber !== 0}"
            :disabled="project.deviceNumber !== 0"
            @click="deleteOneProject(project,index)">
            <span class="fa fa-trash"></span>
          </button>
          <button
            class="btn-add-dev"
            @click="showAddDevModal(project)">
            <span class="fa fa-plus"></span>
          </button>
          <button
            :class="{'btn-search-dev':project.deviceNumber !== 0,'btn-disable':project.deviceNumber === 0}"
            :disabled="project.deviceNumber === 0"
            @click="showDevDetailsModal(project)">
            <span class="fa fa-eye"></span>
          </button>
          <button
            class="btn-edit"
            @click="showEditProjectModal(project,index)">
            <span class="fa fa-edit"></span>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="no-projects" v-if="projectInfos.length === 0">
      <span class="no-projects-info">数据库中暂无项目或请求项目数据失败</span>
    </div>
    <!--在一个项目中添加一台设备弹窗-->
    <add-one-dev-pop-up
      :modal-shown="isAddDevModalShown"
      :project="project"
      @addOneDevSuccess="addOneDevSuccess"
      @close="isAddDevModalShown = false">
    </add-one-dev-pop-up>

    <!--查看一个项目中所有设备弹窗-->
    <look-devs-pop-up
      :project="project"
      v-if="isDevDetailsModalShown"
      @deleteOneDevSuccess = 'project.deviceNumber--'
      @close="isDevDetailsModalShown = false">
    </look-devs-pop-up>

    <!--修改一个项目弹窗-->
    <edit-one-project-pop-up
      :project="project"
      v-if="isEditProjectModalShown"
      @editOneProjectSuccess = "editOneProjectSuccess"
      @close="isEditProjectModalShown = false">
    </edit-one-project-pop-up>
  </div>
</template>

<script>
  import AddOneDevPopUp from "@/popup/InfoInputPage/AddOneDevPopUp";
  import LookDevsPopUp from "@/popup/InfoInputPage/LookDevsPopUp";
  import EditOneProjectPopUp from "@/popup/InfoInputPage/EditOneProjectPopUp";
  import XuSwitch from "@/XuComponent/XuSwitch";
  import  XuCSS  from '@/plugins/XuCSS'

  export default {
    name: "ProjectsDetailTable",
    components: {
      XuSwitch,
      AddOneDevPopUp,
      LookDevsPopUp,
      EditOneProjectPopUp
    },
    data:function(){
      return {
        isAddDevModalShown:false,
        isDevDetailsModalShown:false,
        isEditProjectModalShown:false,
        refreshProjectsDetailTable:0,
        projectIndex:0,//被选中的项目实例的数组索引
        project:null,//被选中的项目实例
        projectInfos:[//get获得的项目信息
          // {projectId:12,location:'上海市公交集团',deviceNumber:480,longitude:123.2345,latitude:23.3467},
        ],
      }
    },
    provide:function(){
      return {
        project:this.project
      }
    },
    created() {
      this.getAllProjects()
    },

    methods:{
      //1.添加设备对话框
      showAddDevModal:function (project) {
        this.isAddDevModalShown = true;
        this.project = project;
        console.log(`选择在项目id为${this.project.projectId}中添加设备`)
      },
      //2.编辑项目对话框
      showEditProjectModal:function(project,index){
        this.isEditProjectModalShown = true;
        this.project = project;
        this.projectIndex = index;
        console.log(`编辑的项目id为${this.project.projectId}`)
      },
      //3.获取所有项目
      getAllProjects:function(){
        this.projectInfos = [];
        this.$Http.getAllProjectsInfos()
          .then(res => {
            const {code,msg} = res;
            if (code === 200){
              msg.forEach(project => {
                const { projectId,location,longitude,latitude,deviceNumber,projectName,remark,projectFinishDate } = project;
                this.projectInfos.push({projectId,location,longitude,latitude,deviceNumber,projectName,remark,projectFinishDate})
              });
            }
          })
      },
      //4.删除一个项目
      deleteOneProject:function (project,projectIndex) {
        console.log(`选择删除项目id为${project.projectId}`);
        this.$Http.delOneProject({data:{projectId:project.projectId}})
          .then(res => {
            const { code,msg} = res;
            if (code === 200){
              this.projectInfos.splice(projectIndex,1);
            }
          })
      },
      //5.查看项目中设备详情
      showDevDetailsModal:function(project){
        this.isDevDetailsModalShown = true;
        this.project = project;
      },
      //6.编辑项目信息成功
      editOneProjectSuccess:function(project){
        this.getAllProjects();
        this.isEditProjectModalShown = false;
      },
      //6.项目中添加设备成功
      addOneDevSuccess:function () {
        this.project.deviceNumber ++;
        this.isAddDevModalShown = false;
      }
    },
    watch:{
      projectInfos:function () {
        // console.log(1);
        // XuCSS.fixTableThead()
      }
    },
    updated() {
      // XuCSS.fixTableThead()
    }
  }
</script>

<style scoped>
  .project-details-wrapper {
    max-height: 100%;
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
