<template>
  <div class="xubox mb-integer">
    <div class="xubox-content">
      <div id="m-isOnline-chart" style="height: 200px"></div>
    </div>
    <div class="xubox-foot">
      <div class="footer-wrapper">
        <div class="chart-explain">
          <span><span class="fa fa-square online-color"></span>&nbsp;在线设备</span><span class="x-float-right">{{ online }}个</span>
        </div>
        <div class="chart-explain">
          <span><span class="fa fa-square offline-color"></span>&nbsp;离线设备</span><span class="x-float-right">{{ offline }}个</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "OnlineOfflineDev",
        data:function () {
          return {
            category: ['在线设备','离线设备'],
            privateValue:[0,0],
            Option:{
              legend:{
                left:'left',
                orient:'vertical'
              },
              color:['#019b4c','#e62229'],
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
                  center:['50%','60%'],
                  label:{
                    normal:{
                      show:true,
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
            }
          }
        },
        methods:{
          draw: function(){
            let chartInstance = echarts.init($('#m-isOnline-chart')[0]);
            this.Option.dataset.source['category'] = this.category;
            this.Option.dataset.source['value'] = this.privateValue;
            chartInstance.setOption(this.Option);
            window.addEventListener("resize", function () {
              chartInstance.resize();
            });
          }
        },
        //计算属性
        computed:{
          online:function () {
            return this.privateValue[0]
          },
          offline:function () {
            return this.privateValue[1]
          },
        },
        //侦听器---如果数据发生变化就执行

        //组件挂载完成后执行
        mounted:function () {
          this.draw();
        }
    }
</script>

<style scoped>
  .footer-wrapper {
    font-size: 16px;
    color: #7b8294;
  }
  .online-color {
    color: #019b4c;
  }
  .offline-color {
    color: #e62229;
  }
</style>
