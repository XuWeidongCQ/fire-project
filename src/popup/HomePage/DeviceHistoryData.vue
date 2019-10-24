<template>
  <xu-modal
    :shown="true"
    @close="close"
    :header-shown="true">
    <div slot="header">
      <span>设备uuid:{{device.uuid}}--历史数据</span>
    </div>
    <div slot="content">
      <div id="stress-chart-wrapper"></div>
      <div id="temperature-chart-wrapper"></div>
    </div>
  </xu-modal>
</template>

<script>
  import XuModal from "@/pages/share_components/XuModal";

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
    },
    xAxis: {
      type:'category',
      boundaryGap: false,
      axisLabel:{
        interval:1
      }
    },
    dataset: {
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
        timeArray:[],//用来存放历史数据对应的时间点
        stressArray:[],//用来存放历史压强数据
        temperatureArray:[],//用来存放历史温度数据
      }
    },
    created(){
      this.getHistoryData();
    },
    methods:{
      getHistoryData:function(){
        this.$axios.get(this.api.getHistoryData + '?uuid=' + this.device.uuid + '&size=10')
          .then(res => {
            const { code,msg } = res.data;
            if (code === 200){
              msg.forEach(dataInstance => {
                const { longCreate,stress,temperature } = dataInstance;
                this.timeArray.push(this.$common.getDate(longCreate*1000).MMDDHHMMSS);
                this.stressArray.push(stress);
                this.temperatureArray.push(temperature);
                this.drawStressLineChart();
                this.drawTemperatureChart()
              });
              // console.log('原顺序:',this.timeArray.reverse());
              // console.log('逆顺序:',this.timeArray.reverse());
              // console.log(this.stressArray)
            }
          })
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

</style>
