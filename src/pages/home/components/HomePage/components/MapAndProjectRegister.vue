<template>
  <div class="row">

    <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
      <baidu-map
        class="xubox mb-integer map-wrapper"
        :scroll-wheel-zoom="true"
        :zoom="10"
        :center="mapCenter || '重庆'">
        <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
        <bm-marker v-for="(project,index) in registerProjects"
                   @click="showSensorDataModal(project,true)"
                   @mouseover="showInfoWindow(project)"
                   @mouseout="closeInfoWindow"
                   :position="project.loc"
                   :key="index">
        </bm-marker>
<!--        鼠标移上去显示或者点击表格显示-->
        <bm-info-window
          :position="infoWindowCenter || {lng: 106.5584, lat: 29.5745}"
          :show="infoWindowShown"
          title="项目概览"
          @open="infoWindowShown = true"
          @close="infoWindowShown = false">
          <div class="info-window">
            <p><span class="info-window-item"></span>项目名称：{{chooseProject.projectName}}</p>
            <p><span class="info-window-item"></span>项目位置：{{chooseProject.location}}</p>
            <p><span class="info-window-item"></span>产品数量：{{chooseProject.deviceNumber}}</p>
            <p><span class="info-window-item"></span>完工日期：{{chooseProject.projectFinishDate}}</p>
          </div>
        </bm-info-window>
      </baidu-map>
    </div>

    <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
      <!--注册项目表格-->
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
            <table class="table table-sm text-center border-bottom x-table-hover">
              <thead class="tiny-thead">
              <tr>
                <th>项目名称</th>
                <th>产品数量</th>
                <th>项目地址</th>
                <th>完工日期</th>
              </tr>
              </thead>
              <tbody class="tiny-tbody">
              <tr v-for="(project,index) in presentProjectDetails" :key="index">
                <td>
                  <span class="project-name-toggle"
                        @click="showSensorDataModal(project,false)">
                    {{ project.projectName}}
                  </span>
                </td>
                <td>{{ project.deviceNumber}}</td>
                <td>{{ project.location}}</td>
                <td>{{ project.projectFinishDate}}</td>
              </tr>
              </tbody>
            </table>

            <xu-page-nav :max-page="maxPage"
                         :is-shown="isPageNavShown"
                         @selectedPage="getSelectedPage"
                         class="x-float-right"></xu-page-nav>

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
    </div>

    <sensor-data-in-one-project-pop-up
      v-if="isSensorModalShown"
      :project="chooseProject"
      @close="isSensorModalShown = false"
      :modal-shown="isSensorModalShown">
    </sensor-data-in-one-project-pop-up>

  </div>
</template>

