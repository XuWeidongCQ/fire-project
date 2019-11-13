<template>
  <div class="xubox mb-integer">
    <div class="xubox-title">
      <div>
        <span>新增设备</span>
      </div>
      <div class="search-wrapper">
        <label for="year-for-search">年份:</label>
        <select id="year-for-search">
          <option>2019</option>
          <option>2018</option>
        </select>
        <button class="search-btn">查询</button>
      </div>
    </div>
    <div class="xubox-content">
      <div class="month-project-wrapper">
        <table class="table table-sm text-center border-bottom x-table-hover">
          <thead class="tiny-thead">
          <tr>
            <th>月份</th>
            <th>设备数量</th>
            <th>项目数量</th>
          </tr>
          </thead>
          <tbody class="tiny-tbody">
          <tr v-for="(item,index) in monthProjectInfos" :key="index">
            <td>{{item.monthName}}</td>
            <td>{{item.devNum}}</td>
            <td>
              <span class="project-number-toggle">
                {{item.projectNum}}
              </span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="xubox-foot">
      <div class="footer-wrapper">
        <div class="chart-explain">
          <span><span class="fa fa-square foot-item"></span>&nbsp;新增项目合计</span>
          <span class="x-float-right">{{sum.project}}个</span>
        </div>
        <div class="chart-explain">
          <span><span class="fa fa-square foot-item"></span>&nbsp;新增项目最大值</span><span class="x-float-right">{{ max }}个</span>
        </div>
        <div class="chart-explain">
          <span><span class="fa fa-square foot-item"></span>&nbsp;新增项目最小值</span><span class="x-float-right">{{ min }}个</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { configToastr } from "@/plugins/toastrInfos";

  export default {
      name: "NewDevPerMonth",
      data:function () {
        return {
          monthProjectInfos:[
            // {monthName:'一月',devNum:70,projectNum:1},
            // {monthName:'二月',devNum:123,projectNum:5},
            // {monthName:'三月',devNum:78,projectNum:3},
            // {monthName:'四月',devNum:47,projectNum:10},
            // {monthName:'五月',devNum:77,projectNum:9},
            // {monthName:'六月',devNum:19,projectNum:7},
            // {monthName:'七月',devNum:35,projectNum:8},
            // {monthName:'八月',devNum:40,projectNum:6},
            // {monthName:'九月',devNum:48,projectNum:11},
            // {monthName:'十月',devNum:61,projectNum:13},
            // {monthName:'十一月',devNum:69,projectNum:16},
            // {monthName:'十二月',devNum:70,projectNum:6},
          ],
        }
      },
      methods:{
        //请求月份数据
        getMonthlyProjects:function () {
          this.$Http.getMonthlyProjects()
            .then(res => {
              const { code,msg } = res.data;
              console.log(msg);
              if (code === 200){
                msg.forEach(ele => {
                  const { monthName,devNum,projectNum } = ele;
                  this.monthProjectInfos.push({monthName,devNum,projectNum})
                })
              }
            })
        }
      },
      computed:{
        sum:function () {
          return {
            dev:this.$f.sum(this.$f.getArrayInObj(this.monthProjectInfos,'devNum')),
            project:this.$f.sum(this.$f.getArrayInObj(this.monthProjectInfos,'projectNum')),
          }
        },
        max:function () {
          return this.$f.max(this.$f.getArrayInObj(this.monthProjectInfos,'projectNum'))
        },
        min:function () {
          return this.$f.min(this.$f.getArrayInObj(this.monthProjectInfos,'projectNum'))
        }
      },
      filters:{
        fixMonth:function (value) {
          switch (value) {
            case '1':
              return '一月';
            case '2':
              return '二月';
            case '3':
              return '三月';
            case '4':
              return '四月';
            case '5':
              return '五月';
            case '6':
              return '六月';
            case '7':
              return '七月';
            case '8':
              return '八月';
            case '9':
              return '九月';
            case '10':
              return '十月';
            case '11':
              return '十一月';
            case '12':
              return '十二月';
            default:
              return '未知'
          }
        }
      },
      created(){
        this.getMonthlyProjects()
      },
      //组件挂载完成后执行
      mounted:function () {
        // this.draw()
      }
    }
</script>

<style scoped>
  .month-project-wrapper {
    height: 335px;
  }
  .search-wrapper {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
  }
  .search-btn {
    height: 20px;
    margin-left: 10px;
    background-color: #019b4c;
    width: 50px;
    color: #f7f7f7;
    border-radius: 3px;
  }

  .search-btn:hover {
    background-color: #01b14c;
  }
  .foot-item {
    color: #e62229;
  }
  .project-number-toggle {
    color: #3c9eff;
    cursor: pointer;
  }
</style>
