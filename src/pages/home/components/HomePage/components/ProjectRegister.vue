<template>
    <div>
      <div class="xubox mb-integer">
        <div class="xubox-title">
          <span>项目注册设备</span>
          <div class="x-float-right search-wrapper">
            <label for="year-for-search">项目查询:</label>
            <input type="text" id="year-for-search" placeholder="请输入项目名称"
                   @input="$v.projectNameForSearch.$touch()"
                   v-model="projectNameForSearch">
            <button class="search-btn" @click="searchProject" :disabled="$v.$invalid">查询</button>
          </div>
        </div>
        <div class="xubox-content">
          <div class="register-project-table-wrapper">
            <table class="table table-sm text-center border-bottom">
              <thead class="thead-light thead-font-style">
              <tr>
                <th>项目名称</th>
                <th>产品数量</th>
                <th>项目地址</th>
                <th>完工日期</th>
              </tr>
              </thead>
              <tbody class="tbody-font-style">
              <tr v-for="(project,index) in registerProjects" :key="index">
                <th>
                  <span class="project-name-toggle"
                        @click="showSensorDataModal(project)">
                    {{ project.projectName}}
                  </span>
                </th>
                <th>{{ project.deviceNumber}}</th>
                <th>{{ project.location}}</th>
                <th>{{ project.projectFinishDate}}</th>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="xubox-foot">
          <div class="footer-wrapper">
            <div class="chart-explain">
              <span><span class="fa fa-square foot-item"></span>&nbsp;注册设备数量合计</span>
              <span class="x-float-right">{{ maxMinSum.sum }}个</span>
            </div>
            <div class="chart-explain">
              <span><span class="fa fa-square foot-item"></span>&nbsp;项目安装数量最大值</span>
              <span class="x-float-right">{{ maxMinSum.max }}个</span>
            </div>
            <div class="chart-explain">
              <span><span class="fa fa-square foot-item"></span>&nbsp;项目安装数量最小值</span>
              <span class="x-float-right">{{ maxMinSum.min }}个</span>
            </div>
          </div>
        </div>
      </div>

      <sensor-data-in-one-project-pop-up
        v-if="isSensorModalShown"
        :project="project"
        @close="isSensorModalShown = false"
        :modal-shown="isSensorModalShown">
      </sensor-data-in-one-project-pop-up>
    </div>
</template>

<script>
  import SensorDataInOneProjectPopUp from "@/popup/HomePage/SensorDataInOneProjectPopUp";
  import { required } from 'vuelidate/lib/validators';
    export default {
      name: "ProjectRegister",
      components:{
        SensorDataInOneProjectPopUp
      },
      data:function () {
        return {
          clickCount:0,//记录项目点击次数，供地图组件监听
          projectNameForSearch:'',
          project:null,//被选中的项目实例
          isSensorModalShown:false,
          registerProjects:[],//存放显示的项目数据
          marker:null,//存放选择项目的经纬度
          projectsArray:[],//存放请求到的项目
          isFind:true,//是否找到搜索的项目
        }
      },
      validations:{
        projectNameForSearch:{ required }
      },
      created(){
          this.getAllProjects()
      },
      methods: {
        getAllProjects:function () {
          this.$axios.get(this.api.getAllProjects)
            .then(res => {
              const { code,msg} = res.data;
              if(code === 200) {
                msg.forEach(project => {
                  const { projectId,projectFinishDate,location,deviceNumber,projectName,longitude,latitude} = project;
                  this.projectsArray.push({projectId,projectName,projectFinishDate,location,deviceNumber,loc:{lng:longitude,lat:latitude}})
                });
                this.registerProjects = this.projectsArray;
                this.$emit('searchDone',this.registerProjects);//初始加载数据向上传递事件
              }
            })
        },
        showSensorDataModal:function (project) {
          console.log(`获取项目id为${project.projectId}的监测数据`);
          this.project = project;
          this.clickCount ++;
          this.isSensorModalShown = true;
          this.$emit('chooseOneProject',this.project,this.clickCount)//显示传感器数据的同时将该项目的坐标向上传递
        },
        searchProject:function () {
          this.registerProjects = [];
          this.projectsArray.forEach(project => {
            if (project.projectName.includes(this.projectNameForSearch)){
              this.registerProjects.push(project);
            }
          });
          if (this.registerProjects.length !== 0){//只有搜索出来有结果才向上传递事件
            this.$emit('searchDone',this.registerProjects);
          }
        }
      },
      watch:{
        //如果没有输入就把数据还原
        projectNameForSearch:function () {
          if (this.projectNameForSearch === ''){
            this.registerProjects = this.projectsArray;
            this.$emit('searchDone',this.registerProjects);//数据还原向上传递事件
          }
        }
      },
      computed:{
        maxMinSum:function () {
          let deviceNumbers = [];
          this.registerProjects.forEach(project => {
            deviceNumbers.push(project.deviceNumber)
          });
          return {
            min:this.$common.min(deviceNumbers),
            max:Math.max(...deviceNumbers),
            sum:this.$common.sum(deviceNumbers)
          }
        },
      },
      //组件挂载完成后执行
      mounted:function () {

      }

    }
</script>

<style scoped>
  .footer-wrapper {
    font-size: 16px;
    color: #7b8294;
  }
  .foot-item {
    color: #e62229;
  }
  .search-wrapper {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
  }
  .search-btn {
    height: 26px;
    margin-left: 10px;
    background-color: #019b4c;
    width: 50px;
    color: #f7f7f7;
    border-radius: 3px;
  }

  .search-btn:enabled:hover {
    background-color: #01b14c;
  }

  .register-project-table-wrapper {
    /*outline: 1px solid black;*/
    height: 400px;
    overflow: auto;
  }

  .project-name-toggle {
    color: #3c9eff;
    cursor: pointer;
  }
  button[disabled] {
    cursor: not-allowed;
  }

</style>
