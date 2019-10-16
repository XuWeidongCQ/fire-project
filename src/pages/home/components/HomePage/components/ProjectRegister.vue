<template>
    <div>
      <div class="xubox mb-integer">
        <div class="xubox-title">
          <span>项目注册设备</span>
        </div>
        <div class="xubox-content">
          <div id="m-project-chart" style="height: 575px"></div>
        </div>
        <div class="xubox-foot">
          <div class="footer-wrapper">
            <div class="chart-explain">
              <span><span class="fa fa-square foot-item"></span>&nbsp;注册设备合计</span><span class="x-float-right">{{ sum }}个</span>
            </div>
            <div class="chart-explain">
              <span><span class="fa fa-square foot-item"></span>&nbsp;最大值</span><span class="x-float-right">{{ max }}个</span>
            </div>
            <div class="chart-explain">
              <span><span class="fa fa-square foot-item"></span>&nbsp;最小值</span><span class="x-float-right">{{ min }}个</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "ProjectRegister",
      data:function () {
        return {
          category: ['项目1','项目2','项目3','项目4','项目5','项目6','项目7','项目8','项目9','项目10'],
          registerDevNum:[7,5,8,12,6,8,2,18,9,10],
          Option:{
            color:['#c12e34'],
            grid: {
              top: '1px',
              left: '0px',
              right: '10px',
              bottom: '20px',
              containLabel: true
            },
            xAxis: {
              type:'value',
              name:'设备数量',
              nameLocation:'center',
              nameGap:25,
              min:0,
            },
            yAxis: {
              type:'category',
              nameLocation:'center',
              nameGap:20,
              axisLabel:{
                interval:0,
              }
            },
            dataset: {
              source:{
                'category':[],
                'register':[],
              }
            },
            series: [
              {
                type: 'bar',
                barWidth:20,
                name:'注册设备',
                label:{
                  normal:{
                    show:true,
                  },
                },
                encode:{
                  x:'register',
                  y:'category'
                }
              },
            ]
          },
        }
      },
      methods: {
        draw: function(){
          let chartInstance = echarts.init($('#m-project-chart')[0]);
          this.Option.dataset.source['category'] = this.category;
          this.Option.dataset.source['register'] = this.registerDevNum;
          chartInstance.setOption(this.Option);
          window.addEventListener("resize", function () {
            chartInstance.resize();
          });
        }

      },
      computed:{
        sum:function () {
          let registerDevNum = this.registerDevNum;
          return this.common.sum(registerDevNum)
        },
        max:function () {
          return this.common.max(this.registerDevNum)
        },
        min:function () {
          return this.common.min(this.registerDevNum)
        }
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
  .foot-item {
    color: #e62229;
  }

</style>
