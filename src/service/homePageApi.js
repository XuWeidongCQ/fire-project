
const HOME_PAGE_API = {

  //获取项目表
  getAllProjectsInfos:{
    method:'get',
    url:'/caracara/info/project'
  },

  //获取所有在线和离线的设备数量
  getOnlineAndOfflineDevNum:{
    method:'get',
    url:'/caracara/info/device/count/line'
  },

  //获取所有有效和失效的设备数量
  getUsingAndUsedDevNum:{
    method: 'get',
    url:'/caracara/info/device/count/state'
  },

  //获取一个项目中所有设备的最新传感器数据
  getSensorDataInOneProject:{
    method:'get',
    url:'/caracara/info/device/project'
  },

  //获取一台设备的历史传感器数据
  getSensorDataInOneDev:{
    method:'get',
    url:'/caracara/data/device/uuid'
  },

  //获取最新报警信息表
  getAlarm:{
    method:'get',
    url:'/caracara/info/alarm/unprocessed',
  },

  //获取某年每月的项目统计
  getMonthlyProjects:{
    method:'get',
    url:'/caracara/info/project/count/increase'
  },

  //通过特定时间段获取项目信息
  getProjectsByTime:{
    method:'get',
    url:'/caracara/info/project/list/increase'
  }
};

export default HOME_PAGE_API