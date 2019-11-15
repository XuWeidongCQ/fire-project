<template>
  <div class="xubox mb-integer">
    <div class="xubox-title">
      <span>报警信息</span>
    </div>
    <div class="xubox-content limit-table-height scroll-table scrollBar-style x-table-hover">
      <div class="no-warnings" v-if="warningInfos.length === 0">
        <span class="no-warnings-info">数据库中暂无报警信息</span>
      </div>

      <table class="table table-sm text-center border-bottom" v-if="warningInfos.length !== 0">
        <thead class="tiny-thead">
        <tr>
          <th><span class="fa fa-circle-thin"></span>&nbsp;设备uuid</th>
          <th><span class="fa fa-map-marker"></span>&nbsp;项目位置</th>
          <th><span class="fa fa-map-marker"></span>&nbsp;设备位置</th>
          <th><span class="fa fa-exclamation-circle"></span>&nbsp;报警内容</th>
          <th><span class="fa fa-calendar-o"></span>&nbsp;时间</th>
          <th><span class="fa fa-hand-grab-o">&nbsp;操作</span></th>
        </tr>
        </thead>
        <tbody class="tbody-font-style">
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
<!--      <xu-page-nav :max-page="maxPage" :is-shown="showPageNav"></xu-page-nav>-->
    </div>

    <device-history-data
      :device="device"
      @close="isHistoryDataModalShown = false"
      v-if="isHistoryDataModalShown">
    </device-history-data>

  </div>
</template>

<script>
  import XuPageNav from "@/pages/share_components/XuPageNav";
  import DeviceHistoryData from "@/popup/HomePage/DeviceHistoryData";
  import {configToastr} from "@/plugins/toastrInfos";

  export default {
    name: "WarningTable",
    components:{
      DeviceHistoryData,
      XuPageNav
    },
    data:function () {
      return {
        warningInfos:[
          // {index:'001',uuid:123,location:'重庆市',msg:'粉末已耗尽',time:this.common.getDate().YYYYMMDDHHMMSS},
        ],
        isHistoryDataModalShown:false,
        maxPage: 1,
        showPageNav:false,
        device:{},//选择查看的设备
      }
    },
    created() {
      this.getData()
    },
    methods:{
      //初始获取报警信息
      getData:function () {
        this.warningInfos = [];//初始加载先清空
        this.$Http.getAlarm()
          .then(res => {
            const {code,msg} = res.data;
            // console.log('收到的报警信息为:',msg);
            msg.forEach(info => {
              const {alarmMessage,alarmType,gmtCreate,projectId,projectLocation,deviceLocation,uuid} = info;
              this.warningInfos.push({
                uuid:uuid,
                projectId:projectId,
                alarmMessage:alarmMessage,
                projectLocation:projectLocation,
                deviceLocation:deviceLocation,
                time:this.$f.getDate(gmtCreate*1000).YYYYMMDDHHMMSS
              })
            });
            // this.initPageNav()
          })
      },
      //查看报警设备的历史数据
      getAlarmDeviceHistoryData:function(device){
        this.device = device;
        this.isHistoryDataModalShown = true;
      },
      //标记设备信息已经处理了
      handleDeviceAlarm:function(item){
        const data = {projectId:item.projectId,uuid:item.uuid,isEnable:true};
        // console.log('提交的信息为:',data);
        this.$Http.editOneDev(data)
          .then(res => {
            const {code,msg} = res.data;
            if (code === 200){
              this.$toastr.Add(configToastr('报警信息处理-',msg,'success'));
              this.getData()
            } else {
              this.$toastr.Add(configToastr('报警信息处理失败-',msg,'warning'))
            }
          })
          .catch(error => {
              this.$toastr.Add(configToastr('无法连接服务器-','','error'))
          })
      },
      //初始化分页器
      initPageNav:function () {
        this.maxPage = Math.ceil(this.warningInfos.length / 6);
        if (this.maxPage > 1){
          this.showPageNav = true
        }
      },
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
    height: 100%;
  }
  .no-warnings-info {
    font-size: 45px;
    color: #cccccc;
    line-height: 1;
  }
</style>
