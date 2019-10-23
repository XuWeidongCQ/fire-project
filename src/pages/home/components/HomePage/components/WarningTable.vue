<template>
  <div class="xubox mb-integer">
    <div class="xubox-title">
      <span>报警信息</span>
    </div>
    <div class="xubox-content limit-table-height">
      <div class="no-warnings" v-if="warningInfos.length === 0">
        <span class="no-warnings-info">数据库中暂无报警信息</span>
      </div>

      <table class="table table-hover text-center table-sm small" v-if="warningInfos.length !== 0">
        <thead class="thead-light">
        <tr>
          <th><span class="fa fa-circle-thin"></span>&nbsp;设备编号</th>
          <th><span class="fa fa-map-marker"></span>&nbsp;设备位置</th>
          <th><span class="fa fa-exclamation-circle"></span>&nbsp;情况描述</th>
          <th><span class="fa fa-calendar-o"></span>&nbsp;时间</th>
        </tr>
        </thead>
        <tbody>
        <tr  v-for="item in warningInfo" :key="item.index">
          <td>{{ item.uuid }}</td>
          <td>{{ item.location }}</td>
          <td><span class="badge badge-danger">{{ item.msg }}</span></td>
          <td>{{ item.time }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
    export default {
        name: "WarningTable",
        data:function () {
          return {
            warningInfos:[
              // {index:'001',uuid:123,location:'重庆市',msg:'粉末已耗尽',time:this.common.getDate().YYYYMMDDHHMMSS},
              // {index:'002',uuid:457,location:'重庆市',msg:'粉末已耗尽',time:this.common.getDate().YYYYMMDDHHMMSS},
              // {index:'003',uuid:486,location:'重庆市',msg:'粉末已结块',time:this.common.getDate().YYYYMMDDHHMMSS},
              // {index:'004',uuid:486,location:'重庆市',msg:'粉末已结块',time:this.common.getDate().YYYYMMDDHHMMSS},
              // {index:'005',uuid:486,location:'重庆市',msg:'粉末已结块',time:this.common.getDate().YYYYMMDDHHMMSS},
              // {index:'006',uuid:486,location:'重庆市',msg:'粉末已结块',time:this.common.getDate().YYYYMMDDHHMMSS},
            ]
          }
        }
    }
</script>

<style scoped>
  .limit-table-height {
    height: 267px;
  }
  .no-warnings {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .no-warnings-info {
    font-size: 45px;
    color: #cccccc;
    line-height: 1;
  }
</style>
