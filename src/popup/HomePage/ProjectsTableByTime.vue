<template>
  <div>
    <xu-modal
      :shown="true"
      :header-shown="true"
      @close="close">
      <div slot="header">
        {{ statistics.year }}年{{ statistics.month }}月的项目情况
      </div>
      <div slot="content" class="projects-table scroll-table scrollBar-style">
        <table class="table-sm table text-center x-table-hover border-bottom">
          <thead class="tiny-thead">
          <tr>
            <th>项目名称</th>
            <th>产品数量</th>
            <th>项目地址</th>
            <th>完工日期</th>
          </tr>
          </thead>
          <tbody class="tbody-font-style">
          <tr v-for="(project,index) in projects" :key="index">
            <td>
              <span class="project-name-toggle" @click="showSensorModal(project)">{{ project.projectName }}</span>
            </td>
            <td>{{ project.deviceNumber }}</td>
            <td>{{ project.location }}</td>
            <td>{{ project.projectFinishDate }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </xu-modal>

    <sensor-data-in-one-project-pop-up v-if="isSensorModalShown"
                                       @close="isSensorModalShown = false"
                                       :modal-shown="isSensorModalShown"
                                       :project="selectProject"></sensor-data-in-one-project-pop-up>
  </div>
</template>

<script>
  import XuModal from "@/pages/share_components/XuModal";
  import SensorDataInOneProjectPopUp from "@/popup/HomePage/SensorDataInOneProjectPopUp";

  export default {
    name: "ProjectsTableByTime",
    components:{
      XuModal,
      SensorDataInOneProjectPopUp
    },
    props:{
      statistics:{
        type:Object,
        default:{},
      }
    },
    data:function () {
      return {
        projects:[],//存放渲染表格的数据
        isSensorModalShown:false,//是否显示项目设备最新数据的弹窗
        selectProject:{},//选择的项目实例用来弹窗
      }
    },
    methods:{
      //初始获取数据
      getProjectsByTime:function () {
        this.$Http.getProjectsByTime({params:{year:this.statistics.year,month:this.statistics.month}})
          .then(res => {
            const {code,msg} = res.data;
            if (code === 200){
              // console.log(msg);
              msg.forEach(project => {
                const {projectId,projectName,deviceNumber,location,projectFinishDate,longitude,latitude} = project;
                this.projects.push({projectId,projectName,deviceNumber,location,projectFinishDate,loc:{lng:longitude,lat:latitude}})
              })
            }
          })
      },
      //点击项目名称--显示项目设备最新数据的弹窗
      showSensorModal:function(project){
        this.selectProject = project;
        this.$store.commit('changeMapCenter',project.loc);
        this.$store.commit('changeInfoCenter',project.loc);
        this.$store.commit('changeWindowShown',true);
        this.isSensorModalShown = true
      },
      close:function () {
        this.$emit('close')
      }
    },
    created() {
      this.getProjectsByTime()
    }
  }
</script>

<style scoped>
  .projects-table {
    min-width: 700px;
    max-height: 500px;
  }
  .project-name-toggle {
    color: #3c9eff;
    cursor: pointer;
  }
</style>
