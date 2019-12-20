<template>
  <div class="xubox mb-integer">
    <div class="xubox-title">
      <div>
        <span>新增设备</span>
      </div>
      <div class="search-wrapper">
        <label for="year-for-search">年份:</label>
        <select id="year-for-search" v-model="selectedYear">
          <option v-for="year in yearList">{{ year }}</option>
        </select>
        <button class="search-btn" @click="getMonthlyProjects">查询</button>
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
            <td>{{item.dateName | fixMonth }}</td>
            <td>{{item.devNum}}</td>
            <td>
              <span class="project-number-toggle"
                    @click="item.projectNum !== 0 && showProjectsTable(item.dateName)">
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
          <span class="x-float-right">{{ sum.project }}个</span>
        </div>
        <div class="chart-explain">
          <span><span class="fa fa-square foot-item"></span>&nbsp;新增项目最大值</span><span class="x-float-right">{{ max }}个</span>
        </div>
        <div class="chart-explain">
          <span><span class="fa fa-square foot-item"></span>&nbsp;新增项目最小值</span><span class="x-float-right">{{ min }}个</span>
        </div>
      </div>
    </div>

    <projects-table-by-time
      v-if="isProjectsTableShown"
      @close="isProjectsTableShown = false"
      :statistics="statistics">
    </projects-table-by-time>

  </div>
</template>

<script>
  import { configToastr } from "@/plugins/toastrInfos";
  import ProjectsTableByTime from "@/popup/HomePage/ProjectsTableByTime";

  export default {
    name: "NewDevPerMonth",
    components:{
        ProjectsTableByTime,
    },
    data:function () {
      return {
        selectedYear:this.$f.getDate().YYYY,//当前选择的年
        isProjectsTableShown:false,//是否显示月份项目弹窗
        statistics:{},//用来向月份项目弹窗传递的信息
        yearList:[this.$f.getDate().YYYY,this.$f.getDate().YYYY-1,this.$f.getDate().YYYY-2],//下拉菜单选择项
        monthProjectInfos:[
        ],
      }
    },
    methods:{
      //1.请求月份数据
      getMonthlyProjects:function () {
        this.monthProjectInfos = [];
        this.$Http.getMonthlyProjects({params:{year:this.selectedYear}})
          .then(res => {
            const { code,msg } = res;
            // console.log(msg);
            if (code === 200){
              msg.forEach(ele => {
                const { dateName,devNum,projectNum } = ele;
                this.monthProjectInfos.push({dateName,devNum,projectNum})
              })
            }
          })
      },
      //2.显示时间项目情况弹窗
      showProjectsTable:function (month) {
        this.statistics = {year:this.selectedYear,month:month};
        this.isProjectsTableShown = true
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
          case 1:
            return '一月';
          case 2:
            return '二月';
          case 3:
            return '三月';
          case 4:
            return '四月';
          case 5:
            return '五月';
          case 6:
            return '六月';
          case 7:
            return '七月';
          case 8:
            return '八月';
          case 9:
            return '九月';
          case 10:
            return '十月';
          case 11:
            return '十一月';
          case 12:
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
