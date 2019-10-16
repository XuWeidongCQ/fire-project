<template>
  <div class="xubox mb-integer" style="padding-top: 10px;padding-bottom: 2px">
    <div id="m-usingRate-chart" style="height: 150px">
    </div>
    <div id="m-onlineRate-chart" style="height: 150px">
    </div>
  </div>
</template>

<script>
    export default {
        name: "DevUsingOnlineRate",
        data:function () {
          return {
            usingRate:78,
            onlineRate:60,
            Option:{
              title:{
                text:'设备情况概览',
                x:'center',
                textStyle:{
                  fontWeight:'lighter'
                }
              },
              color:['#019b4c','rgba(255,255,255,0.1)'],
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
                      formatter:'{d}%',
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
            }
          }
        },
        methods:{
          drawUsingRate: function(){
            let chartInstance = echarts.init($('#m-usingRate-chart')[0]);
            this.Option.title.text = '设备平均有效率';
            this.Option.dataset.source['value'][0] = this.usingRate;
            this.Option.dataset.source['value'][1] = 100 - this.usingRate;
            chartInstance.setOption(this.Option);
            window.addEventListener("resize", function () {
              chartInstance.resize();
            });
          },
          drawOnlineRate:function () {
            let chartInstance = echarts.init($('#m-onlineRate-chart')[0]);
            this.Option.title.text = '设备平均在线率';
            this.Option.dataset.source['value'][0] = this.onlineRate;
            this.Option.dataset.source['value'][1] = 100 - this.onlineRate;
            chartInstance.setOption(this.Option);
            window.addEventListener("resize", function () {
              chartInstance.resize();
            });
          }
        },
        //组件挂载完成后执行
        mounted:function () {
          this.drawUsingRate();
          this.drawOnlineRate()
        }
    }
</script>

<style scoped>

</style>
