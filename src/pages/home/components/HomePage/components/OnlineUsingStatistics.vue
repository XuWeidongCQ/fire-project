<template>
  <div class="row">
    <!--在线-离线统计-->
    <div class="col-4">
      <div class="xubox mb-integer">
        <div class="xubox-content">
          <div id="m-isOnline-chart" style="height: 235px"></div>
        </div>
        <div class="xubox-foot">
          <div class="footer-wrapper">
            <div class="chart-explain">
              <span><span class="fa fa-square online-color"></span>&nbsp;在线设备</span><span class="x-float-right">{{ onlineDevNum }}个</span>
            </div>
            <div class="chart-explain">
              <span><span class="fa fa-square offline-color"></span>&nbsp;离线设备</span><span class="x-float-right">{{ offlineDevNum }}个</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--在线率-有效率统计-->
    <div class="col-4">
      <div class="xubox mb-integer" style="padding-top: 10px;padding-bottom: 2px">
        <div id="m-onlineRate-chart" style="height: 150px"></div>
        <div id="m-usingRate-chart" style="height: 150px"></div>
      </div>
    </div>
    <!--有效-无效统计-->
    <div class="col-4">
      <div class="xubox mb-integer" >
        <div class="xubox-content">
          <div id="m-isUse-chart" style="height: 210px"></div>
        </div>
        <div class="xubox-foot">
          <div class="footer-wrapper">
            <div class="chart-explain">
              <span><span class="fa fa-square using-color"></span>&nbsp;有效设备</span><span class="x-float-right">{{ usingDevNum }}个</span>
            </div>
            <div class="chart-explain">
              <span><span class="fa fa-square used-color"></span>&nbsp;无效设备</span><span class="x-float-right">{{ usedDevNum }}个</span>
            </div>
            <div class="chart-explain">
              <span><span class="fa fa-square unknown-color"></span>&nbsp;未知设备</span><span class="x-float-right">{{ unknownNum }}个</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const pieOption = {
    legend:{
      left:'left',
      orient:'vertical',
      textStyle:{
        color:'#e0e3e9'
      }
    },
    color:['#019b4c','#e62229',"#e0a800"],
    dataset: {
      source:{
        'category':['在线设备','离线设备'],
        'value':[0,0]
      }
    },
    series: [
      {
        type: 'pie',
        hoverAnimation:false,
        radius: ['0%', '60%'],
        center:['50%','65%'],
        label:{
          normal:{
            show:false,
            position:'inside',
            formatter:'{d}%'
          },
        },
        encode:{
          itemName:'category',
          value:'value'
        }
      },
    ]
  };
  const RatePieOption = {
    title:{
      text:'设备情况概览',
      x:'center',
      textStyle:{
        fontWeight:'lighter',
        color:'#e0e3e9'
      }
    },
    color:['#019b4c','#e62229'],
    dataset: {
      source:{
        'category':['positive','negative'],
        'value':[0,0]
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['60%', '70%'],
        center:['50%','60%'],
        avoidLabelOverlap:false,
        hoverAnimation:false,
        label:{
          normal:{
            show:true,
            position:'center',
            formatter:params => {
              if (params.name === 'positive'){
                return params.value[1] + '%'
              } else {
                return ''
              }
            },
            textStyle: {
              fontSize: '20',
              fontWeight: 'lighter'
            }
          },
        },
        encode:{
          itemName:'category',
          value:'value'
        }
      },
    ]
  };
  export default {
    name: "OnlineUsingStatistics",
    data:function () {
      return {
        timer01:null,
        timer02:null,
        onlineDevNum:0,//所有在线设备
        offlineDevNum:0,//所有离线设备
        usingDevNum:0,//所有有效设备
        usedDevNum:0,//所有失效设备
        unknownNum:0,//未知设备数量
      }
    },

    created() {
      this.getOnlineOfflineDevNum();
      this.getUsedUsingDevNum();
    },

    methods:{
      getOnlineOfflineDevNum:function(){
        this.$Http.getOnlineAndOfflineDevNum()
          .then(res => {
            const { code,msg } = res;
            if (code === 200 ){
              this.onlineDevNum = msg['onlineNumber'];
              this.offlineDevNum = msg['offlineNumber'];
              this.drawOnlineOfflinePie();
              this.drawOnlineRate();
            }
          });
      },
      getUsedUsingDevNum:function(){
        this.$Http.getUsingAndUsedDevNum()
          .then(res => {
            const { code,msg } = res;
            if (code === 200 ){
              this.usingDevNum = msg['valid'];
              this.usedDevNum = msg['invalid'];
              this.unknownNum = msg['unknown'];
              this.drawUsedUsingPie();
              this.drawUsingRate()
            }
          })
          .catch(error => {
            // console.log(error)
          })
      },
      drawOnlineOfflinePie:function () {
        let chartInstance = echarts.init(document.getElementById('m-isOnline-chart'));
        pieOption.dataset.source['category'] = ['在线设备','离线设备'];
        pieOption.dataset.source['value'] = [this.onlineDevNum,this.offlineDevNum];
        chartInstance.setOption(pieOption);
        window.addEventListener("resize", function () {
          chartInstance.resize();
        });
      },
      drawUsedUsingPie:function () {
        let chartInstance = echarts.init(document.getElementById('m-isUse-chart'));
        pieOption.dataset.source['category'] = ['有效设备','无效设备','未知状态'];
        pieOption.dataset.source['value'] = [this.usingDevNum,this.usedDevNum,this.unknownNum];
        chartInstance.setOption(pieOption);
        window.addEventListener("resize", function () {
          chartInstance.resize();
        });
      },
      drawUsingRate: function(){
        let usingRate = 0;
        this.usingDevNum + this.usedDevNum + this.unknownNum === 0 ?
          usingRate = 0:usingRate = Math.floor(this.usingDevNum * 100/ (this.usingDevNum + this.usedDevNum + this.unknownNum));
        let chartInstance = echarts.init(document.getElementById('m-usingRate-chart'));
        RatePieOption.title.text = '设备平均有效率';
        RatePieOption.dataset.source['value'][0] = usingRate;
        RatePieOption.dataset.source['value'][1] = 100 - usingRate;
        chartInstance.setOption(RatePieOption);
        window.addEventListener("resize", function () {
          chartInstance.resize();
        });
      },
      drawOnlineRate: function(){
        let onlineRate = 0;
        this.onlineDevNum + this.offlineDevNum === 0 ?
          onlineRate = 0:onlineRate = Math.floor(this.onlineDevNum * 100 / (this.onlineDevNum + this.offlineDevNum));
        let chartInstance = echarts.init(document.getElementById('m-onlineRate-chart'));
        RatePieOption.title.text = '设备平均在线率';
        RatePieOption.dataset.source['value'][0] = onlineRate;
        RatePieOption.dataset.source['value'][1] = 100 - onlineRate;
        chartInstance.setOption(RatePieOption);
        window.addEventListener("resize", function () {
          chartInstance.resize();
        });
      },
    },

    computed:{

    },

    mounted() {
      this.timer01 = setInterval(() => {this.getUsedUsingDevNum()},5000);
      this.timer02 = setInterval(() => {this.getOnlineOfflineDevNum()},5000);
    },

    destroyed() {
      clearInterval(this.timer01);
      clearInterval(this.timer02);
    }
  }
</script>

<style scoped>
  .using-color {
    color: #019b4c;
  }
  .used-color {
    color: #e62229;
  }
  .unknown-color {
    color: #e0a800;
  }
  .online-color {
    color: #019b4c;
  }
  .offline-color {
    color: #e62229;
  }
</style>
