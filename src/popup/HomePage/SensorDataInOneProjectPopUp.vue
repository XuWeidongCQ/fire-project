<template>
  <div>
    <xu-modal
      :shown="modalShown"
      @close="close"
      :header-shown="true">
      <div slot="header">
        {{ project.projectName }}--监测情况
      </div>
      <div slot="content">
        <div class="dev-details-table">
          <div class="no-devices" v-if="project.deviceNumber === 0">
            <span class="no-devices-info">该项目中没有设备</span>
          </div>
          <table class="table table-sm text-center  border-bottom" v-else>
            <thead class="tiny-thead">
            <tr>
              <th>设备uuid</th>
              <!--              <th>设备编号</th>-->
              <th>设备位置</th>
              <th>温度/℃</th>
              <th>压强/Mpa</th>
              <th>在线情况</th>
              <th>有效性</th>
              <th>失效原因</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody class="tiny-tbody">
            <tr v-for="(devData,index) in deviceSensorData" :key="index">
              <th>{{devData.uuid}}</th>
              <th>{{devData.location}}</th>
              <th>{{devData.temperature}}</th>
              <th>{{devData.stress}}</th>
              <th>
              <span :class="{'online-badge':devData.isOnline === true,'offline-badge':devData.isOnline === false}">
                {{devData.isOnline | fixIsOnline }}
              </span>
              </th>
              <th>
              <span
                :class="{'using-badge':devData.state === 1,'used-badge':devData.state === -1,
                'unknown-badge':devData.state === 0}">
                {{devData.state | fixState }}
              </span>
              </th>
              <th>{{devData.failureReason}}</th>
              <th>
                <button class="btn-search-dev" @click="showHistoryDataModal(devData)">历史数据</button>
              </th>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </xu-modal>

    <device-history-data
      :device="device"
      @close="isHistoryDataModalShown = false"
      v-if="isHistoryDataModalShown">
    </device-history-data>

  </div>
</template>

<script>
  import { configToastr } from "@/plugins/toastrInfos";
  import XuModal from "@/pages/share_components/XuModal";
  import DeviceHistoryData from "@/popup/HomePage/DeviceHistoryData";

  export default {
    name: "SensorDataInOneProjectPopUp",
    components: {
      XuModal,
      DeviceHistoryData
    },
    props:{
      project:{
        type:Object
      },
      modalShown:{
        type:Boolean,
        default:false
      }
    },
    data:function () {
      return {
        timer:null,//定时器
        device:null,//被选中的设备
        isHistoryDataModalShown:false,
        deviceSensorData:[//存放设备的最新传感器数据

        ]
      }
    },
    created(){
      if (this.project.deviceNumber !== 0){
        this.getSenorData();
        this.timer = setInterval(()=>{
          this.getSenorData()
        },5000) //每隔5s刷新数据
      }
    },
    methods:{
      getSenorData:function () {
        this.$axios.get(this.api.getSenorData + '?projectId=' + this.project.projectId)
          .then(res => {
            const {code,msg} = res.data;
            if (code === 200){
              for(let i=0;i<msg.length;i++){
                const {uuid,location,temperature,stress,isOnline,state,failureReason} = msg[i];
                if (this.deviceSensorData[i] === undefined){//是为了防止页面抖动
                  this.deviceSensorData.push({uuid,location,temperature,stress,isOnline,state,failureReason})
                } else {
                  this.deviceSensorData.splice(i,1,{uuid,location,temperature,stress,isOnline,state,failureReason})
                }
              }
              // console.log('接收的传感器数据为:',msg)
            }
          })
      },
      showHistoryDataModal:function(device){
        this.device = device;
        this.isHistoryDataModalShown = true
      },
      close:function () {
        this.$emit('close')
      }
    },
    filters:{
      fixIsOnline:function (value) {
       switch (value) {
         case true:
           return '在线';
         case false:
           return '离线';
         default:
           return 'unknown'
       }
      },
      fixState:function (value) {
        switch (value) {
          case 1:
            return '有效';
          case 0:
            return '未知';
          case -1:
            return '无效';
          default:
            return 'unknown'
        }
      }
    },
    destroyed() {
      clearInterval(this.timer)
    }

  }
</script>

<style scoped>
  .dev-details-table {
    min-width: 800px;
    /*height: 500px;*/
  }
  .no-devices {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }
  .no-devices-info {
    font-size: 45px;
    color: #cccccc;
    line-height: 1;
  }
</style>
