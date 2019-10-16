<template>
  <div class="xubox mb-integer" >
    <div class="xubox-content">
      <div id="m-isUse-chart" style="height: 200px"></div>
    </div>
    <div class="xubox-foot">
      <div class="footer-wrapper">
        <div class="chart-explain">
          <span><span class="fa fa-square using-color"></span>&nbsp;有效设备</span><span class="x-float-right">{{ using }}个</span>
        </div>
        <div class="chart-explain">
          <span><span class="fa fa-square used-color"></span>&nbsp;无效设备</span><span class="x-float-right">{{used }}个</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "UsingUsedDev",
        data:function () {
          return {
            category: ['有效设备','无效设备'],
            privateValue:[5,5],
            Option:{
              legend:{
                left:'left',
                orient:'vertical'
              },
              color:['#019b4c','#e62229'],
              dataset: {
                source:{
                  'category':['有效设备','无效设备'],
                  'value':[0,0]
                }
              },
              series: [
                {
                  type: 'pie',
                  center:['50%','60%'],
                  hoverAnimation:false,
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
            let chartInstance = echarts.init($('#m-isUse-chart')[0]);
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
          using:function () {
            return this.privateValue[0]
          },
          used:function () {
            return this.privateValue[1]
          },
        },

        //组件挂载完成后执行
        mounted:function () {
          this.draw()
        }
    }
</script>

<style scoped>
  .footer-wrapper {
    font-size: 16px;
    color: #7b8294;
  }
  .using-color {
    color: #019b4c;
  }
  .used-color {
    color: #e62229;
  }
</style>
