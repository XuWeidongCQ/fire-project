<template>
  <div class="project-details-wrapper">

    <div class="no-projects" v-if="projectInfos.length === 0">
      <span class="no-projects-info">数据库中暂无项目或请求项目数据失败</span>
    </div>

    <table class="table table-striped text-center border-bottom" v-if="projectInfos.length !== 0">
      <thead class="thead-light thead-font-style">
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
      <tbody class="tbody-font-style">
      <tr v-for="(project,index) in projectInfos" :key="index">
        <th>{{project.projectId}}</th>
        <th>{{project.projectName}}</th>
        <th>{{project.location}}</th>
        <th>({{project.longitude}}，{{project.latitude}})</th>
        <th>{{project.deviceNumber}}</th>
        <th>{{project.projectFinishDate}}</th>
        <th>{{project.remark }}</th>
        <th>
          <button
            :class="{'btn-delete':project.deviceNumber === 0,'btn-disable':project.deviceNumber !== 0}"
            :disabled="project.deviceNumber !== 0"
            @click="deleteOneProject(project,index)">
            删除
          </button>
          <button
            class="btn-add-dev"
            @click="showAddDevModal(project)">
            添加设备
          </button>
          <button
            :class="{'btn-search-dev':project.deviceNumber !== 0,'btn-disable':project.deviceNumber === 0}"
            :disabled="project.deviceNumber === 0"
            @click="showDevDetailsModal(project)">
            查看设备
          </button>
          <button
            class="btn-edit"
            @click="showEditProjectModal(project,index)">
            修改
          </button>
        </th>
      </tr>
      </tbody>
    </table>
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
  import { configToastr } from "@/plugins/toastrInfos";

  export default {
    name: "ProjectsDetailTable",
    components: {
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
        projectInfos:[
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
      //添加设备对话框
      showAddDevModal:function (project) {
        this.isAddDevModalShown = true;
        this.project = project;
        console.log(`选择在项目id为${this.project.projectId}中添加设备`)
      },
      //编辑项目对话框
      showEditProjectModal:function(project,index){
        this.isEditProjectModalShown = true;
        this.project = project;
        this.projectIndex = index;
        console.log(`编辑的项目id为${this.project.projectId}`)
      },
      //获取所有项目
      getAllProjects:function(){
        this.$Http.getAllProjectsInfos()
          .then(res => {
            const { code,msg} = res.data;
            console.log(msg);
            if(code === 200) {
              msg.forEach(project => {
                const { projectId,location,longitude,latitude,deviceNumber,projectName,remark,projectFinishDate } = project;
                this.projectInfos.push({projectId,location,longitude,latitude,deviceNumber,projectName,remark,projectFinishDate})
              })
            }
          })
      },
      //删除一个项目
      deleteOneProject:function (project,projectIndex) {
        console.log(`选择删除项目id为${project.projectId}`);
        this.$Http.delOneProject({data:{projectId:project.projectId}})
          .then(res => {
            const { code,msg} = res.data;
            if (code === 200){
              this.$toastr.Add(configToastr('删除项目-',msg,'success'));
              this.projectInfos.splice(projectIndex,1);
            } else {
              this.$toastr.Add(configToastr('删除项目-',msg,'warning'));
            }
          })
          .catch(error => {
            this.$toastr.Add(configToastr('无法连接服务器','error'));
          })
      },
      //查看设备详情
      showDevDetailsModal:function(project){
        this.isDevDetailsModalShown = true;
        this.project = project;
      },
      editOneProjectSuccess:function(project){
        this.projectInfos.splice(this.projectIndex,1,project);
        this.isEditProjectModalShown = false;
      },
      addOneDevSuccess:function () {
        this.project.deviceNumber ++;
        this.isAddDevModalShown = false;
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .project-details-wrapper {
    max-height: 100%;
    overflow-y: auto;
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
