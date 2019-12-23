<template>
  <div class="xubox mb-integer">
    <div class="xubox-title">
      <span>报警信息</span>
      <div class="x-float-right search-wrapper">
        <label for="uuid-for-search">设备已处理报警记录查询:</label>
        <input type="text" id="uuid-for-search" placeholder="请输入uuid"
               @input="$v.uuidForSearch.$touch()"
               v-model="uuidForSearch">
        <button class="search-btn" @click="searchAlarmInfos" :disabled="$v.$invalid">查询</button>
      </div>
    </div>
    <div class="xubox-content limit-table-height x-table-hover clearfix">
      <div class="table-left scroll-table scrollBar-style">
        <table class="table table-sm text-center border-bottom">
          <thead class="tiny-thead">
          <tr>
            <th>设备uuid</th>
            <th>项目位置</th>
            <th>设备位置</th>
            <th>内容</th>
            <th>时间</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody class="tbody-sm">
          <tr  v-for="(item,index) in warningInfos" :key="index">
            <td>{{ item.uuid }}</td>
            <td>{{ item.projectLocation }}</td>
            <td>{{ item.deviceLocation }}</td>
            <td><span class="badge badge-danger">{{ item.alarmMessage }}</span></td>
            <td>{{ item.time }}</td>
            <td>
              <button class="btn-search-dev" @click="getAlarmDeviceHistoryData(item)">
                <span class="fa fa fa-line-chart"></span>
              </button>
              <button class="btn-add-dev" @click="handleDeviceAlarm(item)">
                <span class="fa fa-check">已处理</span>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="no-warnings" v-if="warningInfos.length === 0">
          <span class="no-warnings-info">暂无未处理的报警信息</span>
        </div>
      </div>
      <div class="table-right scroll-table scrollBar-style">
        <table class="table table-sm text-center border-bottom">
          <thead class="tiny-thead">
          <tr>
            <th>uuid</th>
            <th>报警内容</th>
            <th>处理时间</th>
          </tr>
          </thead>
          <tbody class="tbody-sm">
          <tr v-for="info in allWarningInfos" v-if="info.processMark === true">
            <td>{{info.uuid}}</td>
            <td><span class="badge badge-danger">{{ info.alarmMessage }}</span></td>
            <td>{{info.gmtModified}}</td>
          </tr>
          </tbody>
        </table>
        <div class="no-warnings" v-if="allWarningInfos.length === 0">
          <span class="no-warnings-info">暂无报警信息</span>
        </div>
      </div>

    </div>

    <device-history-data
      :device="device"
      @close="isHistoryDataModalShown = false"
      v-if="isHistoryDataModalShown">
    </device-history-data>

  </div>
</template>

<script>
  import XuPageNav from "@/XuComponent/XuPageNav";
  import DeviceHistoryData from "@/popup/HomePage/DeviceHistoryData";
  import { required } from 'vuelidate/lib/validators';

  export default {
    name: "WarningTable",
    components:{
      DeviceHistoryData,
      XuPageNav
    },
    data:function () {
      return {
        timer:null,//获取未处理报警信息的定时器
        warningInfos:[
          // {index:'001',uuid:123,location:'重庆市',msg:'粉末已耗尽',time:this.common.getDate().YYYYMMDDHHMMSS},
        ],
        cacheWaringInfos:[],//报警信息缓存
        allWarningInfos:[],//所有的报警信息
        isHistoryDataModalShown:false,
        maxPage: 1,
        showPageNav:false,
        device:{},//选择查看的设备
        uuidForSearch:'',//uuid用于查询历史报警处理记录
      }
    },
    validations:{
      uuidForSearch:{ required }
    },
    created() {
      this.getData();
      this.getAlarmInfos();
    },
    methods:{
      //1.初始获取未处理的报警信息
      getData:function () {
        this.warningInfos = [];//初始加载先清空
        this.$Http.getAlarm()
          .then(res => {
            const {code,msg} = res;
            // console.log('收到的报警信息为:',msg);
            msg.forEach(info => {
              const {alarmMessage,alarmType,gmtCreate,projectId,projectLocation,deviceLocation,uuid} = info;
              this.warningInfos.push({
                uuid:uuid,
                projectId:projectId,
                alarmMessage:alarmMessage,
                projectLocation:projectLocation,
                deviceLocation:deviceLocation,
                time:this.$f.getDate(gmtCreate*1000).YYYYMMDDHHMM
              })
            });
          })
      },
      //2.获取所有报警记录--默认20条
      getAlarmInfos:function(){
        this.allWarningInfos = [];
        this.$Http.getDevAlarmInfos()//{params:{size:size}}
          .then(res => {
            const {code,msg} = res;
            // console.log(res.data)
            msg.forEach(info => {
              const {uuid,alarmMessage,gmtModified,processMark} = info;
              this.allWarningInfos.push({
                uuid,
                alarmMessage,
                gmtModified:this.$f.getDate(gmtModified*1000).YYYYMMDDHHMM,
                processMark
              })
            });
            this.allWarningInfos = this.allWarningInfos.reverse(); //翻转，将最近时间放在最前面
            this.cacheWaringInfos = this.allWarningInfos;
          })
      },
      //3.查看报警设备的历史数据
      getAlarmDeviceHistoryData:function(device){
        this.device = device;
        this.isHistoryDataModalShown = true;
      },
      //4.标记设备信息已经处理了
      handleDeviceAlarm:function(item){
        const data = {projectId:item.projectId,uuid:item.uuid,isEnable:true};
        // console.log('提交的信息为:',data);
        this.$Http.editOneDev(data)
          .then(res => {
            const {code,msg} = res.data;
            if (code === 200){
              this.getData();
              this.getAlarmInfos()
            }
          })
      },
      //5.查询某一设备的报警记录
      searchAlarmInfos:function(){
        this.allWarningInfos = this.allWarningInfos.filter(value => value['uuid'].includes(this.uuidForSearch))
      },
      //初始化分页器
      initPageNav:function () {
        this.maxPage = Math.ceil(this.warningInfos.length / 6);
        if (this.maxPage > 1){
          this.showPageNav = true
        }
      },
    },
    watch:{
      uuidForSearch:function () {
        if (this.uuidForSearch === ''){
          this.allWarningInfos = this.cacheWaringInfos;
        }
      }
    },
    mounted() {
      //10s获取一次未处理报警信息
      this.timer = setInterval(() => this.getData(),10000)
    },
    beforeDestroy(){
      clearInterval(this.timer)
    }
  }
</script>

<style scoped>
  .limit-table-height {
    height: 267px;
  }

  .no-warnings {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
  }
  .no-warnings-info {
    font-size: 15px;
    color: #cccccc;
    line-height: 1;
  }
  .table-left {
    float: left;
    width: 69%;
    height: 100%;
    /*outline: 1px solid black;*/
  }
  .table-right {
    float: right;
    width: 29%;
    height: 100%;
    /*outline: 1px solid black;*/
  }
  .tbody-sm {
    font-size: 10px;
    color: #b4bccf;
    font-weight: normal;
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
  button[disabled] {
    cursor: not-allowed;
  }
</style>
