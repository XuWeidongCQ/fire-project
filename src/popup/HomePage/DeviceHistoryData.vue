<template>
  <xu-modal
    :shown="true"
    @close="close"
    :header-shown="true">
    <div slot="header">
      <span>设备uuid:{{device.uuid}}--历史数据</span>
      <span class="xu-badge xu-ml" :class="{'xu-badge-active':period === 240}" @click="getDifferentPeriodData(240)">十天以内</span>
      <span class="xu-badge" :class="{'xu-badge-active':period === 72}" @click="getDifferentPeriodData(72)">三天以内</span>
      <span class="xu-badge" :class="{'xu-badge-active':period === 24}" @click="getDifferentPeriodData(24)">一天以内</span>
    </div>
    <div slot="content">
      <div id="stress-chart-wrapper"></div>
      <div id="temperature-chart-wrapper"></div>
    </div>
  </xu-modal>
</template>

<script>
  import XuModal from "@/XuComponent/XuModal";

  const lineOption = {
    color:'#DC143C',//参数
    tooltip:{
      trigger: 'axis',
    },
    grid: {
      top: '15px',
      left: '15px',
      right: '25px',
      bottom: '3px',
      containLabel: true
    },
    yAxis: {
      type:'value',
      name:'',
      nameLocation:'center',
      nameGap:20,
      min:0,
      axisLine:{
        lineStyle:{
          color:'#f7f7f7'
        }
      },
      axisLabel:{
        color:'#e0e3e9'
      },
      nameTextStyle:{
        color:'#e0e3e9'
      }
    },
    xAxis: {
      type:'time',
      boundaryGap: false,
      axisLine:{
        lineStyle:{
          color:'#f7f7f7'
        }
      },
      axisLabel:{
        interval:'auto',
        color:'#e0e3e9'
      },
      nameTextStyle:{
        color:'#e0e3e9'
      }
    },
    dataset: {
      dimensions:[{name:'time',type:'time'},{name:'value',type:'float'}],
      source: {
        'time':[],
        'value':[]
      }
    },
    series: [{
        type: 'line',
        smooth:true,
        name:'',
        encode:{
          x:'time',
          y:'value'
        }
      }]
  };

  export default {
    name: "DeviceHistoryData",
    components:{
      XuModal
    },
    props:{
      device:{
        type:Object
      }
    },
    data:function(){
      return {
        period:24,//查看的数据周期,默认过去一天的
        timeArray:[],//用来存放历史数据对应的时间点
        stressArray:[],//用来存放历史压强数据
        temperatureArray:[],//用来存放历史温度数据
      }
    },
    created(){
      this.getHistoryData();
    },
    methods:{
      //1 初始获取传感器数据
      getHistoryData:function(size=24){
        this.timeArray = [];
        this.stressArray = [];
        this.temperatureArray = [];
        this.$Http.getSensorDataInOneDev({params:{uuid:this.device.uuid,size:size}})
          .then(res => {
            const { code,msg } = res;
            if (code === 200){
              msg.forEach(dataInstance => {
                const { gmtCreate,stress,temperature } = dataInstance;
                this.timeArray.push(this.$f.getDate(gmtCreate*1000).YYYYMMDDHHMM);
                this.stressArray.push(stress);
                this.temperatureArray.push(temperature);
              });
              //时间反序
              this.timeArray = this.timeArray.reverse();
              this.stressArray = this.stressArray.reverse();
              this.temperatureArray = this.temperatureArray.reverse();
              // console.log(this.timeArray);
              this.drawStressLineChart();
              this.drawTemperatureChart()
            }
          })
      },
      //2 查看不同的历史数据
      getDifferentPeriodData:function(size) {
        this.getHistoryData(size);
        this.period = size;
      },
      drawStressLineChart:function(){
        let chartInstance = echarts.init(document.getElementById('stress-chart-wrapper'));
        lineOption.color = '#DC143C';
        lineOption.yAxis.name = '压强/Mpa';
        lineOption.dataset.source['time'] = this.timeArray;
        lineOption.dataset.source['value'] = this.stressArray;
        chartInstance.setOption(lineOption)
      },
      drawTemperatureChart:function(){
        let chartInstance = echarts.init(document.getElementById('temperature-chart-wrapper'));
        lineOption.color = '#01a753';
        lineOption.yAxis.name = '温度/℃';
        lineOption.dataset.source['time'] = this.timeArray;
        lineOption.dataset.source['value'] = this.temperatureArray;
        chartInstance.setOption(lineOption)
      },
      close:function () {
        this.$emit('close')
      }
    },
    mounted() {
      // this.drawStressLineChart()
    }
  }
</script>

<style scoped>

  #stress-chart-wrapper,
  #temperature-chart-wrapper {
    width: 800px;
    height: 250px;
    /*outline: 1px solid black;*/
    border: 2px solid #cccccc;
    border-radius: 3px;
    margin-bottom: 10px;
  }
  .xu-ml {
    margin-left: 250px;
  }
  .xu-badge {
    border: 1px solid #34bed8;
    padding: 6px 5px;
    font-size: 14px;
    border-radius: 100px;
    cursor: pointer;
    color: #d0d3d9;
  }
  .xu-badge-active {
    background-color: #304981;
  }

</style>