<script>
  import XuPageNav from "@/XuComponent/XuPageNav";
  import XuSwitch from "@/XuComponent/XuSwitch";
  import SensorDataInOneProjectPopUp from "@/popup/HomePage/SensorDataInOneProjectPopUp";
  import { required } from 'vuelidate/lib/validators';

  export default {
    name: "MapAndProjectRegister",
    components:{
      SensorDataInOneProjectPopUp,
      XuPageNav,
      XuSwitch
    },
    data:function () {
      return {
        onePageNumber:11,//一页显示的数目
        isPageNavShown:false,//是否显示分页器
        maxPage:1,//最大分页数
        presentProjectDetails:[],//当前用来显示的设备信息
        projectNameForSearch:'',//用来搜索的项目名字
        chooseProject:{},//被选中的项目实例
        isSensorModalShown:false,
        registerProjects:[],//存放搜索到项目数据
        projectsArray:[],//存放原始请求到的项目
        // infoWindowShown:false,//是否显示信息窗口
        // mapCenter:null,//地图显示中心
        // infoWindowCenter:{},//信息窗口弹出位置
      }
    },
    validations:{
      projectNameForSearch:{ required }
    },
    created(){
      this.getAllProjects()
    },
    methods: {
      //初始获取数据
      getAllProjects:function () {
        this.$Http.getAllProjectsInfos()
          .then(res => {
            const { code,msg} = res;
            if(code === 200) {
              msg.forEach(project => {
                const { projectId,projectFinishDate,location,deviceNumber,projectName,longitude,latitude} = project;
                this.projectsArray.push({projectId,projectName,projectFinishDate,location,deviceNumber,loc:{lng:longitude,lat:latitude}})
              });
              this.registerProjects = this.projectsArray;
              this.presentProjectDetails = this.projectsArray;
              this.initPageNav()
            }
          })
      },
      //点击项目名称或者坐标点--显示项目中所有设备最新数据
      showSensorDataModal:function (project,isMapToggle) {
        console.log(`获取项目id为${project.projectId}的监测数据`);
        this.chooseProject = project;
        this.$store.commit('changeInfoCenter',project.loc);
        if (!isMapToggle) {
          this.$store.commit('changeMapCenter',project.loc);
          // this.mapCenter = project.loc
        }
        // this.infoWindowShown = true;
        this.$store.commit('changeWindowShown',true);
        this.isSensorModalShown = true;
      },
      //项目搜索
      searchProject:function () {
        this.registerProjects = [];
        this.projectsArray.forEach(project => {
          if (project.projectName.includes(this.projectNameForSearch)){
            this.registerProjects.push(project);
          }
        });
        // this.presentProjectDetails = this.registerProjects;
        this.initPageNav()
      },
      //显示信息窗口
      showInfoWindow:function (projectInstance) {
        // this.infoWindowShown = true;
        this.$store.commit('changeWindowShown',true);
        this.chooseProject = projectInstance;
        this.$store.commit('changeInfoCenter',projectInstance.loc);
      },
      closeInfoWindow:function () {
        // this.infoWindowShown = false;
        this.$store.commit('changeWindowShown',false);
      },
      //初始化分页器信息
      initPageNav:function(){
        this.maxPage = Math.ceil(this.registerProjects.length / this.onePageNumber);
        if (this.maxPage > 1){//如果超过1页
          this.presentProjectDetails = this.registerProjects.slice(0,this.onePageNumber);
          this.isPageNavShown = true
        } else {
          this.isPageNavShown = false;
          this.presentProjectDetails = this.registerProjects
        }
      },
      //分页器选择特定页
      getSelectedPage:function(page){
        // console.log('选择的页码为:',page);
        if (page === this.maxPage){
          this.presentProjectDetails = this.registerProjects.slice((page - 1) * 10);
        } else {
          this.presentProjectDetails = this.registerProjects.slice((page - 1) * 10,page * 10);
        }
      },
    },
    watch:{
      //如果没有输入就把数据还原
      projectNameForSearch:function () {
        if (this.projectNameForSearch === ''){
          this.registerProjects = this.projectsArray;
          this.initPageNav()
          // this.$emit('searchDone',this.registerProjects);//数据还原向上传递事件
        }
      }
    },
    computed:{
      mapCenter:function(){
        return this.$store.state['homePage'].mapCenter
      },
      infoWindowCenter:function(){
        return this.$store.state['homePage'].infoWindowCenter
      },
      infoWindowShown:{
        get(){
          return this.$store.state['homePage'].infoWindowShown
        },
        set(value){
          this.$store.commit('changeWindowShown',value);
        }
      },
      maxMinSum:function () {
        let deviceNumbers = [];
        this.presentProjectDetails.forEach(project => {
          deviceNumbers.push(project.deviceNumber)
        });
        return {
          min:this.$f.min(deviceNumbers),
          max:this.$f.max(deviceNumbers),
          sum:this.$f.sum(deviceNumbers)
        }
      },
    },
  }
</script>

<style scoped>
  .map-wrapper {
    height: 500px;
    border: 2px solid #ffffff;
  }
  .info-window {
    border-radius: 5px;
    font-size: 14px;
    color: #3a4460;
    margin-bottom: 5px;
  }
  .info-window > p {
    line-height: 1.5;
  }
  .info-window-item {
    display: inline-block;
    margin-right: 5px;
    height: 12px;
    width: 12px;
    border-radius: 5px;
    background-color: #019b4c;
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
    height: 350px;
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
