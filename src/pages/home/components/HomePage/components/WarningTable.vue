<template>
  <div class="xubox mb-integer">
    <div class="xubox-title">
      <span>报警信息</span>
    </div>
    <div class="xubox-content limit-table-height scroll-table">
      <div class="no-warnings" v-if="warningInfos.length === 0">
        <span class="no-warnings-info">数据库中暂无报警信息</span>
      </div>

      <table class="table table-sm text-center border-bottom" v-if="warningInfos.length !== 0">
        <thead class="tiny-thead">
        <tr>
          <th><span class="fa fa-circle-thin"></span>&nbsp;设备uuid</th>
<!--          <th><span class="fa fa-map-marker"></span>&nbsp;设备位置</th>-->
          <th><span class="fa fa-exclamation-circle"></span>&nbsp;报警信息</th>
          <th><span class="fa fa-calendar-o"></span>&nbsp;报警时间</th>
          <th><span class="fa fa-hand-grab-o"></span>&nbsp;操作</th>
        </tr>
        </thead>
        <tbody class="tbody-font-style">
        <tr  v-for="(item,index) in warningInfos" :key="index">
          <th>{{ item.uuid }}</th>
<!--          <td>{{ item.location }}</td>-->
          <th><span class="badge badge-danger">{{ item.alarmMessage }}</span></th>
          <th>{{ item.time }}</th>
          <th>
            <button class="btn-search-dev">
              <span class="fa fa-eye"></span>
            </button>
          </th>
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
        ]
      }
    },
    created() {
      this.$Http.getAlarm()
        .then(res => {
          const {code,msg} = res.data;
          console.log('收到的报警信息为:',msg);
          msg.forEach(info => {
            const {alarmMessage,alarmType,gmtCreate,projectId,uuid} = info;

            this.warningInfos.push({uuid:uuid,alarmMessage:alarmMessage,time:this.$f.getDate(gmtCreate*1000).YYYYMMDDHHMMSS})
          })
        })
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
