<template>
  <div class="project-details-wrapper">

    <div class="no-projects" v-if="projectInfos.length === 0">
      <span class="no-projects-info">数据库中暂无项目或请求项目数据失败</span>
    </div>

    <table class="table table-striped text-center" v-if="projectInfos.length !== 0">
      <thead class="thead-light thead-font-style">
      <tr>
        <th>项目ID</th>
        <th>项目地址</th>
        <th>产品数量</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody class="tbody-font-style">
      <tr v-for="(project,index) in projectInfos" :key="index">
        <th>{{project.projectId}}</th>
        <th>{{project.location}}</th>
        <th>{{project.deviceNumber}}</th>
        <th>
          <button
            :class="{'btn-delete':project.deviceNumber === 0,'btn-disable':project.deviceNumber !== 0}"
            :disabled="project.deviceNumber !== 0"
            @click="deleteOneProject(project,index)">
            删除
          </button>
          <button class="btn-add-dev"
                  @click="showAddDevModal(project)">
            添加设备
          </button>
          <button
            :class="{'btn-search-dev':project.deviceNumber !== 0,'btn-disable':project.deviceNumber === 0}"
            :disabled="project.deviceNumber === 0"
            @click="showDevDetailsModal(project)">
            查看设备
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
      @deleteOneDevSuccess = 'deleteOneDevSuccess'
      @close="isDevDetailsModalShown = false">
    </look-devs-pop-up>
  </div>
</template>

<script>
  import AddOneDevPopUp from "@/popup/AddOneDevPopUp";
  import LookDevsPopUp from "@/popup/LookDevsPopUp";
  import { deleteSuccessToastr,deleteFailureToastr,addSuccessToastr,addFailureToastr } from "@/plugins/toastrInfos";

  export default {
    name: "ProjectsDetailTable",
    components: {
      AddOneDevPopUp,
      LookDevsPopUp
    },
    data:function(){
      return {
        isAddDevModalShown:false,
        isDevDetailsModalShown:false,
        project:null,//被选中的项目实例
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
    },

    methods:{
      //添加设备对话框
      showAddDevModal:function (project) {
        this.isAddDevModalShown = true;
        this.project = project;
        console.log(`选择在项目id为${this.project.projectId}中添加设备`)
      },
      addOneDevSuccess:function(){
        this.$emit('addOneDevSuccess')
      },
      //删除一个项目
      deleteOneProject:function (project,projectIndex) {
        this.projectInfos.splice(projectIndex,1);
        console.log(`选择删除项目id为${project.projectId}`);
        this.$axios.post(
          this.api.deleteOneProject,
          this.$qs.stringify({object:JSON.stringify({'projectId':project.projectId})})
        )
          .then(res => {
            const { code,msg} = res.data;
            if (code === 200){
              this.$toastr.Add(deleteSuccessToastr);
            } else {
              this.$toastr.Add(deleteFailureToastr);
            }
          })
          .catch(error => {
            this.$toastr.Add(deleteFailureToastr);
          })
      },
      //查看设备详情
      showDevDetailsModal:function(project){
        this.isDevDetailsModalShown = true;
        this.project = project;
      },
      //删除一台设备的信息
      deleteOneDev:function (uuid) {
        const dataForSubmit = {
          projectId:this.project.projectId,
          uuid:uuid,
        };
        console.log(`删除项目${this.project.projectId}的设备uuid为${uuid}`)
        // this.$axios.delete()
      },
      deleteOneDevSuccess:function () {
        this.$emit('deleteOneDevSuccess')
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
