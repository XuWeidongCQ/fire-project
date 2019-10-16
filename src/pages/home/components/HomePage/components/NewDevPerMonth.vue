<template>
  <div class="xubox mb-integer">
    <div class="xubox-title">
      <div class="x-float-left">
        <span>新增设备</span>
      </div>
      <div class="x-float-right search-wrapper">
        <label for="year-for-search">年份查询:</label>
        <select id="year-for-search">
          <option>2019</option>
          <option>2018</option>
        </select>
        <button class="search-btn">查询</button>
      </div>
    </div>
    <div class="xubox-content">
      <div id="m-month-chart" style="height: 250px">
      </div>
    </div>
    <div class="xubox-foot">
      <div class="footer-wrapper">
        <div class="chart-explain">
          <span><span class="fa fa-square foot-item"></span>&nbsp;新增设备合计</span><span class="x-float-right">{{ sum }}个</span>
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
</template>

<script>
    export default {
        name: "NewDevPerMonth",
        data:function () {
          return {
            category: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
            newDev:[7,5,8,12,6,8,2,18,9,10,23,6],
            Option:{
              color:['#c12e34'],
              grid: {
                top: '10px',
                left: '20px',
                right: '10px',
                bottom: '5px',
                containLabel: true
              },
              yAxis: {
                type:'value',
                name:'设备数量',
                nameLocation:'center',
                nameGap:25,
                min:0,
                // max:10,
              },
              xAxis: {
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
                  'newDev':[],
                }
              },
              series: [
                {
                  type: 'line',
                  barWidth:20,
                  name:'注册设备',
                  label:{
                    normal:{
                      show:true,
                    },
                  },
                  encode:{
                    x:'category',
                    y:'newDev'
                  }
                },
              ]
            }
          }
        },
        methods:{
          draw: function(){
            let chartInstance = echarts.init($('#m-month-chart')[0]);
            this.Option.dataset.source['category'] = this.category;
            this.Option.dataset.source['newDev'] = this.newDev;
            chartInstance.setOption(this.Option);
            window.addEventListener("resize", function () {
              chartInstance.resize();
            });
          }
        },
        computed:{
          sum:function () {
            return this.common.sum(this.newDev)
          },
          max:function () {
            return this.common.max(this.newDev)
          },
          min:function () {
            return this.common.min(this.newDev)
          }
        },
        //组件挂载完成后执行
        mounted:function () {
          this.draw()
        }
    }
</script>

<style scoped>
  .xubox-title {
    overflow: hidden;
  }

  .search-wrapper {
    height: 27px;
    line-height: 27px;
    font-size: 14px;
  }

  .search-btn {
    height: 27px;
    margin-left: 20px;
    background-color: #019b4c;
    width: 50px;
    color: #f7f7f7;
    border-radius: 3px;
  }

  .search-btn:hover {
    background-color: #01b14c;
  }

  .footer-wrapper {
    font-size: 16px;
    color: #7b8294;
  }
  .foot-item {
    color: #e62229;
  }
</style>
