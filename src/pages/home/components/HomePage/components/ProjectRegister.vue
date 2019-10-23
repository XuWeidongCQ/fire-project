<template>
    <div>
      <div class="xubox mb-integer">
        <div class="xubox-title">
          <span>项目注册设备</span>
          <div class="x-float-right search-wrapper">
            <label for="year-for-search">项目查询:</label>
            <input type="text" id="year-for-search" placeholder="请输入项目名称">
            <button class="search-btn">查询</button>
          </div>
        </div>
        <div class="xubox-content">
          <div class="register-project-table-wrapper">
            <table class="table table-sm text-center border-bottom">
              <thead class="thead-light thead-font-style">
              <tr>
                <th>项目ID</th>
                <th>项目名称</th>
                <th>产品数量</th>
                <th>项目地址</th>
                <th>完工日期</th>
              </tr>
              </thead>
              <tbody class="tbody-font-style">
              <tr v-for="(project,index) in registerProjects" :key="index">
                <th>项目{{project.projectId}}</th>
                <th>{{ project.name}}</th>
                <th>{{ project.deviceNumber}}</th>
                <th>{{ project.location}}</th>
                <th>{{ project.finishDate}}</th>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="xubox-foot">
          <div class="footer-wrapper">
            <div class="chart-explain">
              <span><span class="fa fa-square foot-item"></span>&nbsp;注册设备数量合计</span>
              <span class="x-float-right">{{ maxMinSum.sum }}个</span>
            </div>
            <div class="chart-explain">
              <span><span class="fa fa-square foot-item"></span>&nbsp;项目安装数量最大值</span>
              <span class="x-float-right">{{ maxMinSum.max }}个</span>
            </div>
            <div class="chart-explain">
              <span><span class="fa fa-square foot-item"></span>&nbsp;项目安装数量最小值</span>
              <span class="x-float-right">{{ maxMinSum.min }}个</span>
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
          projectNameForSearch:'',
          registerProjects:[
            {projectId:1,name:'重庆大学',deviceNumber: 100,location: '沙坪坝',finishDate:'2019-10-23'},
            {projectId:2,name:'重庆大学',deviceNumber: 100,location: '沙坪坝',finishDate:'2019-10-23'},
            {projectId:3,name:'重庆大学',deviceNumber: 560,location: '沙坪坝',finishDate:'2019-10-23'},
            {projectId:4,name:'重庆大学',deviceNumber: 100,location: '沙坪坝',finishDate:'2019-10-23'},
            {projectId:5,name:'重庆大学',deviceNumber: 100,location: '沙坪坝',finishDate:'2019-10-23'},
            {projectId:6,name:'重庆大学',deviceNumber: 100,location: '沙坪坝',finishDate:'2019-10-23'},
            {projectId:7,name:'重庆大学',deviceNumber: 45,location: '沙坪坝',finishDate:'2019-10-23'},
          ]
        }
      },
      methods: {

      },
      computed:{
        maxMinSum:function () {
          let deviceNumbers = [];
          this.registerProjects.forEach(project => {
            deviceNumbers.push(project.deviceNumber)
          });
          return {
            min:this.$common.min(deviceNumbers),
            max:Math.max(...deviceNumbers),
            sum:this.$common.sum(deviceNumbers)
          }
        }
      },
      //组件挂载完成后执行
      mounted:function () {

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
  .search-wrapper {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
  }
  .search-btn {
    height: 26px;
    margin-left: 10px;
    background-color: #019b4c;
    width: 50px;
    color: #f7f7f7;
    border-radius: 3px;
  }

  .search-btn:hover {
    background-color: #01b14c;
  }

  .register-project-table-wrapper {
    outline: 1px solid black;
    height: 400px;
    overflow: auto;
  }

</style>
